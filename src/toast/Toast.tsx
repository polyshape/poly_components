import { makeStyles, mergeClasses } from "@griffel/react";
import { useEffect, useState, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { toastManager } from "./ToastManager.js";
import type {
  ToastItem,
  ToastType,
  ToastIconOverrides,
  ToastPosition,
  ToastTheme,
  ToastDraggable,
} from "./ToastTypes.js";
import { Button } from "../button/index.js";
import { Icon } from "../icons/Icon.js";
import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";

const useStyles = makeStyles({
  loadingBar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "3px",
    width: "100%",
    pointerEvents: "none",
    zIndex: 1,
    background: "transparent",
  },
  loadingBarInner: {
    height: "100%",
    width: "100%",
    transformOrigin: "right",
    transition: "transform linear",
  },
  toastContainer: {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    pointerEvents: "none",
    width: "auto",
    left: "unset",
    right: "unset",
    top: "unset",
    bottom: "unset",
    alignItems: "flex-end", // default for topRight
  },
  toastContainerTopRight: {
    top: "20px",
    right: "20px",
    alignItems: "flex-end",
  },
  toastContainerTopCenter: {
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    alignItems: "center",
  },
  toastContainerTopLeft: {
    top: "20px",
    left: "20px",
    alignItems: "flex-start",
  },
  toastContainerBottomRight: {
    bottom: "20px",
    right: "20px",
    alignItems: "flex-end",
  },
  toastContainerBottomCenter: {
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    alignItems: "center",
  },
  toastContainerBottomLeft: {
    bottom: "20px",
    left: "20px",
    alignItems: "flex-start",
  },
  toast: {
    backgroundColor: "var(--pc-bg, #fff)",
    color: "var(--pc-fg, #1f2937)",
    borderRadius: "8px",
    padding: "12px 16px",
    minWidth: "320px",
    maxWidth: "400px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    position: "relative",
    pointerEvents: "auto",
    transform: "translateX(0)",
    opacity: "1",
    animationDuration: "0.2s",
    animationTimingFunction: "cubic-bezier(0.2, 0.61, 0.355, 1)",
    animationFillMode: "both",
    display: "flex",
    overflow: "hidden",
  },
  toastEntering: {
    animationName: {
      "0%": {
        transform: "translateX(100%)",
        opacity: "0",
      },
      "60%": {
        transform: "translateX(-16px)",
        opacity: "1",
      },
      "75%": {
        transform: "translateX(4px)",
        opacity: "1",
      },
      "90%": {
        transform: "translateX(-2px)",
        opacity: "1",
      },
      "100%": {
        transform: "translateX(0)",
        opacity: "1",
      },
    },
  },
  toastExiting: {
    animationName: {
      "0%": {
        transform: "translateX(0)",
        opacity: "1",
      },
      "30%": {
        transform: "translateX(-12px)",
        opacity: "0.8",
      },
      "100%": {
        transform: "translateX(100%)",
        opacity: "0",
      },
    },
    animationDuration: "0.2s",
    animationTimingFunction: "cubic-bezier(0.2, 0, 1, 1)",
  },
  toastTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "4px",
    color: "inherit",
  },
  toastMessage: {
    fontSize: "14px",
    color: "inherit",
    lineHeight: "1.4",
  },
  closeBtn: {
    position: "absolute",
    top: "4px",
    right: "4px",
    color: "#6b7280",
    height: "32px",
    width: "32px",
    minWidth: "32px",
    minHeight: "32px",
  },
  closeBtnFullyColored: {
    color: "#fff",
    opacity: 0.8,
    transition: "opacity 0.2s",
    ":hover": {
      color: "#fff",
      opacity: 1,
    },
  },
});

export type ToastStyleOverrides = Partial<{
  root: CSSProperties;
  toast: CSSProperties;
  title: CSSProperties;
  message: CSSProperties;
  closeButton: CSSProperties;
}> & Partial<Record<ToastType, CSSProperties>>;

export type { ToastPosition, ToastTheme, ToastDraggable, ToastIconOverrides } from "./ToastTypes.js";


interface ToastComponentProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
  styles?: ToastStyleOverrides;
  icons?: ToastIconOverrides;
  closeIcon?: ReactNode | null;
  showLoadingBar?: boolean;
  pauseOnHover?: boolean;
  theme?: ToastTheme;
  draggable?: ToastDraggable;
  paused?: boolean;
}

function ToastComponent({ toast, onRemove, styles, icons, closeIcon, showLoadingBar = true, pauseOnHover = false, theme = "light", paused: globalPaused, draggable = "touch" }: ToastComponentProps) {
  const classes = useStyles();
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeout = useRef<number | null>(null);
  const [localPaused, setLocalPaused] = useState(false);
  const [barScale, setBarScale] = useState(1);
  const [barTransition, setBarTransition] = useState("none");
  const elapsedRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const removedRef = useRef(false);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const toastWidthRef = useRef(0);
  const pausedByDragRef = useRef(false);
  const dragResetTimeoutRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragOffsetRef = useRef(0);
  const dragMovedRef = useRef(false);
  const skipClickRef = useRef(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [isSwipingOut, setIsSwipingOut] = useState(false);

  const iconOverrides = toast.icons ?? icons;
  const resolvedCloseIcon = toast.closeIcon !== undefined ? toast.closeIcon : closeIcon;
  const shouldShowLoadingBar = toast.showLoadingBar ?? showLoadingBar;
  const shouldPauseOnHover = toast.pauseOnHover ?? pauseOnHover;
  const resolvedTheme = toast.theme ?? theme;
  const resolvedDraggable = toast.draggable ?? draggable;

  // Use globalPaused if provided, otherwise fallback to localPaused
  const paused = toast.paused || (typeof globalPaused === "boolean" ? globalPaused : localPaused);

  const handleRemove = useCallback(() => {
    if (!isExiting) {
      setIsExiting(true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      removedRef.current = true;
      exitTimeout.current = window.setTimeout(() => {
        onRemove(toast.id);
      }, 200);
    }
  }, [isExiting, setIsExiting, onRemove, toast.id]);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) {
      setBarScale(1);
      setBarTransition("none");
      return;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    removedRef.current = false;

    let lastTime = Date.now();
    let localElapsed = elapsedRef.current;

    function step() {
      if (removedRef.current) return;
      if (!paused) {
        const now = Date.now();
        localElapsed += now - lastTime;
        lastTime = now;
        elapsedRef.current = localElapsed;
        const newScale = Math.max(0, 1 - localElapsed / toast.duration!);
        setBarScale(newScale);
        if (localElapsed >= toast.duration!) {
          setBarScale(0);
          removedRef.current = true;
          handleRemove();
          return;
        }
      } else {
        lastTime = Date.now();
      }
      rafRef.current = requestAnimationFrame(step);
    }
    setBarTransition("none");
    setBarScale(Math.max(0, 1 - elapsedRef.current / toast.duration));
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      removedRef.current = true;
    };
  }, [toast.duration, paused, handleRemove]);

  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  // Pause/resume handlers
  const handleMouseEnter = () => {
    if (shouldPauseOnHover && toast.duration && toast.duration > 0 && typeof globalPaused !== "boolean") {
      setLocalPaused(true);
    }
  };
  const handleMouseLeave = () => {
    if (shouldPauseOnHover && toast.duration && toast.duration > 0 && typeof globalPaused !== "boolean") {
      setLocalPaused(false);
    }
  };

  const isDragEnabled = resolvedDraggable !== "never";
  const shouldHandlePointer = (pointerType: string) => {
    if (resolvedDraggable === "always") {
      return pointerType === "mouse" || pointerType === "touch" || pointerType === "pen";
    }
    if (resolvedDraggable === "touch") {
      return pointerType === "touch" || pointerType === "pen";
    }
    return false;
  };

  const scheduleDragReset = () => {
    if (dragResetTimeoutRef.current) {
      clearTimeout(dragResetTimeoutRef.current);
    }
    dragResetTimeoutRef.current = window.setTimeout(() => {
      setDragActive(false);
      dragResetTimeoutRef.current = null;
    }, 200);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragEnabled || isSwipingOut || isExiting) return;
    if (!shouldHandlePointer(event.pointerType)) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const target = event.target as HTMLElement | null;
    if (target && target.closest('button, a, input, textarea, select, [role="button"], [data-toast-no-drag]')) {
      return;
    }

    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    toastWidthRef.current =
      toastRef.current?.offsetWidth ?? toastRef.current?.getBoundingClientRect().width ?? 0;
    if (dragResetTimeoutRef.current) {
      clearTimeout(dragResetTimeoutRef.current);
      dragResetTimeoutRef.current = null;
    }
    setIsDragging(true);
    setDragActive(true);
    setIsSwipingOut(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
    setDragProgress(0);
    dragMovedRef.current = false;
    skipClickRef.current = false;
    event.preventDefault();
    try {
      toastRef.current?.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture not supported; safe to ignore.
    }
    if (toast.duration && toast.duration > 0 && typeof globalPaused !== "boolean") {
      setLocalPaused(true);
      pausedByDragRef.current = true;
    } else {
      pausedByDragRef.current = false;
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragEnabled || !isDragging || dragPointerIdRef.current !== event.pointerId) return;
    event.preventDefault();
    const delta = event.clientX - dragStartXRef.current;
    setDragOffset(delta);
    dragOffsetRef.current = delta;
    dragMovedRef.current = dragMovedRef.current || Math.abs(delta) > 4;
    const width =
      toastWidthRef.current ||
      toastRef.current?.offsetWidth ||
      toastRef.current?.getBoundingClientRect().width ||
      0;
    toastWidthRef.current = width;
    if (width > 0) {
      setDragProgress(Math.min(1, Math.abs(delta) / width));
    }
  };

  const completeDrag = (pointerId: number, clientX?: number) => {
    if (!isDragEnabled || !isDragging || dragPointerIdRef.current !== pointerId) return;
    try {
      toastRef.current?.releasePointerCapture(pointerId);
    } catch {
      // Ignore if release fails.
    }
    dragPointerIdRef.current = null;
    setIsDragging(false);

    const width =
      toastWidthRef.current ||
      toastRef.current?.offsetWidth ||
      toastRef.current?.getBoundingClientRect().width ||
      0;
    toastWidthRef.current = width;
    const delta = clientX !== undefined ? clientX - dragStartXRef.current : dragOffsetRef.current;
    const threshold = width * 0.6;
    const shouldDismiss = width > 0 && Math.abs(delta) >= threshold;

    if (shouldDismiss) {
      const direction = delta >= 0 ? 1 : -1;
      setIsSwipingOut(true);
      setDragActive(true);
      setDragProgress(1);
      const targetOffset = direction * (width || 0) * 1.05;
      setDragOffset(targetOffset);
      dragOffsetRef.current = targetOffset;
      if (!removedRef.current) {
        removedRef.current = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
      onRemove(toast.id);
      skipClickRef.current = true;
    } else {
      setIsSwipingOut(false);
      setDragOffset(0);
      dragOffsetRef.current = 0;
      setDragProgress(0);
      scheduleDragReset();
      skipClickRef.current = dragMovedRef.current;
      if (pausedByDragRef.current && toast.duration && toast.duration > 0 && typeof globalPaused !== "boolean") {
        setLocalPaused(false);
      }
    }

    dragMovedRef.current = false;
    pausedByDragRef.current = false;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    completeDrag(event.pointerId, event.clientX);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    completeDrag(event.pointerId);
  };


  useEffect(() => {
    return () => {
      if (exitTimeout.current) clearTimeout(exitTimeout.current);
      if (dragResetTimeoutRef.current) clearTimeout(dragResetTimeoutRef.current);
    };
  }, []);
  const handleToastClick = () => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      dragMovedRef.current = false;
      return;
    }
    if (toast.dismissOnClick) handleRemove();
  };
  // Icon and color mapping
  const iconMap: Record<ToastType, { icon: ReactNode; color: string }> = {
    success: { icon: <Icon name="circle-check" style={{ fontSize: 24}}/>, color: "#10b981" },
    error: { icon: <Icon name="circle-close" style={{ fontSize: 24}}/>, color: "#ef4444" },
    warning: { icon: <Icon name="circle-exclamation" style={{ fontSize: 24}}/>, color: "#f59e0b" },
    info: { icon: <Icon name="circle-info" style={{ fontSize: 24}}/>, color: "#3b82f6" },
  };
  const iconData = iconMap[toast.type];
  let iconElem: ReactNode = null;
  if (iconOverrides && Object.prototype.hasOwnProperty.call(iconOverrides, toast.type)) {
    iconElem = iconOverrides[toast.type];
  } else {
    iconElem = (
      <div 
        style={{ 
          color: resolvedTheme === "colored" ? "#fff" : iconData.color, 
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }} 
        aria-hidden="true"
      >
        {iconData.icon}
      </div>
    );
  }
  // Bar color
  const barColorMap: Record<ToastType, string> = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  let barColor = barColorMap[toast.type];
  // Style override for theme
  let styleOverride: React.CSSProperties;
  if (resolvedTheme === "colored") {
    barColor = "#fff";
    styleOverride = {
      backgroundColor: barColorMap[toast.type],
      color: "#fff",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    };
  } else if (resolvedTheme === "dark") {
    styleOverride = {
      backgroundColor: "#18181b",
      color: "#f3f4f6",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    };
  } else if (resolvedTheme === "light") {
    styleOverride = {
      backgroundColor: "#fff",
      color: "#1f2937",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    };
  } else {
    // sync (default)
    styleOverride = {
      backgroundColor: "var(--pc-toast-bg, #fff)",
      color: "var(--pc-fg, #1f2937)",
      boxShadow: "var(--pc-shadow, 0 4px 16px 0 rgba(0,0,0,0.18))",
    };
  }
  const dragStyles: React.CSSProperties = {
    pointerEvents: "auto",
  };
  if (isDragEnabled) {
    dragStyles.touchAction = "pan-y";
    dragStyles.willChange = "transform";
    if (isDragging || dragActive || dragOffset !== 0) {
      dragStyles.transform = `translateX(${dragOffset}px)`;
      dragStyles.transition = isDragging ? "none" : "transform 0.2s cubic-bezier(0.2,0.61,0.355,1), opacity 0.2s ease";
      dragStyles.animationPlayState = "paused";
      dragStyles.userSelect = "none";
      if (isSwipingOut) {
        dragStyles.opacity = 0;
      } else if (dragProgress > 0) {
        const fade = Math.min(0.6, dragProgress * 0.6);
        if (fade > 0) {
          dragStyles.opacity = 1 - fade;
        }
      }
    }
  }

  const cursorStyle = resolvedDraggable === "always" ? (isDragging ? "grabbing" : "grab") : toast.dismissOnClick ? "pointer" : "default";

  return (
    <div
      ref={toastRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={dragStyles}
    >
      <div
        className={mergeClasses(
          classes.toast,
          classes.toastEntering,
          isExiting && classes.toastExiting
        )}
        onClick={handleToastClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: cursorStyle,
          ...styleOverride,
          ...(styles?.toast ?? {}),
          ...(styles ? styles[toast.type] : {}),
        }}
      >
        {iconElem !== null && (
          <span style={{ display: "inline-flex", alignItems: "center", marginRight: 12 }}>
            {iconElem}
          </span>
        )}
        <div style={{ flex: 1, alignContent: "center" }}>
          {toast.title && (
            <div className={classes.toastTitle} style={styles?.title}>
              {toast.title}
            </div>
          )}
          <div className={classes.toastMessage} style={styles?.message}>
            {toast.message}
          </div>
        </div>
        {shouldShowLoadingBar && (toast.duration ?? 0) > 0 && (
          <div className={classes.loadingBar}>
            <div
              className={classes.loadingBarInner}
              style={{
                transform: `scaleX(${barScale})`,
                transition: barTransition,
                background: barColor,
              }}
            />
          </div>
        )}
        {!toast.dismissOnClick && resolvedCloseIcon !== null && (
          <Button
            appearance="transparent"
            pressEffect={false}
            icon={resolvedCloseIcon !== undefined ? resolvedCloseIcon : <Icon name="close" style={{ fontSize: "24px"}} />}
            iconOnly
            className={mergeClasses(classes.closeBtn, resolvedTheme === "colored" && classes.closeBtnFullyColored)}
            style={styles?.closeButton}
            aria-label="Close notification"
            onClick={handleRemove}
          />
        )}
      </div>
    </div>
  );
}

export interface ToastProps {
  styles?: ToastStyleOverrides;
  icons?: ToastIconOverrides;
  closeIcon?: ReactNode | null;
  showLoadingBar?: boolean;
  pauseOnHover?: boolean;
  position?: ToastPosition;
  theme?: ToastTheme;
  role?: string;
  stacked?: boolean;
  draggable?: ToastDraggable;
  duration?: number;
  dismissOnClick?: boolean;
}

export default function Toast(props: ToastProps = {}) {
  const {
    styles: styleOverrides,
    icons,
    closeIcon,
    showLoadingBar = true,
    pauseOnHover = false,
    position = "topRight",
    theme = "sync",
    role,
    stacked = false,
    draggable = "touch",
    duration: defaultDuration,
    dismissOnClick: defaultDismissOnClick,
  } = props;
  const [pausedByPosition, setPausedByPosition] = useState<Partial<Record<ToastPosition, boolean>>>({});
  const [hoveredByPosition, setHoveredByPosition] = useState<Partial<Record<ToastPosition, boolean>>>({});
  const classes = useStyles();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  useEffect(() => {
    toastManager.setDefaults({
      duration: defaultDuration,
      dismissOnClick: defaultDismissOnClick,
      icons,
      closeIcon,
      showLoadingBar,
      pauseOnHover,
      position,
      theme,
      draggable,
    });
  }, [
    defaultDuration,
    defaultDismissOnClick,
    icons,
    closeIcon,
    showLoadingBar,
    pauseOnHover,
    position,
    theme,
    draggable,
  ]);

  const handleRemove = (id: string) => {
    setTimeout(() => {
      toastManager.remove(id);
    }, 200); // Match the exit animation duration
  };

  if (toasts.length === 0) {
    return null;
  }

  const positionClasses: Record<ToastPosition, string> = {
    topRight: classes.toastContainerTopRight,
    topCenter: classes.toastContainerTopCenter,
    topLeft: classes.toastContainerTopLeft,
    bottomRight: classes.toastContainerBottomRight,
    bottomCenter: classes.toastContainerBottomCenter,
    bottomLeft: classes.toastContainerBottomLeft,
  };

  const allPositions: ToastPosition[] = ["topRight", "topCenter", "topLeft", "bottomRight", "bottomCenter", "bottomLeft"];

  const handleContainerMouseEnter = (containerPosition: ToastPosition) => {
    if (!stacked) return;
    setPausedByPosition((prev) => ({ ...prev, [containerPosition]: true }));
    setHoveredByPosition((prev) => ({ ...prev, [containerPosition]: true }));
  };

  const handleContainerMouseLeave = (containerPosition: ToastPosition) => {
    if (!stacked) return;
    setPausedByPosition((prev) => ({ ...prev, [containerPosition]: false }));
    setHoveredByPosition((prev) => ({ ...prev, [containerPosition]: false }));
  };

  const groupedToasts = new Map<ToastPosition, ToastItem[]>();
  toasts.forEach((toastItem) => {
    const toastPosition: ToastPosition = toastItem.position ?? position;
    const bucket = groupedToasts.get(toastPosition);
    if (bucket) {
      bucket.push(toastItem);
    } else {
      groupedToasts.set(toastPosition, [toastItem]);
    }
  });

  return (
    <>
      {allPositions.map((pos) => {
        const items = groupedToasts.get(pos);
        if (!items || items.length === 0) {
          return null;
        }

        const isContainerHovered = hoveredByPosition[pos] ?? false;
        const containerPaused = pausedByPosition[pos] ?? false;

        return (
          <div
            key={pos}
            className={mergeClasses(classes.toastContainer, positionClasses[pos])}
            style={{
              ...styleOverrides?.root,
              ...(stacked
                ? {
                    pointerEvents: "auto",
                    background: "rgba(0,0,0,0.01)", // invisible but ensures hover area
                    paddingTop: 45,
                    paddingBottom: 45,
                    marginTop: -45,
                    marginBottom: -45,
                  }
                : {}),
            }}
            role={role}
            onMouseEnter={() => handleContainerMouseEnter(pos)}
            onMouseLeave={() => handleContainerMouseLeave(pos)}
          >
            {items.map((toastItem, index) => {
              let stackStyle: CSSProperties | undefined;
              if (stacked && !isContainerHovered) {
                stackStyle = {
                  marginTop: index === 0 ? 0 : -45,
                  boxShadow: `0 ${4 + index * 2}px ${12 + index * 2}px -${2 + index}px rgba(0,0,0,0.10)`,
                  zIndex: 100 - index,
                  transform: `scale(${1 - index * 0.05})`,
                  opacity: 1 - index * 0.04,
                  transition: "all 0.2s cubic-bezier(0.2,0.61,0.355,1)",
                };
              } else if (stacked && isContainerHovered) {
                stackStyle = {
                  marginTop: index === 0 ? 0 : 8,
                  boxShadow: "0 4px 12px 0 rgba(0,0,0,0.10)",
                  zIndex: 100 - index,
                  transform: "none",
                  opacity: 1,
                  transition: "all 0.2s cubic-bezier(0.2,0.61,0.355,1)",
                };
              }

              return (
                <div key={toastItem.id} style={stackStyle}>
                  <ToastComponent
                    toast={toastItem}
                    onRemove={handleRemove}
                    styles={{ ...styleOverrides, toast: { ...(styleOverrides?.toast ?? {}) } }}
                    icons={icons}
                    closeIcon={closeIcon}
                    theme={theme}
                    showLoadingBar={showLoadingBar}
                    pauseOnHover={pauseOnHover}
                    draggable={draggable}
                    paused={stacked ? containerPaused : undefined}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

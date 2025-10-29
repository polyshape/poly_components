import { makeStyles, mergeClasses} from "@griffel/react";
import React, { type CSSProperties, type ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icons/Icon.js";
import Button from "../button/Button.js";
import { Scrollbars } from "../scrollbars/Scrollbars.js";

export type PanelStyleOverrides = Partial<{
  root: CSSProperties;
  backdrop: CSSProperties;
  container: CSSProperties;
  panel: CSSProperties;
  header: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
  closeButton: CSSProperties;
}>;

export type PanelProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  onRequestClose?: (reason: "backdrop" | "escape" | "closeButton") => boolean | void;
  side?: "right" | "left";
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  disableAnimation?: boolean;
  trapFocus?: boolean;
  unmountOnClose?: boolean;
  modeless?: boolean;
  className?: string;
  styles?: PanelStyleOverrides;
  width?: number | string;
  role?: "dialog" | "alertdialog";
  ariaLabel?: string;
  useNativeScrollbars?: boolean;
};

const useStyles = makeStyles({
  root: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "grid",
  },
  hidden: { display: "none" },
  backdrop: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    opacity: 0,
    transition: "opacity 160ms ease",
  },
  backdropVisible: { opacity: 1 },
  container: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    pointerEvents: "none",
  },
  dragWrap: {
    pointerEvents: "auto",
    transform: "translate3d(0,0,0)",
  },
  panelBase: {
    background: "var(--pc-nav-bg, var(--pc-bg, #fff))",
    color: "var(--pc-fg, #222)",
    boxShadow: "0 20px 48px rgba(0,0,0,0.24)",
    border: "1px solid var(--pc-border, rgba(0,0,0,0.1))",
    borderRadius: "12px",
    maxHeight: "min(86vh, 980px)",
    minWidth: 0,
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    pointerEvents: "auto",
    transition: "transform 200ms ease, opacity 160ms ease",
  },
  modal: {
    transform: "translateY(0)",
  },
  side: {
    height: "100%",
    borderRadius: 0,
    maxHeight: "100%",
  },
  sideRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    transform: "translateX(0)",
  },
  sideLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    transform: "translateX(0)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderBottom: "1px solid var(--pc-border)",
    gap: "10px",
  },
  headerDraggable: { cursor: "move" },
  title: { fontSize: "1rem", fontWeight: 700 },
  subtitle: { fontSize: "0.9rem", opacity: 0.8 },
  titleWrap: { display: "grid" },
  content: {
    padding: "24px",
    overflow: "auto",
    minHeight: 0,
  },
  footer: {
    padding: "12px 14px",
    borderTop: "1px solid var(--pc-border)",
  },
  // Animation helpers
  modalInitial: { transform: "scale(0.96)", opacity: 0 },
  modalVisible: { transform: "scale(1)", opacity: 1 },
  sideRightInitial: { transform: "translateX(100%)" },
  sideLeftInitial: { transform: "translateX(-100%)" },
  sideVisible: { transform: "translateX(0)" },
  closingModal: { transform: "scale(0.96)", opacity: 0 },
  closingRight: { transform: "translateX(100%)" },
  closingLeft: { transform: "translateX(-100%)" },
});

export default function Panel(props: PanelProps) {
  const {
    isOpen,
    onClose,
    onAfterOpen,
    onAfterClose,
    onRequestClose,
    side = "right",
    title,
    subtitle,
    footer,
    children,
    closable = true,
    closeIcon,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    disableAnimation = false,
    trapFocus = true,
    unmountOnClose = true,
    modeless = false,
    className,
    styles,
    width,
    role = "dialog",
    ariaLabel,
    useNativeScrollbars,
  } = props;
  const classes = useStyles();
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  // no draggable logic for side panel

  // Focus management + simple focus trap
  useEffect(() => {
    const effectiveTrap = modeless ? false : trapFocus;
    if (isOpen === false || !effectiveTrap) return;
    // Save the previously focused element
    if (typeof document !== "undefined") {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    }

    const container = panelRef.current;
    if (!container) return;

    const focusFirst = () => {
      const focusable = container.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"])"
      );
      const first = focusable[0] ?? container;
      if (first && typeof (first).focus === "function") {
        (first as HTMLElement).focus();
      }
    };

    // Delay to after mount/entry start
    const id = requestAnimationFrame(focusFirst);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!effectiveTrap || e.key !== "Tab") return;
      const nodes = container.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"])"
      );
      const list = Array.from(nodes).filter((el) => el.offsetParent !== null || el === container);
      if (list.length === 0) {
        e.preventDefault();
        (container as HTMLElement).focus();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const forward = !e.shiftKey;
      if (forward && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!forward && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKeyDown);
      // Restore focus to the last focused element if still in the document
      const prev = lastFocusedRef.current;
      if (prev && typeof (prev).focus === "function") {
        prev.focus();
      }
    };
  }, [isOpen, trapFocus, modeless]);

  useEffect(() => {
    if (disableAnimation || isOpen === false) return;
    setEntered(false);
    setClosing(false);
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [disableAnimation, isOpen]);

  // Fire onAfterOpen after initial entry animation completes (or immediately if disabled)
  useEffect(() => {
    if (!onAfterOpen) return;
    if (disableAnimation) {
      onAfterOpen();
      return;
    }
    const t = window.setTimeout(() => onAfterOpen(), 220);
    return () => window.clearTimeout(t);
    // Run once per mount/show
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!closeOnEscape || isOpen === false) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onRequestClose && onRequestClose("escape") === false) return;
        if (disableAnimation) { onAfterClose?.(); onClose?.(); }
        else { setClosing(true); window.setTimeout(() => { onAfterClose?.(); onClose?.(); }, 200); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeOnEscape, onClose, disableAnimation, isOpen, onAfterClose, onRequestClose]);

  if (typeof document === "undefined") return null;
  const isClosed = isOpen === false;
  if (unmountOnClose && isClosed) return null;

  const sideWidth = width ?? 400;

  const panelInline: CSSProperties = {
    width: typeof sideWidth === "number" ? `${sideWidth}px` : String(sideWidth),
    ...(styles?.panel ?? {}),
  } as CSSProperties;

  const panelEl = (
    <div
      role={role}
      aria-label={ariaLabel}
      className={mergeClasses(
        classes.panelBase,
        classes.side,
        side === "right" ? classes.sideRight : "",
        side === "left" ? classes.sideLeft : "",
        !disableAnimation && (side === "right" ? classes.sideRightInitial : classes.sideLeftInitial),
        !disableAnimation && entered && classes.sideVisible,
        !disableAnimation && closing && (side === "right" ? classes.closingRight : classes.closingLeft),
        className
      )}
      ref={panelRef}
      tabIndex={-1}
      style={panelInline}
    >
      {(title || closable) && (
        <div className={classes.header} style={styles?.header}>
          <div style={{ display: "grid" }}>
            {title ? <div className={classes.title} style={styles?.title}>{title}</div> : null}
            {subtitle ? <div className={classes.subtitle} style={styles?.subtitle}>{subtitle}</div> : null}
          </div>
          {closable && (
            <Button
              aria-label="Close"
              size="small"
              appearance="transparent"
              pressEffect={false}
              style={styles?.closeButton}
              icon={closeIcon ?? <Icon name="close" weight={"medium"} style={{ fontSize: "18px" }} />}
              iconOnly
              onClick={() => {
                if (onRequestClose && onRequestClose("closeButton") === false) return;
                if (disableAnimation) { onAfterClose?.(); onClose?.(); }
                else { setClosing(true); window.setTimeout(() => { onAfterClose?.(); onClose?.(); }, 200); }
              }}
            />
          )}
        </div>
      )}
      {(() => {
        if (useNativeScrollbars) {
          const pad = (styles?.content as CSSProperties | undefined)?.padding ?? "14px";
          const padValue = typeof pad === "number" ? `${pad}px` : pad;
          const { padding, ...restContentStyles } = (styles?.content ?? {}) as CSSProperties & { padding?: string | number };
          return (
            <div
              className={classes.content}
              style={{ ...restContentStyles, overflow: "hidden", padding: 0 }}
            >
              <Scrollbars style={{ height: "100%" }}>
                <div style={{ padding: padValue }}>{children}</div>
              </Scrollbars>
            </div>
          );
        }
        return (
          <div className={classes.content} style={styles?.content}>
            {children}
          </div>
        );
      })()}
      {footer ? (
        <div className={classes.footer} style={styles?.footer}>{footer}</div>
      ) : null}
    </div>
  );

  // Modeless: render without overlay/backdrop; allow page behind to be interactive (side)
  if (modeless) {
    const wrapStyle: React.CSSProperties = { position: "fixed", inset: 0, zIndex: 1000, pointerEvents: "none" };
    return createPortal(
      <div style={wrapStyle}>
        <div style={{ pointerEvents: "auto" }}>{panelEl}</div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className={mergeClasses(classes.root, isClosed ? classes.hidden : "")} style={styles?.root}>
      <div
        className={mergeClasses(classes.backdrop, (disableAnimation || entered) && !closing ? classes.backdropVisible : "")}
        style={styles?.backdrop}
        onClick={() => {
          if (!closeOnBackdropClick) return;
          if (onRequestClose && onRequestClose("backdrop") === false) return;
          if (disableAnimation) { onAfterClose?.(); onClose?.(); }
          else { setClosing(true); window.setTimeout(() => { onAfterClose?.(); onClose?.(); }, 180); }
        }}
      />
      <div className={classes.container} style={styles?.container}>{panelEl}</div>
    </div>,
    document.body
  );
}

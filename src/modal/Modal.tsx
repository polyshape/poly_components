import { makeStyles, mergeClasses } from "@griffel/react";
import React, { type CSSProperties, type ReactNode, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icons/Icon.js";
import Button from "../button/Button.js";
import { Scrollbars } from "../scrollbars/Scrollbars.js";

export type ModalStyleOverrides = Partial<{
  root: CSSProperties;
  backdrop: CSSProperties;
  container: CSSProperties;
  dialog: CSSProperties;
  header: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
  closeButton: CSSProperties;
}>;

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  onRequestClose?: (reason: "backdrop" | "escape" | "closeButton") => boolean | void;
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  disableAnimation?: boolean;
  draggable?: boolean;
  trapFocus?: boolean;
  unmountOnClose?: boolean;
  modeless?: boolean;
  className?: string;
  styles?: ModalStyleOverrides;
  width?: number | string;
  role?: "dialog" | "alertdialog";
  ariaLabel?: string;
  useNativeScrollbars?: boolean;
};

const useStyles = makeStyles({
  root: { position: "fixed", inset: 0, zIndex: 1000, display: "grid" },
  hidden: { display: "none" },
  backdrop: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", opacity: 0, transition: "opacity 160ms ease" },
  backdropVisible: { opacity: 1 },
  container: { position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" },
  dragWrap: { pointerEvents: "auto", transform: "translate3d(0,0,0)" },
  dialogBase: {
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
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid var(--pc-border)", gap: "10px" },
  headerDraggable: { cursor: "move" },
  title: { fontSize: "1rem", fontWeight: 700 },
  subtitle: { fontSize: "0.9rem", opacity: 0.8 },
  content: { padding: "14px", overflow: "auto", minHeight: 0 },
  footer: { padding: "12px 14px", borderTop: "1px solid var(--pc-border)" },
  modalInitial: { transform: "scale(0.96)", opacity: 0 },
  modalVisible: { transform: "scale(1)", opacity: 1 },
  closingModal: { transform: "scale(0.96)", opacity: 0 },
});

export default function Modal(props: ModalProps) {
  const {
    isOpen,
    onClose,
    onAfterOpen,
    onAfterClose,
    onRequestClose,
    title,
    subtitle,
    footer,
    children,
    closable = true,
    closeIcon,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    disableAnimation = false,
    draggable = false,
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
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);
  const dragActive = modeless ? (draggable !== false) : !!draggable;

  const onDragStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!dragActive) return;
    if (e.button !== 0) return;
    e.preventDefault();
    const startX = e.clientX; const startY = e.clientY; const base = { ...dragOffset };
    const move = (ev: MouseEvent) => setDragOffset({ x: base.x + (ev.clientX - startX), y: base.y + (ev.clientY - startY) });
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
  };

  useEffect(() => {
    const effectiveTrap = modeless ? false : trapFocus;
    if (isOpen === false || !effectiveTrap) return;
    if (typeof document !== "undefined") {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    const container = modalRef.current; if (!container) return;
    const focusFirst = () => {
      const focusable = container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"]) ");
      const first = focusable[0] ?? container; if (first && typeof (first).focus === "function") (first as HTMLElement).focus();
    };
    const id = requestAnimationFrame(focusFirst);
    const onKeyDown = (e: KeyboardEvent) => {
      if (!effectiveTrap || e.key !== "Tab") return;
      const nodes = container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"]) ");
      const list = Array.from(nodes).filter((el) => el.offsetParent !== null || el === container);
      if (!list.length) { e.preventDefault(); (container as HTMLElement).focus(); return; }
      const first = list[0]; const last = list[list.length - 1]; const active = document.activeElement as HTMLElement | null; const forward = !e.shiftKey;
      if (forward && active === last) { e.preventDefault(); first.focus(); }
      else if (!forward && (active === first || active === container)) { e.preventDefault(); last.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { cancelAnimationFrame(id); window.removeEventListener("keydown", onKeyDown); const prev = lastFocusedRef.current; if (prev && typeof (prev).focus === "function") prev.focus(); };
  }, [isOpen, trapFocus, modeless]);

  useEffect(() => {
    if (disableAnimation || isOpen === false) return;
    setEntered(false); setClosing(false);
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [disableAnimation, isOpen]);

  // Keep latest onAfterOpen in a ref to avoid effect loops when prop identity changes
  const onAfterOpenRef = useRef<typeof onAfterOpen>(onAfterOpen);
  useEffect(() => { onAfterOpenRef.current = onAfterOpen; }, [onAfterOpen]);

  // Fire onAfterOpen once when transitioning from closed -> open
  const wasOpenRef = useRef<boolean>(false);
  useEffect(() => {
    let t: number | undefined;
    const wasOpen = wasOpenRef.current;
    if (!wasOpen && !!isOpen) {
      if (disableAnimation) onAfterOpenRef.current?.();
      else t = window.setTimeout(() => onAfterOpenRef.current?.(), 220);
    }
    wasOpenRef.current = !!isOpen;
    return () => { if (t) window.clearTimeout(t); };
  }, [isOpen, disableAnimation]);

  useEffect(() => {
    if (!closeOnEscape || isOpen === false) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onRequestClose && onRequestClose("escape") === false) return;
        if (disableAnimation) { onAfterClose?.(); onClose?.(); }
        else { setClosing(true); window.setTimeout(() => { onAfterClose?.(); onClose?.(); }, 200); }
      }
    };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, [closeOnEscape, onClose, disableAnimation, isOpen, onAfterClose, onRequestClose]);

  if (typeof document === "undefined") return null; const isClosed = isOpen === false; if (unmountOnClose && isClosed) return null;
  const size = width ?? 720;
  const modalInline: CSSProperties = (
    modeless
      ? { width: typeof size === "number" ? `${size}px` : String(size) }
      : { maxWidth: typeof size === "number" ? `${size}px` : String(size) }
  ) as CSSProperties;
  Object.assign(modalInline, styles?.dialog ?? {});

  const contentNode = (() => {
    if (useNativeScrollbars) {
      const pad = (styles?.content as CSSProperties | undefined)?.padding ?? "14px";
      const padValue = typeof pad === "number" ? `${pad}px` : pad;
      const { padding, ...rest } = (styles?.content ?? {}) as CSSProperties & { padding?: string | number };
      return (
        <div className={classes.content} style={{ ...rest, overflow: "hidden", padding: 0 }}>
          <Scrollbars style={{ height: "100%" }}>
            <div style={{ padding: padValue }}>{children}</div>
          </Scrollbars>
        </div>
      );
    }
    return (
      <div className={classes.content} style={styles?.content}>{children}</div>
    );
  })();

  const dialogEl = (
    <div
      role={role}
      aria-label={ariaLabel}
      className={mergeClasses(classes.dialogBase, !disableAnimation && classes.modalInitial, !disableAnimation && entered && classes.modalVisible, !disableAnimation && closing && classes.closingModal, className)}
      ref={modalRef}
      tabIndex={-1}
      style={modalInline}
    >
      {(title || closable) && (
        <div className={mergeClasses(classes.header, dragActive ? classes.headerDraggable : "")} style={styles?.header} onMouseDown={onDragStart}>
          <div style={{ display: "grid" }}>
            {title ? <div className={classes.title} style={styles?.title}>{title}</div> : null}
            {subtitle ? <div className={classes.subtitle} style={styles?.subtitle}>{subtitle}</div> : null}
          </div>
          {closable && (
            <Button aria-label="Close" size="small" appearance="transparent" pressEffect={false} style={styles?.closeButton} icon={closeIcon ?? <Icon name="close" weight={"medium"} style={{ fontSize: "18px" }} />} iconOnly onClick={() => {
              if (onRequestClose && onRequestClose("closeButton") === false) return;
              if (disableAnimation) { onAfterClose?.(); onClose?.(); }
              else { setClosing(true); window.setTimeout(() => { onAfterClose?.(); onClose?.(); }, 200); }
            }} />
          )}
        </div>
      )}
      {contentNode}
      {footer ? (<div className={classes.footer} style={styles?.footer}>{footer}</div>) : null}
    </div>
  );

  if (modeless) {
    const wrapStyle: React.CSSProperties = { position: "fixed", top: "50%", left: "50%", transform: `translate(-50%, -50%) translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`, zIndex: 1000, pointerEvents: "auto" };
    return createPortal(<div style={wrapStyle}>{dialogEl}</div>, document.body);
  }

  return createPortal(
    <div className={mergeClasses(classes.root, isClosed ? classes.hidden : "")} style={styles?.root}>
      <div className={mergeClasses(classes.backdrop, (disableAnimation || entered) && !closing ? classes.backdropVisible : "")} style={styles?.backdrop} onClick={() => {
        if (!closeOnBackdropClick) return; if (onRequestClose && onRequestClose("backdrop") === false) return; if (disableAnimation) { onAfterClose?.(); onClose?.(); } else { setClosing(true); window.setTimeout(() => { onAfterClose?.(); onClose?.(); }, 180); }
      }} />
      <div className={classes.container} style={styles?.container}>
        {dragActive ? (
          <div className={classes.dragWrap} style={{ transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)` }}>{dialogEl}</div>
        ) : (
          dialogEl
        )}
      </div>
    </div>,
    document.body
  );
}

import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import { normalizeBorderStyles } from "../utils/style";
import { forwardRef, useEffect, useRef, useState, cloneElement } from "react";
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

type Appearance = "primary" | "secondary" | "default" | "outline" | "subtle" | "transparent" | "danger";
type Size = "small" | "medium" | "large";
type Shape = "rounded" | "circular" | "square";

export type ButtonProps = {
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  selected?: boolean;
  pressEffect?: boolean;
  className?: string;
  contentClassName?: string;
  iconClassName?: string;
  spinnerClassName?: string;
  styles?: {
    root?: CSSProperties;
    content?: CSSProperties;
    icon?: CSSProperties;
    spinner?: CSSProperties;
    dropdown?: CSSProperties;
    dropdownArrow?: Partial<{
      size: number;
      top: number;
      left: number | string;
      right: number | string;
      background: string;
      borderColor: string;
      offsetX: number;
    }>;
  };
  children?: ReactNode;
  /**
   * Optional dropdown content. When provided, the button shows a chevron and
   * reveals these items in a dropdown on hover or click.
   */
  menuItems?: ReactNode[];
  hideChevron?: boolean;
  /** Trigger for opening the dropdown; defaults to 'hover'. */
  menuTrigger?: "hover" | "click" | "both";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & { type?: "button" | "submit" | "reset" };

const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "inline-block",
  },
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    font: "inherit",
    userSelect: "none",
    cursor: "pointer",
    border: 0,
    padding: "0.6rem 1rem",
    transition: "background 0.2s ease, color 0.2s ease, transform 0.1s ease",
  },
  press: { 
    ":active": { transform: "translateY(1px)" },
  },
  // Sizes
  small: { height: "2.25rem", minWidth: "2.25rem", fontSize: "0.92rem", padding: "0.4rem 0.75rem" },
  medium: { height: "2.5rem", minWidth: "2.5rem", fontSize: "1rem", padding: "0.55rem 0.9rem" },
  large: { height: "3rem", minWidth: "3rem", fontSize: "1rem", padding: "0.6rem 1rem" },

  // Shapes
  rounded: { borderRadius: "999px" },
  square: { borderRadius: "8px" },
  circular: { borderRadius: "50%", padding: 0 },

  // Appearances
  primary: {
    background: "color-mix(in srgb, var(--pc-accent, #D69D0D) 85%, var(--pc-primary-base, #000))",
    color: "#fff",
    border: 0,
    fontWeight: 700,
    ":disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  primaryInteractive: {
    ":hover": {
      background: "color-mix(in srgb, var(--pc-accent, #D69D0D) 95%, var(--pc-primary-base, #000))",
    },
    ":active": { background: "var(--pc-accent, #D69D0D)" },
  },
  secondary: {
    background:
      "var(--pc-secondary-bg, color-mix(in srgb, var(--pc-fg, currentColor) 12%, var(--pc-bg, transparent)))",
    color: "inherit",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor("var(--pc-border, color-mix(in srgb, currentColor 40%, transparent))"),
    ":disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  secondaryInteractive: {
    ":hover": {
      background:
        "var(--pc-secondary-hover, color-mix(in srgb, var(--pc-fg, currentColor) 18%, var(--pc-bg, transparent)))",
    },
    ":active": {
      background:
        "var(--pc-secondary-active, color-mix(in srgb, var(--pc-fg, currentColor) 24%, var(--pc-bg, transparent)))",
    },
  },
  outline: {
    background: "transparent",
    color: "inherit",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor("var(--pc-border, color-mix(in srgb, currentColor 40%, transparent))"),
    ":disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  outlineInteractive: {
    ":hover": {
      background: "color-mix(in srgb, var(--pc-fg, currentColor) 10%, transparent)",
    },
    ":active": {
      background: "color-mix(in srgb, var(--pc-fg, currentColor) 16%, transparent)",
    },
  },
  subtle: {
    background: "transparent",
    color: "inherit",
    border: 0,
    ":disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  subtleInteractive: {
    ":hover": { background: "color-mix(in srgb, var(--pc-fg, currentColor) 8%, transparent)" },
    ":active": { background: "color-mix(in srgb, var(--pc-fg, currentColor) 12%, transparent)" },
  },
  transparent: {
    background: "transparent",
    color: "inherit",
    border: 0,
    ":disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  transparentInteractive: {
    ":hover": {
      // Mix toward background: in light it brightens (toward white), in dark it darkens
      color: "color-mix(in srgb, var(--pc-fg, currentColor) 75%, var(--pc-bg, #fff))",
    },
    ":active": {
      color: "color-mix(in srgb, var(--pc-fg, currentColor) 65%, var(--pc-bg, #fff))",
    },
  },
  danger: {
    background: "color-mix(in srgb, var(--pc-danger, #C53030) 85%, #000)",
    color: "#fff",
    border: 0,
    ":disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  dangerInteractive: {
    ":hover": { background: "color-mix(in srgb, var(--pc-danger, #C53030) 95%, #000)" },
    ":active": { background: "var(--pc-danger, #C53030)" },
  },

  content: { display: "inline-flex", alignItems: "center", gap: "0.5rem" },
  icon: { display: "inline-flex", alignItems: "center" },
  spinner: { display: "inline-flex", alignItems: "center" },
  chevron: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    background: "var(--pc-nav-bg)",
    color: "var(--pc-fg)",
    minWidth: "180px",
    padding: "0.6rem 0.4rem",
    border: "1px solid var(--pc-border)",
    borderRadius: "10px",
    boxShadow: "0 10px 32px rgba(0,0,0,0.16)",
    zIndex: 1200,
    ":before": {
      content: '""',
      position: "absolute",
      top: "var(--pc-dd-arrow-top, 2px)",
      left: "var(--pc-dd-arrow-left, auto)",
      right: "var(--pc-dd-arrow-right, 20%)",
      transform: "translate(-50%, -50%)",
      width: "var(--pc-dd-arrow-size, 12px)",
      height: "var(--pc-dd-arrow-size, 12px)",
      background: "var(--pc-dd-arrow-bg, var(--pc-nav-bg))",
      borderLeft: "1px solid var(--pc-dd-arrow-border-color, var(--pc-border))",
      borderTop: "1px solid var(--pc-dd-arrow-border-color, var(--pc-border))",
      rotate: "45deg",
      transformOrigin: "center",
      zIndex: 1201,
    },
  },
  hoverBuffer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    height: "10px",
    background: "transparent",
    pointerEvents: "auto",
    zIndex: 1199,
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  appearance = "secondary",
  size = "large",
  shape = "rounded",
  icon,
  iconAfter,
  iconOnly,
  loading,
  selected, // currently unused visual, reserved for future toggle styling
  pressEffect = true,
  className,
  contentClassName,
  iconClassName,
  spinnerClassName,
  styles,
  type = "button",
  children,
  disabled,
  menuItems,
  hideChevron,
  menuTrigger = "hover",
  ...rest
}: ButtonProps, ref) => {
  const classes = useStyles();
  const isDisabled = disabled || loading;
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);

  // Close on outside click when opened via click/both
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const w = wrapperRef.current;
      if (!w) return;
      if (!w.contains(e.target as Node)) setOpen(false);
    };
    if (menuTrigger === 'click' || menuTrigger === 'both') {
      document.addEventListener('mousedown', onDocClick);
      return () => document.removeEventListener('mousedown', onDocClick);
    }
  }, [open, menuTrigger]);

  // Auto-align dropdown arrow under chevron (or center under button when hidden)
  useEffect(() => {
    if (!open) return;
    const userOverridesPosition = !!(styles?.dropdownArrow && (styles.dropdownArrow.left != null || styles.dropdownArrow.right != null));
    if (userOverridesPosition) return;
    const dd = dropdownRef.current;
    const wr = wrapperRef.current;
    if (!dd || !wr) return;

    const align = () => {
      const ddRect = dd.getBoundingClientRect();
      const refEl = (!hideChevron && chevronRef.current) ? chevronRef.current : wr;
      const refRect = refEl.getBoundingClientRect();
      const centerX = refRect.left + refRect.width / 2;
      let left = centerX - ddRect.left;
      const off = styles?.dropdownArrow?.offsetX ?? -8;
      left += off;
      // Clamp within dropdown bounds (with small padding)
      const PAD = 8;
      left = Math.max(PAD, Math.min(left, ddRect.width - PAD));
      dd.style.setProperty('--pc-dd-arrow-left', `${left}px`);
      dd.style.setProperty('--pc-dd-arrow-right', `auto`);
    };
    const raf = requestAnimationFrame(align);
    window.addEventListener('resize', align);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', align);
    };
  }, [open, hideChevron, styles?.dropdownArrow]);

  const content = (
    <button
      ref={ref}
      type={type}
      className={mergeClasses(
        classes.root,
        !isDisabled && pressEffect && classes.press,
        size === "small" && classes.small,
        size === "medium" && classes.medium,
        size === "large" && classes.large,
        shape === "rounded" && classes.rounded,
        shape === "square" && classes.square,
        shape === "circular" && classes.circular,
        appearance === "primary" && classes.primary,
        !isDisabled && appearance === "primary" && classes.primaryInteractive,
        (appearance === "secondary" || appearance === "default") && classes.secondary,
        !isDisabled && (appearance === "secondary" || appearance === "default") && classes.secondaryInteractive,
        appearance === "outline" && classes.outline,
        !isDisabled && appearance === "outline" && classes.outlineInteractive,
        appearance === "subtle" && classes.subtle,
        !isDisabled && appearance === "subtle" && classes.subtleInteractive,
        appearance === "transparent" && classes.transparent,
        !isDisabled && appearance === "transparent" && classes.transparentInteractive,
        appearance === "danger" && classes.danger,
        !isDisabled && appearance === "danger" && classes.dangerInteractive,
        className
      )}
      style={normalizeBorderStyles(styles?.root)}
      disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <span className={mergeClasses(classes.spinner, spinnerClassName)} aria-hidden style={styles?.spinner}>
          <i className="fa-solid fa-circle-notch fa-spin"></i>
        </span>
      )}
      <span className={mergeClasses(classes.content, contentClassName)} style={styles?.content}>
        {icon && <span className={mergeClasses(classes.icon, iconClassName)} style={styles?.icon}>{icon}</span>}
        {!iconOnly && children}
        {iconAfter && <span className={mergeClasses(classes.icon, iconClassName)} style={styles?.icon}>{iconAfter}</span>}
        {Array.isArray(menuItems) && !hideChevron && menuItems.length > 0 && (
          <span className={classes.chevron} aria-hidden ref={chevronRef}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </span>
    </button>
  );

  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    return content;
  }

  const onEnter = () => {
    if (isDisabled) return;
    if (menuTrigger === 'hover' || menuTrigger === 'both') setOpen(true);
  };
  const onLeave = () => {
    if (menuTrigger === 'hover' || menuTrigger === 'both') setOpen(false);
  };
  const onClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    if (menuTrigger === 'click' || menuTrigger === 'both') {
      e.preventDefault();
      setOpen(o => !o);
    }
    // let user onClick run too
    rest.onClick?.(e as any);
  };

  return (
    <span
      ref={wrapperRef}
      className={classes.container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      // Stop hover flicker when moving to dropdown
      style={{}}
    >
      {content && cloneElement(content as any, { onClick })}
      {(menuTrigger === 'hover' || menuTrigger === 'both') && (
        <div className={classes.hoverBuffer} onMouseEnter={onEnter} />
      )}
      {open && (
        <div
          className={classes.dropdown}
          role="menu"
          style={{
            ...(styles?.dropdown || {}),
            ...(styles?.dropdownArrow ? {
              ['--pc-dd-arrow-size' as any]: styles.dropdownArrow.size != null ? `${styles.dropdownArrow.size}px` : undefined,
              ['--pc-dd-arrow-top' as any]: styles.dropdownArrow.top != null ? `${styles.dropdownArrow.top}px` : undefined,
              ['--pc-dd-arrow-left' as any]: styles.dropdownArrow.left != null ? (typeof styles.dropdownArrow.left === 'number' ? `${styles.dropdownArrow.left}px` : styles.dropdownArrow.left) : undefined,
              ['--pc-dd-arrow-right' as any]: styles.dropdownArrow.right != null ? (typeof styles.dropdownArrow.right === 'number' ? `${styles.dropdownArrow.right}px` : styles.dropdownArrow.right) : undefined,
              ['--pc-dd-arrow-bg' as any]: styles.dropdownArrow.background,
              ['--pc-dd-arrow-border-color' as any]: styles.dropdownArrow.borderColor,
            } : {}),
          }}
          ref={dropdownRef}
        >
          {menuItems.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
      )}
    </span>
  );
});

Button.displayName = "Button";

export default Button;

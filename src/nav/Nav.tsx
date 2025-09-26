import { makeStyles } from "@griffel/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "../button";
import NavSmall from "./NavSmall";

export type NavItem = {
  id: string;
  label: string;
  href?: string;
  to?: string;
  end?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  items?: NavItem[];
};

export type NavStyleOverrides = Partial<{
  root: CSSProperties;
  bar: CSSProperties;
  barSmall: CSSProperties;
  customLeftSlot: CSSProperties;
  customRightSlot: CSSProperties;
  itemsWrapper: CSSProperties;
  menu: CSSProperties;
  item: CSSProperties;
  link: CSSProperties;
  subMenu: CSSProperties;
  subLink: CSSProperties;
  overlay: CSSProperties;
  burgerButton: CSSProperties;
  closeButton: CSSProperties;
  // More button styling
  moreButton: CSSProperties;
  moreWrapper: CSSProperties;
  // Chevron/dropdown indicator styling
  chevron: CSSProperties;
  chevronOpen: CSSProperties;
  chevronSide: CSSProperties;
  chevronIcon: CSSProperties;
  // Active state styling
  activeItem: CSSProperties;
  activeLink: CSSProperties;
  activeSubLink: CSSProperties;
}>;

export type NavProps = {
  items: NavItem[];
  variant?: "top" | "side";
  defaultOpenIds?: string[];
  className?: string;
  styles?: NavStyleOverrides;
  showBorder?: boolean;
  as?: React.ElementType;
  linkProp?: "to" | "href" | (string & {}); // "to" for NavLink, "href" for <a>, or any string
  /** Optional content rendered to the left side of the navigation items (top variant only). */
  customLeft?: ReactNode;
  /** Optional content rendered to the right side of the navigation items (top variant only). */
  customRight?: ReactNode;
  /**
   * Viewport width (in px) under which the small/mobile navigation is rendered.
   * Defaults to 850.
   */
  responsiveBreakpoint?: number;
  /** Controls the underline indicator on active/hovered items. Defaults to true. */
  showActiveUnderline?: boolean;
  /**
   * Disables the responsive overflow handling (hidden measurer and "More" button).
   * When true, all items are rendered inline and no overflow logic runs.
   */
  disableOverflow?: boolean;
  /**
   * @deprecated Width is measured automatically; this option is ignored.
   */
  overflowMeasure?: 'smart' | 'siblings' | 'self';
  /**
   * Explicit available width (in px) for the navigation items area. When provided,
   * this takes precedence over overflowMeasure.
   */
  overflowAvailableWidth?: number;
};

const useStyles = makeStyles({
  rootTop: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "var(--pc-nav-bg)",
    color: "var(--pc-fg, #222)",
    // Allow shrinking when used as a flex child in host layouts
    minWidth: 0,
  },
  rootTopBorder: {
    borderBottom: "1px solid var(--pc-border)",
  },
  bar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 16px",
  },
  slot: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    minWidth: 0,
    gap: "12px",
  },
  slotLeft: {
    composes: "$slot",
  },
  slotRight: {
    composes: "$slot",
    justifyContent: "flex-end",
  },
  itemsContainer: {
    minWidth: 0,
    display: "flex",
  },
  plainTextItem: {
    color: "var(--pc-fg, currentColor)",
  },
  listTop: { display: "flex", alignItems: "center", gap: "8px", flexWrap: 'nowrap' },
  itemBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    appearance: "none",
    background: "transparent",
    color: "var(--pc-fg, #222)",
    border: 0,
    padding: "5px 0",
    margin: "0 10px",
    borderRadius: "8px",
    cursor: "pointer",
    position: "relative",
    transition: "color 0.2s",
    ":hover, :focus, &[aria-current='page']": {
      background: "none",
    },
    ":after": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "2px",
      background: "var(--pc-accent, currentColor)",
      transformOrigin: "left center",
      transform: "scaleX(0)",
      borderRadius: "2px",
      transition: "transform 180ms ease-in-out",
      zIndex: 1,
    },
    ":hover:after, :focus:after, &[aria-current='page']:after": {
      transform: "scaleX(1) !important",
    },
    ":not(:hover):not(:focus):not([aria-current='page']):after": {
      transform: "scaleX(0)",
    },
  },
  link: {
    color: "var(--pc-fg)",
    textDecoration: "none",
    ":hover, :focus": {
      color: "color-mix(in srgb, var(--pc-fg, currentColor) 75%, var(--pc-bg, #fff))"
    },
    ":active, &[aria-current='page']": {
      color: "var(--pc-fg)",
      background: "none"
    },
    ":visited": {
      color: "color-mix(in srgb, var(--pc-fg, currentColor) 75%, var(--pc-bg, #fff))"
    }
  },
  linkSide: {
    color: "var(--pc-fg)",
    textDecoration: "none",
    ":hover, :focus": {
      color: "color-mix(in srgb, var(--pc-fg, currentColor) 75%, var(--pc-bg, #fff))",
      background: "none"
    },
    ":active, &[aria-current='page']": {
      color: "var(--pc-fg)",
      background: "none"
    },
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    transition: "color 0.2s",
    ":after": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "2px",
      background: "var(--pc-accent, currentColor)",
      transformOrigin: "left center",
      transform: "scaleX(0)",
      borderRadius: "2px",
      transition: "transform 180ms ease-in-out",
      zIndex: 1,
    },
    ":hover:after, :focus:after, &[aria-current='page']:after": {
      transform: "scaleX(1) !important",
    },
    ":not(:hover):not(:focus):not([aria-current='page']):after": {
      transform: "scaleX(0)",
    },
    ":visited": {
      color: "color-mix(in srgb, var(--pc-fg, currentColor) 75%, var(--pc-bg, #fff))"
    }
  },
  chevron: {
    marginTop: "5px",
    display: "inline-flex",
    verticalAlign: "middle",
    color: "inherit",
    transition: "transform 160ms ease"
  },
  chevronSide: {
    marginTop: "2px",
    display: "inline-flex",
    verticalAlign: "middle",
    color: "inherit",
    transition: "transform 160ms ease"
  },
  chevronIcon: {
    marginTop: "2px",
    transition: "transform 160ms ease"
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  chevronOpenSide: {
    transform: "rotate(180deg)",
    marginBottom: "6px",
  },
  noUnderline: {
    ":after": {
      display: 'none !important',
      content: 'none !important',
    },
  },
  dropdown: {
    position: "absolute",
    top: "130%",
    left: "40%",
    transform: "translateX(-50%)",
    background: "var(--pc-nav-bg)",
    color: "var(--pc-fg)",
    minWidth: "160px",
    padding: "0.6rem 0.4rem",
    border: "1px solid var(--pc-border)",
    borderRadius: "10px",
    boxShadow: "0 10px 32px rgba(0,0,0,0.16)",
    zIndex: 1000,
    ":before": {
      content: '""',
      position: "absolute",
      top: "2px",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "12px",
      height: "12px",
      background: "var(--pc-nav-bg)",
      borderLeft: "1px solid var(--pc-border)",
      borderTop: "1px solid var(--pc-border)",
      rotate: "45deg",
      transformOrigin: "center",
      zIndex: 1001,
    },
  },
  // Overflow handling (top variant only)
  moreWrapper: { position: "relative", display: 'flex', alignItems: 'center' },
  moreBtn: {
    height: "24px",
  },
  hiddenMeasure: {
    visibility: "hidden",
    position: "absolute",
    left: "-9999px",
    top: 0,
    pointerEvents: "none",
  },
  rootSide: {
    color: "var(--pc-fg, #222)",
    background: "var(--pc-nav-bg)",
    // Allow shrinking when used as a flex child in host layouts
    minWidth: 0,
  },
  rootSideBorder: {
    borderRight: "1px solid var(--pc-border)",
  },
  listSide: { display: "grid", gap: "4px", padding: "8px" },
  itemBtnSide: {
    composes: '$itemBtn',
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingRight: 0,
  },
  subListSide: { display: "grid", gap: "2px", paddingLeft: "14px", borderLeft: "2px solid var(--pc-border)" },
  subLink: {
    color: "var(--pc-fg) !important",
    textDecoration: "none",
    display: "block",
    padding: "6px 4px",
    borderRadius: '6px',
    transition: "background 0.2s",
    ":hover, :focus, :active": {
      background: "color-mix(in srgb, var(--pc-bg) 80%, var(--pc-border) 20%)",
      color: "inherit",
    },
  },
});


const isPositive = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const getViewportWidth = (): number => {
  if (typeof window === "undefined") return 0;
  const doc = window.document;
  const docEl = doc?.documentElement;
  const widths: number[] = [];
  const visual = window.visualViewport?.width;
  if (isPositive(visual)) widths.push(visual);
  const client = docEl?.clientWidth;
  if (isPositive(client)) widths.push(client);
  const rectWidth = docEl?.getBoundingClientRect().width;
  if (isPositive(rectWidth)) widths.push(rectWidth);
  if (isPositive(window.innerWidth)) widths.push(window.innerWidth);
  if (!widths.length) {
    return typeof window.innerWidth === "number" ? window.innerWidth : 0;
  }
  return Math.min(...widths);
};

const getElementWidth = (el?: HTMLElement | null): number => {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  return rect?.width ?? 0;
};

const getNodeFullWidth = (el: HTMLElement): number => {
  const rect = el.getBoundingClientRect();
  const styles = window.getComputedStyle(el);
  const marginLeft = parseFloat(styles.marginLeft || "0");
  const marginRight = parseFloat(styles.marginRight || "0");
  return rect.width + marginLeft + marginRight;
};


export default function Nav(props: NavProps) {
  const {
    items,
    variant = "top",
    defaultOpenIds = [],
    className,
    styles,
    showBorder = true,
    as,
    linkProp,
    responsiveBreakpoint = 850,
    showActiveUnderline = true,
    disableOverflow = false,
    overflowAvailableWidth,
    customLeft,
    customRight
  } = props;
  const classes = useStyles();
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const leftSlotRef = useRef<HTMLDivElement | null>(null);
  const rightSlotRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [availableWidth, setAvailableWidth] = useState<number | null>(
    typeof overflowAvailableWidth === "number" ? Math.max(0, overflowAvailableWidth) : null
  );
  const [visibleCount, setVisibleCount] = useState<number>(items.length);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsSmall(getViewportWidth() < responsiveBreakpoint);
    update();
    window.addEventListener("resize", update);
    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener("resize", update);
    visualViewport?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      visualViewport?.removeEventListener("resize", update);
      visualViewport?.removeEventListener("scroll", update);
    };
  }, [responsiveBreakpoint]);
  // Track available width for the nav items container
  useEffect(() => {
    if (variant !== 'top') {
      setAvailableWidth(
        typeof overflowAvailableWidth === 'number' ? Math.max(0, overflowAvailableWidth) : null
      );
      return;
    }

    if (typeof overflowAvailableWidth === 'number') {
      setAvailableWidth(Math.max(0, overflowAvailableWidth));
      return;
    }

    if (isSmall) {
      setAvailableWidth(null);
      return;
    }

    if (typeof window === 'undefined') return;
    let frame: number | null = null;

    const scheduleMeasure = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(() => {
        const total = getElementWidth(wrapperRef.current);
        const left = getElementWidth(leftSlotRef.current);
        const right = getElementWidth(rightSlotRef.current);
        const next = Math.max(0, total - left - right);
        setAvailableWidth((prev) => (prev === next ? prev : next));
      });
    };

    scheduleMeasure();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(scheduleMeasure);
      const observed = [wrapperRef.current, leftSlotRef.current, rightSlotRef.current].filter(Boolean) as HTMLElement[];
      observed.forEach((el) => observer.observe(el));
      return () => {
        if (frame !== null) {
          window.cancelAnimationFrame(frame);
        }
        observer.disconnect();
      };
    }

    window.addEventListener('resize', scheduleMeasure);
    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [variant, isSmall, overflowAvailableWidth, Boolean(customLeft), Boolean(customRight)]);

  // Recalculate visible items when available space or items change
  useEffect(() => {
    if (disableOverflow || variant !== 'top' || isSmall) {
      setVisibleCount(items.length);
      return;
    }

    const widthLimit =
      typeof overflowAvailableWidth === 'number'
        ? Math.max(0, overflowAvailableWidth)
        : availableWidth;

    if (widthLimit == null) {
      return;
    }

    const measurer = measureRef.current;
    if (!measurer) {
      setVisibleCount(items.length);
      return;
    }

    const navEl = measurer.querySelector('nav') as HTMLElement | null;
    let gap = 0;
    if (navEl) {
      const cs = window.getComputedStyle(navEl);
      gap = parseFloat((cs.columnGap || (cs as any).gap) || '0') || 0;
    }

    const itemNodes = Array.from(measurer.querySelectorAll('[data-role="item"]')) as HTMLElement[];
    const moreNode = measurer.querySelector('[data-role="more-btn"]') as HTMLElement | null;

    if (!itemNodes.length) {
      setVisibleCount(0);
      return;
    }

    const widths = itemNodes.map(getNodeFullWidth);
    const moreWidth = moreNode ? getNodeFullWidth(moreNode) : 0;

    const totalWidth = widths.reduce((sum, width, index) => sum + width + (index > 0 ? gap : 0), 0);
    if (totalWidth <= widthLimit) {
      setVisibleCount(items.length);
      return;
    }

    const prefix: number[] = [];
    for (let i = 0; i < widths.length; i += 1) {
      const prev = i === 0 ? 0 : prefix[i - 1];
      prefix[i] = prev + widths[i] + (i > 0 ? gap : 0);
    }

    let best = 0;
    for (let count = widths.length; count >= 0; count -= 1) {
      if (count === widths.length) {
        const usedAll = count > 0 ? prefix[count - 1] : 0;
        if (usedAll <= widthLimit) {
          best = count;
          break;
        }
      } else {
        const used = count > 0 ? prefix[count - 1] : 0;
        const withMore = used + (count > 0 ? gap : 0) + moreWidth;
        if (withMore <= widthLimit) {
          best = count;
          break;
        }
      }
    }

    setVisibleCount(best);
  }, [availableWidth, items, variant, isSmall, disableOverflow, overflowAvailableWidth]);
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpenIds));
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const LinkComponent = as || 'a';
  const renderMoreButton = (menuItemsForButton: ReactNode[], extraProps?: Record<string, any>) => (
    <Button
      appearance="transparent"
      size="small"
      shape="circular"
      pressEffect={false}
      className={`${classes.moreBtn}`}
      style={styles?.moreButton}
      menuTrigger="click"
      icon={<i className="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>}
      iconOnly
      aria-label="More"
      hideChevron
      menuItems={menuItemsForButton}
      {...(extraProps || {})}
    />
  );

  const getLinkProps = (item: NavItem) => {
    // Precedence: href > to
    const navTarget = item.href ?? item.to;
    if (!navTarget) return {};
    const props: Record<string, any> = {};
    if (linkProp) {
      props[linkProp] = navTarget;
    } else {
      const comp: any = LinkComponent;
      const isNavLink = comp?.displayName === 'NavLink' || comp?.name === 'NavLink';
      if (isNavLink) {
        props.to = navTarget;
      } else {
        props.href = navTarget;
      }
    }
    if (item.end !== undefined) {
      props.end = item.end;
    }
    return props;
  };
  if (isSmall) {
    return <NavSmall {...props} />;
  }

  if (variant === "side") {
    return (
      <nav className={`${classes.rootSide} ${showBorder ? classes.rootSideBorder : ""} ${className ?? ""}`} style={styles?.root}>
        <div className={classes.listSide} style={styles?.menu}>
          {items.map((it, idx) => {
            const id = it.id ?? `i-${idx}`;
            const hasChildren = !!it.items?.length;
            const opened = open.has(id);
            const isActive = activeId === id || (hasChildren && it.items?.some(sub => sub.id === activeId || sub.href === activeId));
            return (
              <div key={id}>
                <Button
                  appearance="transparent"
                  pressEffect={false}
                  className={classes.itemBtnSide}
                    style={{...styles?.item, ...(isActive ? styles?.activeItem : {})}}
                  onClick={(e) => {
                    if (hasChildren) {
                      setOpen(prev => { const next = new Set(prev); opened ? next.delete(id) : next.add(id); return next; });
                    } else {
                      setActiveId(id);
                      it.onClick?.(e);
                    }
                  }}
                  aria-expanded={hasChildren ? opened : undefined}
                  styles={{content: {height: "100%", width: "100%"}}}
                >
                  {(it.href || it.to)
                    ? <LinkComponent
                        className={`${classes.linkSide} ${!showActiveUnderline ? classes.noUnderline : ''}`}
                          style={{...styles?.link, ...(isActive ? styles?.activeLink : {})}}
                        {...getLinkProps(it)}
                        onClick={(e: React.MouseEvent) => {
                          if (!hasChildren) {
                            setActiveId(id);
                          }
                          it.onClick?.(e);
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{it.label}</span>
                        {hasChildren && (
                        <span className={`${classes.chevronSide} ${opened ? classes.chevronOpenSide : ''}`} style={{...styles?.chevronSide, ...(opened ? styles?.chevronOpen : {})}} aria-hidden>
                          <svg className={classes.chevronIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles?.chevronIcon}>
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        )}
                      </LinkComponent>
                    : <span style={styles?.link}>{it.label}</span>}
                </Button>
                {hasChildren && opened && (
                  <div className={classes.subListSide} style={styles?.subMenu}>
                    {it.items!.map((sub, sidx) => {
                      const subId = sub.id ?? `${id}-s-${sidx}`;
                      const subActive = activeId === subId || activeId === sub.href;
                      return (
                        (sub.href || sub.to)
                          ? <LinkComponent
                              key={subId}
                              className={classes.subLink}
                                style={{...styles?.subLink, ...(subActive ? styles?.activeSubLink : {})}}
                              {...getLinkProps(sub)}
                              onClick={(e: React.MouseEvent) => {
                                setActiveId(subId);
                                sub.onClick?.(e);
                              }}
                              aria-current={subActive ? "page" : undefined}
                            >
                              {sub.label}
                            </LinkComponent>
                          : <span key={subId} style={styles?.subLink}>{sub.label}</span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    );
  }

  // Top variant with hover/focus dropdowns
  return (
    <header className={`${classes.rootTop} ${showBorder ? classes.rootTopBorder : ""} ${className ?? ""}`} style={styles?.root}>
      <div className={classes.bar} style={styles?.bar} ref={wrapperRef}>
        {customLeft ? (
          <div className={classes.slotLeft} style={styles?.customLeftSlot} ref={leftSlotRef}>
            {customLeft}
          </div>
        ) : null}
        <div className={classes.itemsContainer} style={styles?.itemsWrapper}>
          <nav
            className={classes.listTop}
            style={styles?.menu}
            ref={containerRef as any}
          >
            {(disableOverflow ? items : items.slice(0, visibleCount)).map((it, idx) => {
              const hasChildren = !!it.items?.length;
              const id = it.id ?? `i-${idx}`;
              const isActive = activeId === id || (hasChildren && it.items?.some(sub => sub.id === activeId || sub.href === activeId));
              return (
                <div
                  key={id}
                  style={{ position: "relative", whiteSpace: "nowrap", ...(styles?.item ?? {}), ...(isActive ? styles?.activeItem : {}) }}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(v => (v === idx ? null : v))}
                >
                  {hasChildren && (it.href || it.to) ? (
                    <>
                      <LinkComponent
                        className={`${classes.itemBtn} ${classes.link}`}
                        style={{ ...styles?.link, ...(isActive ? styles?.activeLink : {}) }}
                        {...getLinkProps(it)}
                        onClick={(e: React.MouseEvent) => {
                          it.onClick?.(e);
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{it.label}</span>
                        <span className={`${classes.chevron} ${hoverIdx === idx ? classes.chevronOpen : ""}`} style={{ ...styles?.chevron, ...(hoverIdx === idx ? styles?.chevronOpen : {}) }} aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles?.chevronIcon}>
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </LinkComponent>
                      {hoverIdx === idx && (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              width: "100%",
                              height: "16px",
                              zIndex: 999,
                              pointerEvents: "auto",
                              background: "transparent",
                            }}
                          />
                          <div className={classes.dropdown} style={styles?.subMenu}>
                            {it.items!.map((sub, sidx) => {
                              const subId = sub.id ?? `${id}-s-${sidx}`;
                              const subActive = activeId === subId || activeId === sub.href;
                              return (sub.href || sub.to)
                                ? (
                                  <LinkComponent
                                    key={subId}
                                    className={classes.subLink}
                                    style={{ ...styles?.subLink, ...(subActive ? styles?.activeSubLink : {}) }}
                                    {...getLinkProps(sub)}
                                    onClick={(e: React.MouseEvent) => {
                                      setActiveId(subId);
                                      sub.onClick?.(e);
                                    }}
                                    aria-current={subActive ? "page" : undefined}
                                  >
                                    {sub.label}
                                  </LinkComponent>
                                )
                                : (
                                  <span key={subId} className={classes.plainTextItem} style={styles?.subLink}>{sub.label}</span>
                                );
                            })}
                          </div>
                        </>
                      )}
                    </>
                  ) : hasChildren ? (
                    <Button
                      appearance="transparent"
                      pressEffect={false}
                      className={classes.itemBtn}
                      aria-current={isActive ? "page" : undefined}
                      styles={{ content: styles?.link }}
                      menuItems={it.items!.map((sub, sidx) => {
                        const subId = sub.id ?? `${id}-s-${sidx}`;
                        const subActive = activeId === subId || activeId === sub.href;
                        return (sub.href || sub.to)
                          ? (
                            <LinkComponent
                              key={subId}
                              className={classes.subLink}
                              style={{ ...styles?.subLink, ...(subActive ? styles?.activeSubLink : {}) }}
                              {...getLinkProps(sub)}
                              onClick={(e: React.MouseEvent) => {
                                setActiveId(subId);
                                sub.onClick?.(e);
                              }}
                              aria-current={subActive ? "page" : undefined}
                            >
                              {sub.label}
                            </LinkComponent>
                          )
                          : (
                            <span key={subId} className={classes.plainTextItem} style={styles?.subLink}>{sub.label}</span>
                          );
                      })}
                      menuTrigger="hover"
                    >
                      {it.label}
                    </Button>
                  ) : (
                    (it.href || it.to)
                      ? (
                        <LinkComponent
                          className={`${classes.itemBtn} ${classes.link} ${!showActiveUnderline ? classes.noUnderline : ""}`}
                          style={{ ...styles?.link, ...(isActive ? styles?.activeLink : {}) }}
                          {...getLinkProps(it)}
                          onClick={(e: React.MouseEvent) => {
                            if (!hasChildren) {
                              setActiveId(id);
                            }
                            it.onClick?.(e);
                          }}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span>{it.label}</span>
                        </LinkComponent>
                      )
                      : <span className={classes.plainTextItem} style={styles?.link}>{it.label}</span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        
        {!disableOverflow && visibleCount < items.length && (
          <div className={classes.moreWrapper} style={styles?.moreWrapper}>
            {renderMoreButton(
              items.slice(visibleCount).map((it, idx) => {
                const hasChildren = !!it.items?.length;
                const id = it.id ?? `overflow-i-${idx}`;
                const isActive = activeId === id || (hasChildren && it.items?.some(sub => sub.id === activeId || sub.href === activeId));
                return (it.href || it.to)
                  ? (
                    <LinkComponent
                      key={id}
                      className={classes.subLink}
                      style={{ ...styles?.subLink, ...(isActive ? styles?.activeSubLink : {}) }}
                      {...getLinkProps(it)}
                      onClick={(e: React.MouseEvent) => {
                        if (!hasChildren) {
                          setActiveId(id);
                        }
                        it.onClick?.(e);
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {it.label}
                    </LinkComponent>
                  )
                  : <span key={id} className={classes.plainTextItem} style={styles?.subLink}>{it.label}</span>;
              })
            )}
          </div>
        )}
        {customRight ? (
          <div className={classes.slotRight} style={styles?.customRightSlot} ref={rightSlotRef}>
            {customRight}
          </div>
        ) : null}
      </div>
      {!disableOverflow && (
        <div
          className={classes.hiddenMeasure}
          ref={measureRef as any}
          aria-hidden
        >
          <nav className={classes.listTop} style={styles?.menu}>
            {items.map((it, idx) => {
              const hasChildren = !!it.items?.length;
              const id = it.id ?? `m-i-${idx}`;
              return (
                <div key={id} style={{ position: "relative", whiteSpace: "nowrap", ...(styles?.item ?? {}) }}>
                  {(it.href || it.to)
                    ? (
                      <LinkComponent className={`${classes.itemBtn} ${classes.link}`} style={styles?.link} {...getLinkProps(it)} data-role="item">
                        <span>{it.label}</span>
                        {hasChildren && (
                          <span className={classes.chevron} style={styles?.chevron} aria-hidden>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles?.chevronIcon}>
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </LinkComponent>
                    )
                    : <span className={classes.plainTextItem} style={styles?.link} data-role="item">{it.label}</span>
                  }
                </div>
              );
            })}
            {renderMoreButton([<span key="_dummy" />], { 'data-role': 'more-btn' })}
          </nav>
        </div>
      )}
    </header>
  );
}

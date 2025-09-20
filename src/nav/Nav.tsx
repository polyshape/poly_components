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
  menu: CSSProperties;
  item: CSSProperties;
  link: CSSProperties;
  subMenu: CSSProperties;
  subLink: CSSProperties;
  overlay: CSSProperties;
  burgerButton: CSSProperties;
  closeButton: CSSProperties;
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
   * How to determine available width for the top navigation overflow calculation.
   * - 'siblings' (default): infer from parent width minus siblings' widths.
   * - 'self': use the container's own clientWidth (more robust in centered flex layouts).
   */
  overflowMeasure?: 'siblings' | 'self';
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
    height: "32px",
  },
  hiddenMeasure: { visibility: "hidden", position: "absolute", left: 0, top: 0, pointerEvents: "none" },
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

export default function Nav(props: NavProps) {
  const { items, variant = "top", defaultOpenIds = [], className, styles, showBorder = true, as, linkProp, responsiveBreakpoint = 850, showActiveUnderline = true, disableOverflow = false, overflowMeasure = 'siblings', overflowAvailableWidth } = props;
  const classes = useStyles();
  // Responsive switch between full Nav and NavSmall
  const [isSmall, setIsSmall] = useState<boolean>(false);
  // Overflow handling (top variant)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(items.length);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsSmall(window.innerWidth < responsiveBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [responsiveBreakpoint]);
  // Recalculate visible items on resize and when items change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (disableOverflow) {
      setVisibleCount(items.length);
      return;
    }
    if (variant !== 'top' || isSmall) {
      setVisibleCount(items.length);
      return;
    }

    const calc = () => {
      const container = containerRef.current;
      const measurer = measureRef.current;
      if (!container || !measurer) {
        setVisibleCount(items.length);
        return;
      }
      let containerWidth = 0;
      if (typeof overflowAvailableWidth === 'number') {
        containerWidth = Math.max(0, overflowAvailableWidth);
      } else if (overflowMeasure === 'self') {
        containerWidth = (container.clientWidth || (container as any).offsetWidth || 0) || 0;
      } else {
        const barEl = container.parentElement as HTMLElement | null;
        // Available width = bar width minus widths of siblings (logo, actions, etc.)
        const barWidth = (barEl?.clientWidth || barEl?.offsetWidth || 0) || 0;
        let sibsWidth = 0;
        if (barEl) {
          const siblings = Array.from(barEl.children) as HTMLElement[];
          for (const el of siblings) {
            if (el === container) continue;
            const cs = window.getComputedStyle(el);
            // Ignore hidden/absolute/inert measure elements (like our hidden measurer)
            if (
              el.hasAttribute('aria-hidden') ||
              cs.visibility === 'hidden' ||
              cs.display === 'none' ||
              cs.position === 'absolute'
            ) {
              continue;
            }
            const rect = el.getBoundingClientRect();
            const ml = parseFloat(cs.marginLeft || '0');
            const mr = parseFloat(cs.marginRight || '0');
            sibsWidth += rect.width + ml + mr;
          }
        }
        containerWidth = Math.max(0, barWidth - sibsWidth);
      }
      const BUFFER_PX = 15; // Reserve a tiny buffer to avoid visual overflow
      const effectiveWidth = Math.max(0, containerWidth - BUFFER_PX);
      const csContainer = window.getComputedStyle(container);
      const gap = parseFloat((csContainer.columnGap || (csContainer as any).gap) || '0') || 0;
      const itemNodes = Array.from(measurer.querySelectorAll('[data-role="item"]')) as HTMLElement[];
      const moreNode = measurer.querySelector('[data-role="more-btn"]') as HTMLElement | null;
      const moreW = moreNode ? (moreNode.getBoundingClientRect().width + (() => { const cs = window.getComputedStyle(moreNode); return parseFloat(cs.marginLeft||'0') + parseFloat(cs.marginRight||'0'); })()) : 0;

      // First, check if ALL items fit without a More button.
      // This avoids the greedy-then-last transition trap where the reserved
      // space for the More button prevents reaching the last item even
      // though all items together would fit.
      const totalUsed = itemNodes.reduce((acc, el, i) => {
        const rectW = el.getBoundingClientRect().width;
        const cs = window.getComputedStyle(el);
        const ml = parseFloat(cs.marginLeft || '0');
        const mr = parseFloat(cs.marginRight || '0');
        const w = rectW + ml + mr;
        const addGap = i > 0 ? gap : 0;
        return acc + w + addGap;
      }, 0);
      if (totalUsed <= effectiveWidth) {
        setVisibleCount(items.length);
        return;
      }

      // Otherwise, choose the maximal count that fits. This checks both cases:
      // - all items visible (no More)
      // - some visible + More button (with gap before More when at least one item visible)
      const widths = itemNodes.map((el) => {
        const rectW = el.getBoundingClientRect().width;
        const cs = window.getComputedStyle(el);
        const ml = parseFloat(cs.marginLeft || '0');
        const mr = parseFloat(cs.marginRight || '0');
        return rectW + ml + mr;
      });
      // prefix[i] = total width of items 0..i including gaps between them
      const prefix: number[] = [];
      for (let i = 0; i < widths.length; i++) {
        const prev = i === 0 ? 0 : prefix[i - 1];
        const addGap = i > 0 ? gap : 0;
        prefix[i] = prev + widths[i] + addGap;
      }
      let best = 0;
      for (let c = itemNodes.length; c >= 0; c--) {
        if (c === itemNodes.length) {
          // No More button when all visible
          const usedAll = c > 0 ? prefix[c - 1] : 0;
          if (usedAll <= effectiveWidth) { best = c; break; }
        } else {
          const used = c > 0 ? prefix[c - 1] : 0;
          const withMore = used + (c > 0 ? gap : 0) + moreW;
          if (withMore <= effectiveWidth) { best = c; break; }
        }
      }
      setVisibleCount(Math.max(0, best));
      };

    // Initial and on next paint for accuracy
    const raf = window.requestAnimationFrame(() => calc());
    window.addEventListener('resize', calc);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', calc);
    };
  }, [items, variant, isSmall, disableOverflow, overflowMeasure, overflowAvailableWidth]);
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
    return (
      <NavSmall {...props} />
    );
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
                    style={styles?.item}
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
                          style={styles?.link}
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
                        <span className={`${classes.chevronSide} ${opened ? classes.chevronOpenSide : ''}`} aria-hidden>
                          <svg className={classes.chevronIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                style={styles?.subLink}
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
      <div className={classes.bar} style={styles?.bar}>
        <nav
          className={classes.listTop}
          style={styles?.menu}
          ref={containerRef as any}
        >
          {((disableOverflow ? items : items.slice(0, visibleCount))).map((it, idx) => {
            const hasChildren = !!it.items?.length;
            const id = it.id ?? `i-${idx}`;
            const isActive = activeId === id || (hasChildren && it.items?.some(sub => sub.id === activeId || sub.href === activeId));
            return (
              <div
                key={id}
                style={{ position: "relative", whiteSpace: 'nowrap', ...(styles?.item ?? {}) }}
                onMouseEnter={() => setHoverIdx(idx)}
                onMouseLeave={() => setHoverIdx(v => (v === idx ? null : v))}
              >
                {hasChildren && (it.href || it.to) ? (
                  <>
                    <LinkComponent
                      className={`${classes.itemBtn} ${classes.link}`}
                      style={styles?.link}
                      {...getLinkProps(it)}
                      onClick={(e: React.MouseEvent) => {
                        // Parent with submenu should not set active
                        it.onClick?.(e);
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{it.label}</span>
                      <span className={`${classes.chevron} ${hoverIdx === idx ? classes.chevronOpen : ''}`} aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            return (
                              (sub.href || sub.to)
                                ? <LinkComponent
                                    key={subId}
                                    className={classes.subLink}
                                    style={styles?.subLink}
                                    {...getLinkProps(sub)}
                                    onClick={(e: React.MouseEvent) => {
                                      setActiveId(subId);
                                      sub.onClick?.(e);
                                    }}
                                    aria-current={subActive ? "page" : undefined}
                                  >
                                    {sub.label}
                                  </LinkComponent>
                                : <span key={subId} className={classes.plainTextItem} style={styles?.subLink}>{sub.label}</span>
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
                              style={styles?.subLink}
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
                  ? <LinkComponent
                      className={`${classes.itemBtn} ${classes.link} ${!showActiveUnderline ? classes.noUnderline : ''}`}
                      style={styles?.link}
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
                    : <span className={classes.plainTextItem} style={styles?.link}>{it.label}</span>
                )}
              </div>
            );
          })}
          {!disableOverflow && visibleCount < items.length && (
            <div className={classes.moreWrapper}>
              {renderMoreButton(
                items.slice(visibleCount).map((it, idx) => {
                  const hasChildren = !!it.items?.length;
                  const id = it.id ?? `overflow-i-${idx}`;
                  const isActive = activeId === id || (hasChildren && it.items?.some(sub => sub.id === activeId || sub.href === activeId));
                  return (
                    (it.href || it.to)
                      ? <LinkComponent
                          key={id}
                          className={classes.subLink}
                          style={styles?.subLink}
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
                      : <span key={id} className={classes.plainTextItem} style={styles?.subLink}>{it.label}</span>
                  );
                })
              )}
            </div>
          )}
        </nav>
        {/* Hidden measurer for computing widths (skip via disableOverflow, e.g. in tests) */}
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
                  <div key={id} style={{ position: 'relative', whiteSpace: 'nowrap', ...(styles?.item ?? {}) }}>
                    {(it.href || it.to)
                      ? <LinkComponent className={`${classes.itemBtn} ${classes.link}`} style={styles?.link} {...getLinkProps(it)} data-role="item">
                          <span>{it.label}</span>
                          {hasChildren && (
                            <span className={classes.chevron} aria-hidden>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}
                        </LinkComponent>
                      : <span className={classes.plainTextItem} style={styles?.link} data-role="item">{it.label}</span>
                    }
                  </div>
                );
              })}
              {/* more button width (single source via renderMoreButton) */}
              {renderMoreButton([<span key="_dummy" />], { 'data-role': 'more-btn' })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

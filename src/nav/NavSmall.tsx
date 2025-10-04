import type { NavItem, NavProps } from "./Nav.js";
import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@griffel/react";
import { Button } from "../button/index.js";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "var(--pc-nav-bg)",
    color: "var(--pc-fg, #222)",
    width: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    height: "3.5rem",
    padding: "0 1rem",
  },
  burgerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "var(--pc-nav-bg)",
    zIndex: 2000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "4rem",
    width: "100vw",
    height: "100vh",
    maxHeight: "100dvh",
    boxSizing: "border-box",
    paddingBottom: "calc(3.5rem + env(safe-area-inset-bottom, 0px))",
    overflowX: "hidden",
    overflowY: "auto",
    scrollbarGutter: "stable both-edges",
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain",
    border: "none",
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
    transform: "translateY(-8px)",
    transition: "opacity 200ms ease, transform 220ms ease, visibility 0s linear 220ms",
  },
  overlayOpen: {
    "&&&": {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
      transform: "translateY(0)",
      transition: "opacity 200ms ease, transform 220ms ease, visibility 0s",
    }
  },
  burgerBtn: {
    display: "block",
    position: "absolute",
    right: "0.5rem",
    fontSize: "1.5rem",
    zIndex: 1001,
    padding: "0.3rem",
    transform: "scaleX(1.25)",
    ":active": {
      transform: "scaleX(1.25) translateY(1px)",
    }
  },
  closeBtn: {
    position: "absolute",
    top: "5px",
    right: "-5px",
    fontSize: "1.5rem",
    zIndex: 2001,
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
    maxWidth: "450px",
    margin: 0,
    gap: "2rem",
    zIndex: 2001,
    background: "transparent",
    color: "var(--pc-fg)",
    position: "relative",
    border: "none",
    paddingLeft: "1.5rem",
    opacity: 0,
    transform: "translateY(8px)",
    transition: "opacity 220ms ease 60ms, transform 220ms ease 60ms",
  },
  menuOpen: {
    "&&&": {
      display: "flex",
      opacity: 1,
      transform: "translateY(0)",
      width: "90%",
    }
  },
  menuItem: {
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    display: "flex",
    fontWeight: 700,
    textAlign: "left",
    width: "100%",
    padding: "0.7rem 0",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.7rem",
    marginBottom: "0.7rem",
    position: "relative",
    zIndex: 2002,
    transition: "none",
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
    '&[aria-current="page"]:after': {
      transform: "scaleX(1) !important",
    },
    ':not([aria-current="page"]):after': {
      transform: "scaleX(0)",
    },
  },
  chevron: {
    marginLeft: "1rem",
    transition: "transform 160ms",
  },
  neutralIcon: {
    marginLeft: "1rem",
    display: "inline-flex",
    verticalAlign: "middle",
    color: "inherit",
    transition: "transform 160ms",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    alignItems: "flex-start",
    width: "100%",
  },
  itemWrapper: {
    width: "95%",
  },
  submenu: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    marginLeft: "1.5rem",
    marginTop: "0.2rem",
    alignItems: "flex-start",
  },
  submenuItem: {
    fontSize: "1rem",
    fontWeight: 500,
    background: "none",
    border: "none",
    padding: "0.5rem 0",
    textAlign: "left",
    cursor: "pointer",
    opacity: 0.95,
    position: "relative",
    zIndex: 2002,
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
  customLeftSlot: {
    display: "flex",
    alignItems: "center",
    flex: "0 0 auto",
  },
  customRightSlot: {
    display: "flex",
    alignItems: "center",
    flex: "0 0 auto",
  },
});

type NavSmallProps = Omit<NavProps, "variant" | "defaultOpenIds" | "showBorder" | "responsiveBreakpoint">;

export default function NavSmall({ items, as, linkProp, className, styles, customLeft, customRight }: NavSmallProps) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const burgerBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const LinkComponent = as || "a";

  // Focus management
  const closeMenu = (restoreFocus = true) => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    if (restoreFocus) burgerBtnRef.current?.focus();
  };

  // Accessibility: inert overlay when hidden
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (!menuOpen) {
      el.setAttribute("inert", "");
    } else {
      el.removeAttribute("inert");
    }
  }, [menuOpen]);

  const getLinkProps = (item: NavItem) => {
    // Precedence: href > to
    const navTarget = item.href ?? item.to;
    if (!navTarget) return {};
    const props: Record<string, string | boolean> = {};
    if (linkProp) {
      props[linkProp] = navTarget;
    } else {
      const comp = LinkComponent as React.ComponentType & { displayName?: string; name?: string };
      const isNavLink = comp?.displayName === "NavLink" || comp?.name === "NavLink";
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

  return (
    <header className={className ? classes.root + " " + className : classes.root} style={styles?.root}>
      <div className={classes.inner} style={styles?.barSmall}>
        {customLeft ? (
          <div className={classes.customLeftSlot} style={styles?.customLeftSlot}>{customLeft}</div>
        ) : (
          <div></div>
        )}
        <Button
          className={classes.burgerBtn}
          style={styles?.burgerButton}
          appearance="transparent"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          ref={burgerBtnRef}
          icon={<i className="fa-solid fa-bars"></i>}
          iconOnly
          onClick={() => {
            setMenuOpen(open => !open);
            setOpenSubmenu(null);
          }}
        />
        {customRight ? (
          <div className={classes.customRightSlot} style={styles?.customRightSlot}>{customRight}</div>
        ) : (
          <div></div>
        )}
      </div>
      <div
        aria-hidden={!menuOpen}
        className={menuOpen ? `${classes.overlay} ${classes.overlayOpen}` : classes.overlay}
        ref={overlayRef}
        style={{ ...(styles?.overlay || {}), pointerEvents: menuOpen ? "auto" : "none" }}
        onKeyDown={e => {
          if (e.key === "Escape" && menuOpen) {
            e.stopPropagation();
            closeMenu();
          }
        }}
      >
        <nav className={menuOpen ? `${classes.menu} ${classes.menuOpen}` : classes.menu} style={styles?.menu}>
          {items.map((route, idx) => {
            const routeId = route.id ?? route.href ?? route.to ?? `route-${idx}`;
            const hasChildren = !!route.items?.length;
            const isActive = activeId === routeId || (hasChildren && route.items?.some(sub => sub.id === activeId || sub.href === activeId || sub.to === activeId));
            return hasChildren ? (
              <div className={classes.group} key={routeId}>
                <div className={classes.itemWrapper} style={styles?.item}>
                  <LinkComponent
                    className={`${classes.menuItem}`}
                    style={styles?.link}
                    {...getLinkProps(route)}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      route.onClick?.(e);
                      setOpenSubmenu(openSubmenu === routeId ? null : routeId);
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{route.label}</span>
                    <span className={classes.neutralIcon} aria-hidden>
                      {openSubmenu === routeId ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  </LinkComponent>
                  {openSubmenu === routeId && route.items && route.items.length > 0 && (
                    <div className={classes.submenu} style={styles?.subMenu}>
                      {route.items?.map((sub, subIdx) => {
                        const subId = sub.id ?? sub.href ?? sub.to ?? `${routeId}-sub-${subIdx}`;
                        const subActive = activeId === subId;
                        return (sub.href || sub.to) ? (
                          <LinkComponent
                            key={subId}
                            className={`${classes.submenuItem}`}
                            style={styles?.subLink}
                            {...getLinkProps(sub)}
                            onClick={(e: React.MouseEvent) => {
                              setActiveId(subId);
                              sub.onClick?.(e);
                              closeMenu();
                            }}
                            aria-current={subActive ? "page" : undefined}
                          >
                            {sub.label}
                          </LinkComponent>
                        ) : (
                          <span key={subId} className={classes.submenuItem} style={styles?.subLink}>{sub.label}</span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              (route.href || route.to) ? (
                <div key={routeId} className={classes.itemWrapper} style={styles?.item}>
                  <LinkComponent
                    className={`${classes.menuItem}`}
                    style={styles?.link}
                    {...getLinkProps(route)}
                    onClick={(e: React.MouseEvent) => {
                      setActiveId(routeId);
                      route.onClick?.(e);
                      closeMenu();
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {route.label}
                  </LinkComponent>
                </div>
              ) : (
                <span key={routeId} className={classes.menuItem} style={styles?.link}>{route.label}</span>
              )
            );
          })}
        </nav>
        <Button
            appearance="transparent"
            icon={<i className="fa-solid fa-xmark"></i>}
            iconOnly
            className={classes.closeBtn}
            style={styles?.closeButton}
            aria-label="Close menu"
            onClick={() => closeMenu()}/>
      </div>
    </header>
  );
}

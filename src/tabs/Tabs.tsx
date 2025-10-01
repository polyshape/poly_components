import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import { Button } from "../button/index.js";
import { useEffect, useState, type ReactNode } from "react";

export type TabKey = string;

export type Tab = {
  key: TabKey;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  tabs: Tab[];
  /** Controlled active tab */
  active?: TabKey;
  /** Initial active tab when uncontrolled */
  defaultActive?: TabKey;
  /** Fired on tab change */
  onChange?: (key: TabKey) => void;
  ariaLabel?: string;
  className?: string;
};

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: "14px",
    marginTop: "6px",
  },
  tablist: {
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid var(--pc-border)",
  },
  tab: {
    appearance: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "1px solid transparent",
    borderBottom: 0,
    color: "var(--pc-muted, color-mix(in srgb, var(--pc-fg, currentColor) 70%, transparent))",
    transition: "color 200ms ease, background-color 200ms ease, border-color 200ms ease",
    padding: "8px 12px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "0",
    borderBottomLeftRadius: "0",
    height: "auto",
    minHeight: "auto",
    minWidth: "unset",
    lineHeight: 1.3,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    ":hover": {
      color: "var(--pc-fg)",
      backgroundColor: "color-mix(in srgb, var(--pc-card, transparent) 55%, transparent)",
      ...shorthands.borderColor("color-mix(in srgb, var(--pc-border, currentColor) 60%, transparent)"),
      borderBottomColor: "transparent",
    },
  },
  active: {
    color: "var(--pc-fg)",
    // Card background when active
    backgroundColor: "var(--pc-card, color-mix(in srgb, var(--pc-fg, currentColor) 5%, var(--pc-bg, #fff)))",
    ...shorthands.borderColor("var(--pc-border)"),
    borderBottomColor: "transparent",
  },
  
});

export default function Tabs({ tabs, active: activeProp, defaultActive, onChange, ariaLabel = "Tabs", className }: TabsProps) {
  const classes = useStyles();
  const isControlled = activeProp !== undefined;
  const [internalActive, setActive] = useState<TabKey | null>(() => {
    if (activeProp !== undefined) {
      return activeProp;
    }
    return defaultActive ?? tabs[0]?.key ?? null;
  });

  useEffect(() => {
    if (isControlled) {
      return;
    }
    const fallback = defaultActive ?? tabs[0]?.key ?? null;
    setActive(prev => {
      if (defaultActive !== undefined && defaultActive !== prev) {
        return defaultActive;
      }
      if (prev && tabs.some(tab => tab.key === prev)) {
        return prev;
      }
      return fallback;
    });
  }, [defaultActive, tabs, isControlled]);

  const currentActive = (isControlled ? activeProp : internalActive) ?? tabs[0]?.key ?? null;

  const handleSelect = (key: TabKey) => {
    if (!isControlled) {
      setActive(key);
    }
    onChange?.(key);
  };

  return (
    <div className={mergeClasses(classes.root, className)}>
      <div role="tablist" aria-label={ariaLabel} className={classes.tablist}>
        {tabs.map((t) => {
          const selected = currentActive === t.key;
          const tabId = `tab-${t.key}`;
          const panelId = `panel-${t.key}`;
          return (
            <Button
              key={t.key}
              id={tabId}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              appearance="transparent"
              pressEffect={false}
              shape="square"
              size="small"
              className={mergeClasses(classes.tab, selected && classes.active)}
              onClick={() => handleSelect(t.key)}
              type="button"
            >
              {t.label}
            </Button>
          );
        })}
      </div>
      <div>
        {tabs.map((t) => {
          const selected = currentActive === t.key;
          const tabId = `tab-${t.key}`;
          const panelId = `panel-${t.key}`;
          return (
            <div
              key={t.key}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
            >
              {t.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

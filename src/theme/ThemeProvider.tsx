import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext.js";

type ThemeSource = "system" | "user";

function safeWindow(): Window | undefined {
  return typeof window !== "undefined" ? window : undefined;
}

function getInitialTheme(initialTheme?: Theme): { theme: Theme; source: ThemeSource } {
  const win = safeWindow();
  if (initialTheme === "light" || initialTheme === "dark") {
    return { theme: initialTheme, source: "user" };
  }
  if (win) {
    try {
      const saved = win.localStorage?.getItem("theme");
      if (saved === "light" || saved === "dark") {
        return { theme: saved, source: "user" };
      }
    } catch {
      // Ignore localStorage access errors in restricted environments
    }
    const mql = win.matchMedia?.("(prefers-color-scheme: light)");
    const prefersLight = !!mql && mql.matches;
    return { theme: prefersLight ? "light" : "dark", source: "system" };
  }
  return { theme: "light", source: "system" };
}

export type ThemeTokenName =
  | "--pc-fg"
  | "--pc-bg"
  | "--pc-border"
  | "--pc-accent"
  | "--pc-danger"
  | "--pc-primary-base"
  | "--pc-muted"
  | "--pc-card"
  | "--pc-field-bg"
  | "--pc-field-border"
  | "--pc-field-placeholder"
  | "--pc-page-bg"
  | "--pc-page-border"
  | "--pc-page-hover-bg"
  | "--pc-page-active-bg"
  | "--pc-page-active-border";

type AnyCssVar = `--${string}`;
export type ThemeTokens = Partial<Record<ThemeTokenName | AnyCssVar, string>>;

function applyTheme(theme: Theme, overrides?: ThemeTokens, scope?: string) {
  const win = safeWindow();
  if (!win) return;
  const root = win.document.documentElement;
  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(theme === "light" ? "theme-light" : "theme-dark");

  // Set CSS variables for components to consume.
  const vars: Record<string, string> =
    theme === "light"
      ? {
          "--pc-fg": "#0b0c0f",
          "--pc-bg": "#ffffff",
          "--pc-border": "rgba(0,0,0,0.12)",
          "--pc-accent": "#D69D0D",
          "--pc-danger": "#C53030",
          "--pc-primary-base": "#000000",
          "--pc-muted": "#6e6e6e",
          "--pc-card": "#f5f7fb",
          "--pc-nav-bg": "color-mix(in srgb, var(--pc-primary-base, #000) 8%, var(--pc-bg))",
          "--pc-toast-bg": "color-mix(in srgb, var(--pc-bg, #fff) 92%, #000)",
          // Form field tokens
          "--pc-field-bg": "color-mix(in srgb, var(--pc-fg) 6%, var(--pc-bg))",
          "--pc-field-border": "var(--pc-border)",
          "--pc-field-placeholder": "color-mix(in srgb, var(--pc-muted) 75%, var(--pc-bg))",
          // Pagination
          "--pc-page-bg": "var(--arrow-bg, rgba(255,255,255,0.5))",
          "--pc-page-border": "var(--border, rgba(0,0,0,0.12))",
          "--pc-page-hover-bg": "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 12%, var(--arrow-bg, rgba(255,255,255,0.5)))",
          "--pc-page-active-bg": "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 18%, var(--arrow-bg, rgba(255,255,255,0.5)))",
          "--pc-page-active-border": "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 40%, var(--border, rgba(0,0,0,0.12)))",
          "--pc-shadow": "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        }
      : {
          // Keep existing dark palette for non-tabs tokens
          "--pc-fg": "#e7e7e7",
          "--pc-bg": "#393b41",
          "--pc-border": "rgba(255,255,255,0.18)",
          "--pc-accent": "#D69D0D",
          "--pc-danger": "#C53030",
          "--pc-primary-base": "#000000",
          "--pc-muted": "#b8b8b8",
          "--pc-card": "#646464",
          "--pc-nav-bg": "color-mix(in srgb, var(--pc-primary-base, #000) 25%, var(--pc-bg))",
          "--pc-toast-bg": "color-mix(in srgb, var(--pc-bg, #fff) 60%, #000)",
          // Form field tokens
          "--pc-field-bg": "color-mix(in srgb, var(--pc-fg) 10%, var(--pc-bg))",
          "--pc-field-border": "var(--pc-border)",
          "--pc-field-placeholder": "color-mix(in srgb, var(--pc-muted) 85%, var(--pc-bg))",
          // Pagination
          "--pc-page-bg": "var(--arrow-bg, rgba(255,255,255,0.04))",
          "--pc-page-border": "var(--border, rgba(255,255,255,0.08))",
          "--pc-page-hover-bg": "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 12%, var(--arrow-bg, rgba(255,255,255,0.04)))",
          "--pc-page-active-bg": "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 18%, var(--arrow-bg, rgba(255,255,255,0.04)))",
          "--pc-page-active-border": "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 40%, var(--border, rgba(255,255,255,0.08)))",
          "--pc-shadow": "0 4px 24px 0 rgba(0,0,0,0.5)",
        };
  // Respect consumer CSS overrides: if the custom property is already defined by
  // author styles (computed value present) and we have not previously set an
  // inline value for it, do NOT overwrite it. Otherwise, manage it inline so we
  // can switch palettes when theme changes.
  const computed = win.getComputedStyle(root);
  Object.entries(vars).forEach(([k, v]) => {
    const inlineExisting = root.style.getPropertyValue(k);
    const cssExisting = computed.getPropertyValue(k);
    if (inlineExisting) {
      // We manage this token; update to current theme value
      root.style.setProperty(k, v);
    } else if (cssExisting && cssExisting.trim() !== "") {
      // Consumer CSS provided a value; respect it
      return;
    } else {
      // No value present; provide sensible default
      root.style.setProperty(k, v);
    }
  });

  // Apply explicit overrides from props last (highest precedence)
  if (overrides) {
    Object.entries(overrides).forEach(([k, v]) => {
      if (typeof v === "string") {
        root.style.setProperty(k, v);
      }
    });
  }

  try {
    const bg = win.getComputedStyle(root).getPropertyValue("--pc-bg").trim() || (theme === "light" ? "#ffffff" : "#0b0b0b");
    const fg = win.getComputedStyle(root).getPropertyValue("--pc-fg").trim() || (theme === "light" ? "#111111" : "#e7e7e7");
    win.document.body.style.background = bg;
    win.document.body.style.color = fg;
  } catch {
    // Ignore DOM access errors
  }

  try {
    const id = "pc-theme-baseline";
    let styleEl = win.document.getElementById(id) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = win.document.createElement("style");
      styleEl.id = id;
      win.document.head.appendChild(styleEl);
    }
    
    // Create selector list - always include main, plus custom scope if provided
    const selectors = scope ? `main, ${scope}` : "main";
    
    // Always refresh baseline to reflect updates and stay in sync with tokens
    styleEl.textContent = `
      /* Baseline theming for common HTML elements scoped to main and custom selectors */
      ${selectors} a { color: var(--pc-accent); text-decoration: underline; text-underline-offset: 2px; }
      ${selectors} a:hover { color: color-mix(in srgb, var(--pc-accent) 90%, var(--pc-fg)); }
      ${selectors} a:active { color: color-mix(in srgb, var(--pc-accent) 70%, var(--pc-fg)); }
      ${selectors} a:visited { color: color-mix(in srgb, var(--pc-accent) 80%, var(--pc-fg)); }
      ${selectors} a:focus-visible { outline: 1px solid var(--pc-accent); }

      ${selectors} ::selection { background: var(--pc-accent); color: #fff; }

      ${selectors} hr { border: 0; border-top: 1px solid var(--pc-border); }

      ${selectors} code, ${selectors} kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; background: var(--pc-card); border: 1px solid var(--pc-border); padding: 2px 6px; border-radius: 6px; }
      ${selectors} pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; background: var(--pc-card); border: 1px solid var(--pc-border); padding: 12px; border-radius: 8px; overflow: auto; }
      ${selectors} pre > code { background: transparent; border: 0; padding: 0; }

      ${selectors} blockquote { margin: 0; padding: 8px 12px; border-left: 3px solid var(--pc-border); color: var(--pc-muted); background: color-mix(in srgb, var(--pc-card) 60%, transparent); border-radius: 6px; }

      ${selectors} table { width: 100%; border-collapse: collapse; }
      ${selectors} th, ${selectors} td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--pc-border); }
      ${selectors} th { background: var(--pc-card); }

      ${selectors} small, ${selectors} .muted { color: var(--pc-muted); }

      ${selectors} ul li::marker, ${selectors} ol li::marker { color: var(--pc-muted); }

      ${selectors} mark { background: color-mix(in srgb, var(--pc-accent) 30%, var(--pc-bg)); color: var(--pc-fg); border-radius: 3px; padding: 0 2px; }

      ${selectors} input, ${selectors} textarea, ${selectors} select { background: var(--pc-field-bg); color: var(--pc-fg); border: 1px solid var(--pc-field-border); border-radius: 10px; padding: 12px 14px; transition: background-color .2s ease, border-color .2s ease; }
      ${selectors} input:hover:not(:focus), ${selectors} textarea:hover:not(:focus), ${selectors} select:hover:not(:focus) { border-color: color-mix(in srgb, var(--pc-field-border) 70%, var(--pc-fg)); }
      ${selectors} input::placeholder, ${selectors} textarea::placeholder { color: var(--pc-field-placeholder); }
      ${selectors} input:focus-visible, ${selectors} textarea:focus-visible, ${selectors} select:focus-visible { outline: 1px solid var(--pc-accent); }
      ${selectors} input:disabled, ${selectors} textarea:disabled, ${selectors} select:disabled { opacity: .7; cursor: not-allowed; }
    `;
  } catch {
    // Ignore CSS injection errors
  }
}

export function ThemeProvider({ 
  children, 
  initialTheme, 
  tokens, 
  scope 
}: { 
  children: ReactNode; 
  initialTheme?: Theme; 
  tokens?: ThemeTokens; 
  /** Additional CSS selector(s) to apply baseline styles to, alongside 'main'. Example: '.app' or '.app, .content' */
  scope?: string;
}) {
  const init = useMemo(() => getInitialTheme(initialTheme), [initialTheme]);
  const [theme, setTheme] = useState<Theme>(init.theme);
  const sourceRef = useRef<ThemeSource>(init.source);

  // Apply theme side effects
  useEffect(() => {
    applyTheme(theme, tokens, scope);
    try {
      safeWindow()?.localStorage?.setItem("theme", theme);
    } catch {
      // Ignore localStorage write errors in restricted environments
    }
  }, [theme, tokens, scope]);

  // Listen to system preference changes when source is system
  useEffect(() => {
    const win = safeWindow();
    if (!win || sourceRef.current !== "system") return;
    const mql = win.matchMedia?.("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "light" : "dark");
    if (mql && typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else if (mql && typeof (mql as MediaQueryList & { addListener?: (handler: (e: MediaQueryListEvent) => void) => void; removeListener?: (handler: (e: MediaQueryListEvent) => void) => void }).addListener === "function") {
      (mql as MediaQueryList & { addListener: (handler: (e: MediaQueryListEvent) => void) => void }).addListener(handler);
      return () => (mql as MediaQueryList & { removeListener: (handler: (e: MediaQueryListEvent) => void) => void }).removeListener(handler);
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        sourceRef.current = "user";
        setTheme(t);
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

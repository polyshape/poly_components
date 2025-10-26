import { makeStaticStyles } from "@griffel/react";
import type { CSSProperties, PropsWithChildren } from "react";

type ScrollbarsProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  thumbColor?: string;
  scrollbarWidth?: "thin" | "auto" | "none" | string;
}>;

interface CSSVars extends CSSProperties {
  "--pc-scrollbar-thumb"?: string;
  "--pc-scrollbar-width"?: "thin" | "auto" | "none" | string;
}

type EnhancedStyle = CSSProperties & {
  scrollbarThumb?: string;
  scrollbarWidth?: "thin" | "auto" | "none" | string;
};

const useScrollbarStaticStyles = makeStaticStyles({
  ".pc-scrollbars": {
    overflow: "auto",
    scrollbarWidth: "var(--pc-scrollbar-width, thin)" as unknown as "thin",
    scrollbarColor:
      "var(--pc-scrollbar-thumb, color-mix(in srgb, var(--pc-fg, #0b0c0f) 35%, transparent)) transparent",
  },
  ".pc-scrollbars::-webkit-scrollbar": { width: "8px", height: "8px" },
  ".pc-scrollbars::-webkit-scrollbar-track": { background: "transparent" },
  ".pc-scrollbars::-webkit-scrollbar-thumb": {
    backgroundColor:
      "var(--pc-scrollbar-thumb, color-mix(in srgb, var(--pc-fg, #0b0c0f) 35%, transparent))",
    borderRadius: "8px",
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },
  ".pc-scrollbars::-webkit-scrollbar-corner": { background: "transparent" },
});

export function Scrollbars({
  children,
  className,
  style,
  thumbColor,
  scrollbarWidth: propScrollbarWidth,
}: ScrollbarsProps) {
  useScrollbarStaticStyles();

  const cssVars: CSSVars = {};
  const s = (style ?? {}) as EnhancedStyle;
  const { scrollbarThumb, scrollbarWidth, ...restStyle } = s;

  const resolvedThumb = thumbColor ?? scrollbarThumb;
  if (resolvedThumb) cssVars["--pc-scrollbar-thumb"] = resolvedThumb;
  const resolvedWidth = propScrollbarWidth ?? scrollbarWidth;
  if (resolvedWidth) cssVars["--pc-scrollbar-width"] = resolvedWidth;

  return (
    <div
      className={`pc-scrollbars${className ? ` ${className}` : ""}`}
      style={{ ...restStyle, ...cssVars }}
    >
      {children}
    </div>
  );
}

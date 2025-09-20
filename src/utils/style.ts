import type { CSSProperties } from "react";

export function normalizeBorderStyles(style?: CSSProperties): CSSProperties | undefined {
  if (!style) return style;

  const normalized: CSSProperties = { ...style };

  if (typeof (normalized as any).border === "string") {
    const parts = String((normalized as any).border).split(" ");
    const [width, styleType, color] = [parts[0], parts[1], parts.slice(2).join(" ") || undefined];
    if (width) normalized.borderWidth = width;
    if (styleType) normalized.borderStyle = styleType as CSSProperties["borderStyle"];
    if (color) normalized.borderColor = color;
    delete (normalized as any).border;
  }

  return normalized;
}


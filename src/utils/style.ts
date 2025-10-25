import type { CSSProperties } from "react";

export function normalizeBorderStyles(style?: CSSProperties): CSSProperties | undefined {
  if (!style) return style;

  const normalized: CSSProperties = { ...style };
  const normalizedWithBorder = normalized as CSSProperties & { border?: string };

  if (typeof normalizedWithBorder.border === "string") {
    const parts = String(normalizedWithBorder.border).split(" ");
    const [width, styleType, color] = [parts[0], parts[1], parts.slice(2).join(" ") || undefined];
    if (width) normalized.borderWidth = width;
    if (styleType) normalized.borderStyle = styleType as CSSProperties["borderStyle"];
    if (color) normalized.borderColor = color;
    delete normalizedWithBorder.border;
  }

  return normalized;
}

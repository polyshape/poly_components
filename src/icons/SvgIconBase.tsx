import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import type { IconProps } from "./types.js";
import { ensureSpinKeyframes } from "./ensureSpinKeyframes.js";

type SvgIconBaseProps = PropsWithChildren<Omit<IconProps, "name">>;

export function SvgIconBase({
  className,
  style,
  spin,
  weight = "normal",
  children,
  ...props
}: SvgIconBaseProps) {
  // Accessibility defaults (decorative by default unless labeled)
  const isLabeled = Boolean(
    props["aria-label"] || props["aria-labelledby"]
  );
  const ariaHidden = props["aria-hidden"] ?? (isLabeled ? undefined : true);
  const role = props.role ?? (isLabeled ? "img" : undefined);
  const focusable = props.focusable ?? false;

  // Convert weight to strokeWidth value
  const getStrokeWidth = (w: typeof weight): number => {
    if (typeof w === "number") return w;
    switch (w) {
      case "thin": return 0.2;
      case "light": return 0.6;
      case "normal": return 1;
      case "medium": return 1.5;
      case "bold": return 2;
      case "heavy": return 2.5;
      default: return 1;
    }
  };

  const strokeWidth = getStrokeWidth(weight);

  const spinStyle = spin ? {
    animation: "pc-icon-spin 1s linear infinite",
    ...style
  } : style;

  useEffect(() => {
    if (spin) ensureSpinKeyframes();
  }, [spin]);

  return (
    <>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={spinStyle}
        aria-hidden={ariaHidden}
        role={role}
        focusable={focusable}
        {...props}
      >
        {children}
      </svg>
    </>
  );
}

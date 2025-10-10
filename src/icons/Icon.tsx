import type { IconProps } from "./types.js";
import { iconPaths } from "./IconRegistry.js";

export function Icon({ 
  name,
  className,
  style,
  spin,
  weight = "normal",
  ...props 
}: IconProps) {
  const iconContent = iconPaths[name];
  
  if (!iconContent) {
    return null;
  }

  // Convert weight to strokeWidth value
  const getStrokeWidth = (w: typeof weight): number => {
    if (typeof w === "number") return w;
    switch (w) {
      case "thin": return 0.5;
      case "light": return 1;
      case "normal": return 1.5;
      case "medium": return 2;
      case "bold": return 2.5;
      case "heavy": return 3;
      default: return 1.5;
    }
  };

  const strokeWidth = getStrokeWidth(weight);

  const spinStyle = spin ? {
    animation: "pc-icon-spin 1s linear infinite",
    ...style
  } : style;

  return (
    <>
      {spin && (
        <style>{`
          @keyframes pc-icon-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      )}
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
        {...props}
      >
        {iconContent}
      </svg>
    </>
  );
}
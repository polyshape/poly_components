import type { IconProps } from "./types.js";
import { iconPaths } from "./IconRegistry.js";

export function Icon({ 
  name,
  className,
  style,
  ...props 
}: IconProps) {
  const iconContent = iconPaths[name];
  
  if (!iconContent) {
    return null;
  }

  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...props}
    >
      {iconContent}
    </svg>
  );
}
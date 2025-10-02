import type { IconName } from "./IconRegistry.js";

export type { IconName };

export interface IconProps {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}
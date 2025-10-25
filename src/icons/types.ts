import type { IconName } from "./IconRegistry.js";
import type { SVGProps } from "react";

export type { IconName };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "children"> {
  name: IconName;
  spin?: boolean;
  weight?: "thin" | "light" | "normal" | "medium" | "bold" | "heavy" | number;
}

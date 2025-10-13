import type { IconProps } from "./types.js";
import { iconPaths } from "./IconRegistry.js";
import { SvgIconBase } from "./SvgIconBase.js";

export function Icon({ name, ...props }: IconProps) {
  const iconContent = iconPaths[name];
  if (!iconContent) {
    return null;
  }
  return (
    <SvgIconBase {...props}>
      {iconContent}
    </SvgIconBase>
  );
}

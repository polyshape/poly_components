import type { ComponentType } from "react";
import type { IconProps } from "./types.js";
import { SvgIconBase } from "./SvgIconBase.js";

export function wrapIcon(PathComponent: ComponentType): ComponentType<Omit<IconProps, "name">> {
  const Wrapped = (props: Omit<IconProps, "name">) => (
    <SvgIconBase {...props}>
      <PathComponent />
    </SvgIconBase>
  );
  return Wrapped as ComponentType<Omit<IconProps, "name">>;
}


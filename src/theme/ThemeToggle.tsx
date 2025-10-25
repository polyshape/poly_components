import { useTheme } from "./useTheme.js";
import { Button } from "../button/index.js";
import { Icon } from "../icons/Icon.js";
import type { IconProps } from "../icons/types.js";

type Props = {
  appearance?: "subtle" | "transparent" | "outline" | "secondary" | "primary" | "danger";
  shape?: "rounded" | "square" | "circular";
  size?: "small" | "medium" | "large";
  className?: string;
  pressEffect?: boolean;
  weight?: IconProps["weight"];
};

export default function ThemeToggle({ appearance = "outline", size = "medium", shape = "rounded", className, pressEffect, weight }: Props) {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const label = isLight ? "Switch to dark theme" : "Switch to light theme";

  const icon = isLight ? (
    <Icon name="sun" weight={weight} style={{ fontSize: 20 }} />
  ) : (
    <Icon name="moon" weight={weight} style={{ fontSize: 20 }} />
  );

  return (
    <Button
      appearance={appearance}
      size={size}
      shape={shape}
      aria-label={label}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      icon={icon}
      iconOnly
      className={className}
      pressEffect={pressEffect}
      type="button"
    />
  );
}

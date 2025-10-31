import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

type Size = "small" | "medium" | "large";

export type RadioStyles = Partial<{
  root: CSSProperties;
  input: CSSProperties;
  control: CSSProperties;
  dot: CSSProperties;
  label: CSSProperties;
}>;

export type RadioProps = {
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  disabled?: boolean;
  label?: ReactNode;
  size?: Size;
  className?: string;
  styles?: RadioStyles;
};

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    color: "var(--pc-fg, currentColor)",
    userSelect: "none",
    selectors: {
      "&:has([data-pc-radio-input]:checked) [data-pc-radio-ctrl]": {
        ...shorthands.borderColor("var(--pc-accent, #D69D0D)"),
        boxShadow: "0 0 0 2px color-mix(in srgb, var(--pc-accent, #D69D0D) 35%, transparent)",
      },
      "&:has([data-pc-radio-input]:checked) [data-pc-radio-dot]": {
        transform: "translate(-50%, -50%) scale(1)",
      },
    },
  },
  rootDisabled: { cursor: "not-allowed", opacity: 0.6 },
  input: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
    width: 0,
    height: 0,
  },
  ctrlBase: {
    position: "relative",
    display: "inline-block",
    borderRadius: "50%",
    background: "var(--pc-bg, #fff)",
    ...shorthands.borderWidth("2px"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor("var(--pc-border, rgba(0,0,0,0.2))"),
    transition: "border-color 160ms ease, box-shadow 160ms ease",
  },
  ctrlSmall: { width: "14px", height: "14px" },
  ctrlMedium: { width: "16px", height: "16px" },
  ctrlLarge: { width: "20px", height: "20px" },
  dot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0)",
    width: "60%",
    height: "60%",
    borderRadius: "50%",
    background: "var(--pc-radio-accent, var(--pc-accent, #D69D0D))",
    transition: "transform 120ms ease",
  },
  label: { fontSize: "0.95rem" },
});

export default function Radio({ name, value, checked, defaultChecked, onChange, disabled, label, size = "medium", className, styles }: RadioProps) {
  const classes = useStyles();
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isControlled = typeof checked === "boolean";
  const [internal, setInternal] = useState<boolean>(!!defaultChecked);
  const isChecked = isControlled ? !!checked : internal;

  // Keep uncontrolled visuals in sync across a group by listening to change events
  useEffect(() => {
    if (isControlled) return; // parent drives state
    const sync = () => {
      const el = inputRef.current;
      if (!el) return;
      // Update local state to match the actual native checked state
      setInternal(el.checked);
    };
    // Initial sync on mount
    sync();
    const handler = (e: Event) => {
      const target = e.target as HTMLInputElement | null;
      if (!target || target.type !== "radio") return;
      if (name && target.name !== name) return;
      sync();
    };
    document.addEventListener("change", handler, true);
    return () => document.removeEventListener("change", handler, true);
  }, [isControlled, name]);

  const ctrlSize = size === "small" ? classes.ctrlSmall : size === "large" ? classes.ctrlLarge : classes.ctrlMedium;

  return (
    <label htmlFor={id} className={mergeClasses(classes.root, disabled && classes.rootDisabled, className)} style={styles?.root}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        ref={inputRef}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={(e) => {
          if (!isControlled) setInternal(e.currentTarget.checked);
          onChange?.(e);
        }}
        disabled={disabled}
        style={styles?.input}
        className={classes.input}
      />
      <span
        aria-hidden
        className={mergeClasses(classes.ctrlBase, ctrlSize)}
        style={{
          ...styles?.control,
          ...(isChecked
            ? {
                borderColor: "var(--pc-radio-accent, var(--pc-accent, #D69D0D))",
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--pc-radio-accent, var(--pc-accent, #D69D0D)) 35%, transparent)",
              }
            : {}),
        }}
      >
        <span
          className={classes.dot}
          style={{
            transform: isChecked ? "translate(-50%, -50%) scale(1)" : undefined,
            ...styles?.dot,
          }}
        />
      </span>
      {label != null ? (
        <span className={classes.label} style={styles?.label}>
          {label}
        </span>
      ) : null}
    </label>
  );
}

import React from "react";

export function ColorPicker({
  value,
  fallback = "#FFFFFF",
  title,
  onChange,
  onCommit,
}: {
  value?: string;
  fallback?: string;
  title?: string;
  onChange: (v: string) => void;
  onCommit?: (v: string) => void;
}) {
  const [val, setVal] = React.useState<string>(
    /^#([0-9a-f]{3,8})$/i.test(value || "") ? (value as string) : fallback
  );

  React.useEffect(() => {
    const next = /^#([0-9a-f]{3,8})$/i.test(value || "")
      ? (value as string)
      : fallback;
    setVal(next);
  }, [value, fallback]);

  return (
    <input
      type="color"
      value={val}
      onChange={(e) => {
        const v = e.target.value;
        setVal(v);
        onChange(v);
      }}
      onBlur={() => {
        onCommit?.(val);
      }}
      title={title}
      style={{
        width: 32,
        height: 24,
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 4,
        cursor: "pointer",
      }}
    />
  );
}

export function BatteryEmptyIcon() {
  return (
    <>
      <rect
        x="4"
        y="7"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        fill="none"
      />
      <rect
        x="20"
        y="10"
        width="2"
        height="4"
        rx="1"
        stroke="currentColor"
        fill="none"
      />
    </>
  );
}

Object.defineProperty(BatteryEmptyIcon, Symbol.for("poly:icon:tags"), {
  value: ["power"] as const,
  enumerable: false,
});

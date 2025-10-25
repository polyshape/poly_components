export function BatteryFullIcon() {
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
      <rect
        x="6.5"
        y="9.5"
        width="11"
        height="5"
        fill="currentColor"
        opacity="0.7"
      />
    </>
  );
}

Object.defineProperty(BatteryFullIcon, Symbol.for("poly:icon:tags"), {
  value: ["power"] as const,
  enumerable: false,
});

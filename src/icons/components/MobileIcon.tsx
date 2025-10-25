export function MobileIcon() {
  return (
    <>
      <rect
        x="8"
        y="3"
        width="8"
        height="18"
        rx="2"
        stroke="currentColor"
        fill="none"
      />
      <circle cx="12" cy="18" r="0.8" fill="currentColor" />
    </>
  );
}

Object.defineProperty(MobileIcon, Symbol.for("poly:icon:tags"), {
  value: ["phone", "cell", "device", "smartphone"] as const,
  enumerable: false,
});

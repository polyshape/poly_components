export function MonitorIcon() {
  return (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        fill="none"
      />
      <path d="M9 19h6" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(MonitorIcon, Symbol.for("poly:icon:tags"), {
  value: ["screen", "display", "computer", "pc"] as const,
  enumerable: false,
});

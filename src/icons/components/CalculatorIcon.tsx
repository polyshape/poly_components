export function CalculatorIcon() {
  return (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" />
      <rect x="7" y="6" width="10" height="4" rx="0.5" stroke="currentColor" />
      <g fill="currentColor" stroke="none">
        <circle cx="8" cy="14" r="0.8" />
        <circle cx="8" cy="17" r="0.8" />
        <circle cx="12" cy="14" r="0.8" />
        <circle cx="12" cy="17" r="0.8" />
        <circle cx="16" cy="14" r="0.8" />
        <circle cx="16" cy="17" r="0.8" />
      </g>
    </>
  );
}

Object.defineProperty(CalculatorIcon, Symbol.for("poly:icon:tags"), {
  value: ["math"] as const,
  enumerable: false,
});

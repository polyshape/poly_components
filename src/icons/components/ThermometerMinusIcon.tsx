export function ThermometerMinusIcon() {
  return (
    <>
      <path
        d="M10 5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0V5z"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5.5v7.5a2 2 0 1 1 0 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="12" cy="18" r="2" fill="currentColor" opacity="0.7" />
      {/* Minus */}
      <path d="M16 11h4" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(ThermometerMinusIcon, Symbol.for("poly:icon:tags"), {
  value: ["weather", "temperature", "climate", "cold"] as const,
  enumerable: false,
});

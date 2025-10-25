export function CallDialpadIcon() {
  return (
    <>
      {/* 3x3 dialpad dots */}
      <g fill="currentColor" stroke="none">
        <circle cx="8" cy="8" r="1.1" />
        <circle cx="12" cy="8" r="1.1" />
        <circle cx="16" cy="8" r="1.1" />
        <circle cx="8" cy="12" r="1.1" />
        <circle cx="12" cy="12" r="1.1" />
        <circle cx="16" cy="12" r="1.1" />
        <circle cx="8" cy="16" r="1.1" />
        <circle cx="12" cy="16" r="1.1" />
        <circle cx="16" cy="16" r="1.1" />
        <circle cx="12" cy="20" r="1.1" />
      </g>
    </>
  );
}

Object.defineProperty(CallDialpadIcon, Symbol.for("poly:icon:tags"), {
  value: ["phone", "contact"] as const,
  enumerable: false,
});

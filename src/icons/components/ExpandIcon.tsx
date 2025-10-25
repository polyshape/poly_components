export function ExpandIcon() {
  return (
    <>
      <path d="M9 6H5v4" stroke="currentColor" strokeLinecap="round" />
      <path d="M15 6h4v4" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 17v4h4" stroke="currentColor" strokeLinecap="round" />
      <path d="M19 17v4h-4" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(ExpandIcon, Symbol.for("poly:icon:tags"), {
  value: ["media"] as const,
  enumerable: false,
});

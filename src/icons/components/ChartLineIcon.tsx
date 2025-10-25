export function ChartLineIcon() {
  return (
    <>
      <path d="M4 19h16M4 19V5" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M6 16l5-5l4 3l4.5-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ChartLineIcon, Symbol.for("poly:icon:tags"), {
  value: ["data", "statistics", "analytics", "business", "finance"] as const,
  enumerable: false,
});

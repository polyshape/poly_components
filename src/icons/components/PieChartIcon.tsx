export function PieChartIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" />
      <path
        d="M12 4v8h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(PieChartIcon, Symbol.for("poly:icon:tags"), {
  value: ["finance", "graph", "statistics"] as const,
  enumerable: false,
});

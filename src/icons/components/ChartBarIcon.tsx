export function ChartBarIcon() {
  return (
    <>
      <path d="M4 19h16M4 19V5" stroke="currentColor" strokeLinecap="round" />
      <path d="M7 19v-6" />
      <path d="M11 19v-10" />
      <path d="M15 19v-4" />
      <path d="M19 19v-8" />
    </>
  );
}

Object.defineProperty(ChartBarIcon, Symbol.for("poly:icon:tags"), {
  value: ["data", "statistics", "analytics", "business", "finance"] as const,
  enumerable: false,
});

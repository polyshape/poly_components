export function StopwatchIcon() {
  return (
    <>
      <circle cx="12" cy="14" r="7" stroke="currentColor" />
      <path d="M12 14V10" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 14h3" stroke="currentColor" strokeLinecap="round" />
      <path d="M8 3h4" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 3v4" stroke="currentColor" strokeLinecap="round" />
      <path d="M7.3 8.8l-1.5-1.5" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(StopwatchIcon, Symbol.for("poly:icon:tags"), {
  value: ["time", "clock", "alarm"] as const,
  enumerable: false,
});

export function PercentIcon() {
  return (
    <>
      <path d="M5 19L19 5" stroke="currentColor" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2" fill="none" stroke="currentColor" />
      <circle cx="17" cy="17" r="2" fill="none" stroke="currentColor" />
    </>
  );
}

Object.defineProperty(PercentIcon, Symbol.for("poly:icon:tags"), {
  value: ["currency", "math", "symbol"] as const,
  enumerable: false,
});

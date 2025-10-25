export function InfoIcon() {
  return (
    <>
      <path d="M12 10v7" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 7h.01" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(InfoIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "confirmation", "info"] as const,
  enumerable: false,
});

export function PlusIcon() {
  return (
    <>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(PlusIcon, Symbol.for("poly:icon:tags"), {
  value: ["math", "symbol"] as const,
  enumerable: false,
});

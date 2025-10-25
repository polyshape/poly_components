export function EqualsIcon() {
  return (
    <>
      <path d="M6 10h12" />
      <path d="M6 14h12" />
    </>
  );
}

Object.defineProperty(EqualsIcon, Symbol.for("poly:icon:tags"), {
  value: ["math", "symbol"] as const,
  enumerable: false,
});

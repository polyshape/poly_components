export function ArrowDownFromLineIcon() {
  return (
    <>
      <path d="M6 4h12" />
      <path d="M12 8v8M8 12l4 4 4-4" />
    </>
  );
}

Object.defineProperty(ArrowDownFromLineIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

export function ArrowLeftFromLineIcon() {
  return (
    <>
      <path d="M20 6v12" />
      <path d="M15 12H6M10 8l-4 4 4 4" />
    </>
  );
}

Object.defineProperty(ArrowLeftFromLineIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

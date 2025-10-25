export function ArrowRightFromLineIcon() {
  return (
    <>
      <path d="M4 6v12" />
      <path d="M9 12h9M14 8l4 4-4 4" />
    </>
  );
}

Object.defineProperty(ArrowRightFromLineIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

export function RefreshIcon() {
  return (
    <>
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </>
  );
}

Object.defineProperty(RefreshIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "sync"] as const,
  enumerable: false,
});

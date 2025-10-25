export function BranchIcon() {
  return (
    <>
      <circle cx="6" cy="6" r="2" fill="none" stroke="currentColor" />
      <circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" />
      <circle cx="18" cy="12" r="2" fill="none" stroke="currentColor" />
      <path d="M6 8v8" stroke="currentColor" />
      <path d="M8 6h4a4 4 0 0 1 4 4v2" fill="none" stroke="currentColor" />
      <path d="M8 18h8" stroke="currentColor" />
    </>
  );
}

Object.defineProperty(BranchIcon, Symbol.for("poly:icon:tags"), {
  value: ["code", "development"] as const,
  enumerable: false,
});

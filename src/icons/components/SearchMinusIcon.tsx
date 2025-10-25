export function SearchMinusIcon() {
  return (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m23 23-6-6" />
      <path d="M8 11h6" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(SearchMinusIcon, Symbol.for("poly:icon:tags"), {
  value: ["filter", "find"] as const,
  enumerable: false,
});

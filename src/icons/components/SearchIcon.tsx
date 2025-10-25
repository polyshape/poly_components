export function SearchIcon() {
  return (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m23 23-6-6" />
    </>
  );
}

Object.defineProperty(SearchIcon, Symbol.for("poly:icon:tags"), {
  value: ["filter", "find"] as const,
  enumerable: false,
});

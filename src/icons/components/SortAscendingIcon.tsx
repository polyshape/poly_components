export function SortAscendingIcon() {
  return (
    <>
      <path
        d="M4 17h10M4 12h7M4 7h4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M17 10l3-3 3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 17V7" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(SortAscendingIcon, Symbol.for("poly:icon:tags"), {
  value: ["order", "filter"] as const,
  enumerable: false,
});

export function SortDescendingIcon() {
  return (
    <>
      <path
        d="M4 7h10M4 12h7M4 17h4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M17 14l3 3 3-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 7v10" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(SortDescendingIcon, Symbol.for("poly:icon:tags"), {
  value: ["order", "filter"] as const,
  enumerable: false,
});

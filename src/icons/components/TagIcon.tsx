export function TagIcon() {
  return (
    <>
      <path
        d="M20 12l-8-8H6v6l8 8 6-6Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="8.5" r="1" stroke="currentColor" fill="none" />
    </>
  );
}

Object.defineProperty(TagIcon, Symbol.for("poly:icon:tags"), {
  value: ["category", "label"] as const,
  enumerable: false,
});

export function TagsIcon() {
  return (
    <>
      <path
        d="M20 12l-8-8H6v6l8 8 6-6Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M23 12l-8-8Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M17 18 L23 12"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="8.5" r="1" stroke="currentColor" fill="none" />
    </>
  );
}

Object.defineProperty(TagsIcon, Symbol.for("poly:icon:tags"), {
  value: ["category", "label"] as const,
  enumerable: false,
});

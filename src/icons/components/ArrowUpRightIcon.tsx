export function ArrowUpRightIcon() {
  return (
    <>
      <path
        d="M7 17L17 7M17 7H11M17 7v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ArrowUpRightIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

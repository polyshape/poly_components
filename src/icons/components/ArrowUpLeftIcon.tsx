export function ArrowUpLeftIcon() {
  return (
    <>
      <path
        d="M17 17L7 7M7 7h6M7 7v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ArrowUpLeftIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

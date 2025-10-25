export function ArrowDownRightIcon() {
  return (
    <>
      <path
        d="M7 7L17 17M17 17h-6M17 17v-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ArrowDownRightIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

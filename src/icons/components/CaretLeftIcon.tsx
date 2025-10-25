export function CaretLeftIcon() {
  return (
    <>
      <path
        d="M14 8l-4 4 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(CaretLeftIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

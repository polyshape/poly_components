export function ForwardIcon() {
  return (
    <>
      <path
        d="M14 8h4V4l4 4-4 4v-4h-4c-5 0-8 3-8 8v1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ForwardIcon, Symbol.for("poly:icon:tags"), {
  value: ["navigation", "arrows"] as const,
  enumerable: false,
});

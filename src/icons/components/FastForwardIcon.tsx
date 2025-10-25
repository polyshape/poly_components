export function FastForwardIcon() {
  return (
    <>
      <path
        d="M5 7l7 5-7 5V7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7l7 5-7 5V7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(FastForwardIcon, Symbol.for("poly:icon:tags"), {
  value: ["media"] as const,
  enumerable: false,
});

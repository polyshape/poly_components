export function CheckIcon() {
  return (
    <>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(CheckIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "confirmation", "success", "alert"] as const,
  enumerable: false,
});

export function CloseIcon() {
  return (
    <>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </>
  );
}

Object.defineProperty(CloseIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "error"] as const,
  enumerable: false,
});

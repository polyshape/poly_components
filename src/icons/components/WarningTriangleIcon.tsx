export function WarningTriangleIcon() {
  return (
    <>
      <path
        d="M12 3l9 16H3l9-16Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 9v4" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M12 16h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(WarningTriangleIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "alert"] as const,
  enumerable: false,
});

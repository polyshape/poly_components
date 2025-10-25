export function WarningDiamondIcon() {
  return (
    <>
      <path
        d="M12 3l9 9-9 9-9-9 9-9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8.5v4.5" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M12 16h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(WarningDiamondIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "alert"] as const,
  enumerable: false,
});

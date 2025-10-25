export function CompassNorthIcon() {
  return (
    <>
      {/* Reuse compass circle */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />
      {/* Simple north tick/triangle */}
      <path
        d="M12 6l2 5h-4z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(CompassNorthIcon, Symbol.for("poly:icon:tags"), {
  value: ["navigation"] as const,
  enumerable: false,
});

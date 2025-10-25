export function LocationPinIcon() {
  return (
    <>
      <path
        d="M12 21c-4.5-4.6-7-8.2-7-11a7 7 0 0 1 14 0c0 2.8-2.5 6.4-7 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(LocationPinIcon, Symbol.for("poly:icon:tags"), {
  value: ["map", "navigation", "gps"] as const,
  enumerable: false,
});

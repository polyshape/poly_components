export function WifiOffIcon() {
  return (
    <>
      <path
        d="M3 10a12 12 0 0 1 18 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 13a8.5 8.5 0 0 1 12 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16a5 5 0 0 1 6 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
      <path d="M3 3l18 18" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(WifiOffIcon, Symbol.for("poly:icon:tags"), {
  value: ["network", "connectivity", "signal"] as const,
  enumerable: false,
});

export function GlobeIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M3 12h18" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M12 3c2.5 2.7 4 5.7 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.7-4-9s1.5-6.3 4-9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9a16 14 0 0 1 17 0"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M3.5 15a16 14 0 0 0 17 0"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </>
  );
}

Object.defineProperty(GlobeIcon, Symbol.for("poly:icon:tags"), {
  value: ["world", "earth"] as const,
  enumerable: false,
});

export function HourglassHalfIcon() {
  return (
    <>
      <path d="M6 4.5h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 19.5h12" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M7.5 5c0 3.2 2.2 5.1 4.5 7s4.5 3.8 4.5 6.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 5c0 3.2-2.2 5.1-4.5 7s-4.5 3.8-4.5 6.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 9l2.5 3 2.5-3z" fill="currentColor" opacity="0.7" />
      <path
        d="M9 17.8h6"
        strokeWidth={3}
        stroke="currentColor"
        strokeLinecap="round"
        opacity="0.7"
      />
    </>
  );
}

Object.defineProperty(HourglassHalfIcon, Symbol.for("poly:icon:tags"), {
  value: ["time", "loading", "wait"] as const,
  enumerable: false,
});

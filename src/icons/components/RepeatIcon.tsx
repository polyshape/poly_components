export function RepeatIcon() {
  return (
    <>
      <path
        d="M20 9 H10 Q9 9 8 9 C5 9 3 10 3 13"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M18 6.5l2.5 2.5-2.5 2.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18 H14 Q15 18 16 18 C19 18 21 17 21 14"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M6 20.5l-2.5-2.5 2.5-2.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(RepeatIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "audio", "media", "video"] as const,
  enumerable: false,
});

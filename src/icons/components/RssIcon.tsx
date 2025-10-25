export function RssIcon() {
  return (
    <>
      <circle cx="6" cy="18" r="1.2" fill="currentColor" />
      <path
        d="M6 12 C 12 12, 12 18, 12 18"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M6 8 C 16 8, 16 18, 16 18"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

Object.defineProperty(RssIcon, Symbol.for("poly:icon:tags"), {
  value: ["feed", "subscribe"] as const,
  enumerable: false,
});

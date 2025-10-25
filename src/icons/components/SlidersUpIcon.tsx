export function SlidersUpIcon() {
  return (
    <>
      <g transform="rotate(90 12 12)">
        <path d="M4 8h16" stroke="currentColor" strokeLinecap="round" />
        <path d="M4 12h16" stroke="currentColor" strokeLinecap="round" />
        <path d="M4 16h16" stroke="currentColor" strokeLinecap="round" />
        <g fill="currentColor" stroke="none">
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="14" cy="12" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </g>
      </g>
    </>
  );
}

Object.defineProperty(SlidersUpIcon, Symbol.for("poly:icon:tags"), {
  value: ["settings", "controls"] as const,
  enumerable: false,
});

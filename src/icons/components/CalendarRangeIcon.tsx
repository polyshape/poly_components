export function CalendarRangeIcon() {
  return (
    <>
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        stroke="currentColor"
        fill="none"
      />
      <path d="M8 3v4M16 3v4" stroke="currentColor" strokeLinecap="round" />
      <path d="M4 9h16" stroke="currentColor" strokeLinecap="round" />
      <path d="M9 15h6" stroke="currentColor" strokeLinecap="round" />
      <g fill="currentColor" stroke="none">
        <circle cx="9" cy="15" r="1" />
        <circle cx="15" cy="15" r="1" />
      </g>
    </>
  );
}

Object.defineProperty(CalendarRangeIcon, Symbol.for("poly:icon:tags"), {
  value: ["date", "schedule"] as const,
  enumerable: false,
});

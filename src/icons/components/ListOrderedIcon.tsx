export function ListOrderedIcon() {
  return (
    <>
      <path
        d="M9 7h11M9 12h11M9 17h11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1}
      />
      {/* 1 */}
      <path
        d="M5 6.1v1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1}
      />
      <path
        d="M4.6 8h0.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1}
      />
      {/* 2 */}
      <path
        d="M4.2 10.2C4.8 9.6 5.6 9.6 6 10.2L4 12.2h2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
      {/* 3 - single continuous path */}
      <path
        d="M4.3 14.2
            C5.1 13.8, 6.1 14.0, 6.2 14.7
            C6.1 15.2, 5.5 15.5, 4.8 15.6
            C5.5 15.7, 6.1 16.0, 6.2 16.6
            C6.1 17.3, 5.1 17.5, 4.3 17.1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
    </>
  );
}

Object.defineProperty(ListOrderedIcon, Symbol.for("poly:icon:tags"), {
  value: ["menu", "options", "numbered"] as const,
  enumerable: false,
});

export function DatabasePlusIcon() {
  return (
    <>
      <ellipse cx="12" cy="5" rx="7" ry="3" fill="none" stroke="currentColor" />
      <path d="M5 5v14M19 5v14" stroke="currentColor" />
      <path
        d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"
        fill="none"
        stroke="currentColor"
      />
      <path
        d="M5 19c0 1.7 3.1 3 7 3s7-1.3 7-3"
        fill="none"
        stroke="currentColor"
      />
      <g
        transform="translate(6, 5) scale(0.6)"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M15 7v6M12 10h6" stroke="currentColor" strokeLinecap="round" />
      </g>
    </>
  );
}

Object.defineProperty(DatabasePlusIcon, Symbol.for("poly:icon:tags"), {
  value: ["dev", "code"] as const,
  enumerable: false,
});

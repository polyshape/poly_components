export function DatabaseIcon() {
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
    </>
  );
}

Object.defineProperty(DatabaseIcon, Symbol.for("poly:icon:tags"), {
  value: ["dev", "code"] as const,
  enumerable: false,
});

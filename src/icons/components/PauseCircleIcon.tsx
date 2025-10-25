export function PauseCircleIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
      <path d="M10.5 8v8" stroke="currentColor" strokeLinecap="round" />
      <path d="M13.5 8v8" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(PauseCircleIcon, Symbol.for("poly:icon:tags"), {
  value: ["stop", "media"] as const,
  enumerable: false,
});

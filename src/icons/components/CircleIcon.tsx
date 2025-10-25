export function CircleIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
    </>
  );
}

Object.defineProperty(CircleIcon, Symbol.for("poly:icon:tags"), {
  value: ["shape", "geometry"] as const,
  enumerable: false,
});

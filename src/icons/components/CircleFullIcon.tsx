export function CircleFullIcon() {
  return (
    <>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        fill="currentColor"
      />
    </>
  );
}

Object.defineProperty(CircleFullIcon, Symbol.for("poly:icon:tags"), {
  value: ["shape", "geometry"] as const,
  enumerable: false,
});

export function TriangleIcon() {
  return (
    <>
      <path
        d="M12 3l9 16H3l9-16Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(TriangleIcon, Symbol.for("poly:icon:tags"), {
  value: ["shape", "geometry"] as const,
  enumerable: false,
});

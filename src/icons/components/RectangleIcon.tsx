export function RectangleIcon() {
  return (
    <>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(RectangleIcon, Symbol.for("poly:icon:tags"), {
  value: ["shape", "geometry"] as const,
  enumerable: false,
});

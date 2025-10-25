export function MaximizeIcon() {
  return (
    <>
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="1.5"
        fill="none"
        stroke="currentColor"
      />
    </>
  );
}

Object.defineProperty(MaximizeIcon, Symbol.for("poly:icon:tags"), {
  value: ["expand", "fullscreen", "window"] as const,
  enumerable: false,
});

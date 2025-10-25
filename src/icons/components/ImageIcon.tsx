export function ImageIcon() {
  return (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        fill="none"
      />
      <circle cx="8" cy="9" r="1.5" fill="currentColor" />
      <path
        d="M7 17l4-4 3 3 3-3 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ImageIcon, Symbol.for("poly:icon:tags"), {
  value: ["camera", "photo"] as const,
  enumerable: false,
});

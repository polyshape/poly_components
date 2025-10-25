export function PinIcon() {
  return (
    <>
      <path
        d="M8 5h8v4l-3 2v5l-2 3-2-3v-5L8 9V5Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(PinIcon, Symbol.for("poly:icon:tags"), {
  value: ["map", "location", "gps", "navigation"] as const,
  enumerable: false,
});

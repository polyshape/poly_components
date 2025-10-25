export function VolumeUpIcon() {
  return (
    <>
      <path
        d="M6 10v4h3l4 3V7l-4 3H6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9a4 4 0 0 1 0 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 7a7 7 0 0 1 0 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(VolumeUpIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "audio", "sound"] as const,
  enumerable: false,
});

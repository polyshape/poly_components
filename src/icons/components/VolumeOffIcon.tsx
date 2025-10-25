export function VolumeOffIcon() {
  return (
    <>
      <path
        d="M6 10v4h3l4 3V7l-4 3H6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 9l6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 9l-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(VolumeOffIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "audio", "sound"] as const,
  enumerable: false,
});

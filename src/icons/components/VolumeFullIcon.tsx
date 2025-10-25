export function VolumeFullIcon() {
  return (
    <>
      <path
        d="M4 10v4h3l4 3V7l-4 3H6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9a4 4 0 0 1 0 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7a7 7 0 0 1 0 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 5a10 10 0 0 1 0 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(VolumeFullIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "audio", "sound"] as const,
  enumerable: false,
});

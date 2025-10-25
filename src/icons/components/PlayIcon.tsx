export function PlayIcon() {
  return (
    <>
      <path
        d="M8 6l10 6-10 6V6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(PlayIcon, Symbol.for("poly:icon:tags"), {
  value: ["video", "media", "audio", "sound"] as const,
  enumerable: false,
});

export function PlayPauseIcon() {
  return (
    <>
      <path d="M5 8l6 4-6 4z" />
      <path d="M15 8v8M18 8v8" />
    </>
  );
}

Object.defineProperty(PlayPauseIcon, Symbol.for("poly:icon:tags"), {
  value: ["video", "media", "audio", "sound"] as const,
  enumerable: false,
});

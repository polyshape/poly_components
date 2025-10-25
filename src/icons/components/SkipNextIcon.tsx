export function SkipNextIcon() {
  return (
    <>
      <path d="M6 7l8 5-8 5V7Z" />
      <path d="M18 7v10" />
    </>
  );
}

Object.defineProperty(SkipNextIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "player", "video", "music", "audio"] as const,
  enumerable: false,
});

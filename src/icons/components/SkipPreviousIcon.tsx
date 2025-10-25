export function SkipPreviousIcon() {
  return (
    <>
      <path d="M18 7l-8 5 8 5V7Z" />
      <path d="M6 7v10" />
    </>
  );
}

Object.defineProperty(SkipPreviousIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "player", "video", "music", "audio"] as const,
  enumerable: false,
});

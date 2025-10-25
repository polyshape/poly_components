export function StopIcon() {
  return (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" />
    </>
  );
}

Object.defineProperty(StopIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "player", "video", "music", "audio"] as const,
  enumerable: false,
});

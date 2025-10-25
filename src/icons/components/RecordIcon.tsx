export function RecordIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </>
  );
}

Object.defineProperty(RecordIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "video", "audio"] as const,
  enumerable: false,
});

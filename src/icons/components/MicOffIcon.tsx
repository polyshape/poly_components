export function MicOffIcon() {
  return (
    <>
      <rect x="9" y="6" width="6" height="9" rx="3" stroke="currentColor" fill="none" />
      <path d="M12 15v4" stroke="currentColor" strokeLinecap="round" />
      <path d="M8 12a4 4 0 0 0 8 0" stroke="currentColor" strokeLinecap="round" />
      <path d="M9 19h6" stroke="currentColor" strokeLinecap="round" />
      <path d="M4 4l16 16" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(MicOffIcon, Symbol.for("poly:icon:tags"), {
  value: ["mic", "audio", "record"] as const,
  enumerable: false,
});

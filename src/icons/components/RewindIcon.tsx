export function RewindIcon() {
  return (
    <>
      <path
        d="M12 7l-7 5 7 5V7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 7l-7 5 7 5V7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(RewindIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "video", "audio"] as const,
  enumerable: false,
});

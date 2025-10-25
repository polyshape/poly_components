export function VideoIcon() {
  return (
    <>
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        rx="1.5"
        stroke="currentColor"
        fill="none"
      />
      <path
        d="M15 10l4-2v8l-4-2v-4Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(VideoIcon, Symbol.for("poly:icon:tags"), {
  value: ["media", "film", "screen"] as const,
  enumerable: false,
});

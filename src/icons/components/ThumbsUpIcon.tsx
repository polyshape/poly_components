export function ThumbsUpIcon() {
  return (
    <>
      <path d="M7 12v7H4v-7z" />
      <path d="M7 12h7.5a2.5 2.5 0 0 1 2.4 3.2l-1 3.6A2.5 2.5 0 0 1 13.5 21H7" />
      <path d="M7 12l3-6 1 0a2 2 0 0 1 2 2v2" />
    </>
  );
}

Object.defineProperty(ThumbsUpIcon, Symbol.for("poly:icon:tags"), {
  value: ["like", "vote", "feedback"] as const,
  enumerable: false,
});

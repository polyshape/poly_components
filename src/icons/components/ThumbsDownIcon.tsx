export function ThumbsDownIcon() {
  return (
    <>
      <path d="M7 12V5H4v7z" />
      <path d="M7 12h7.5a2.5 2.5 0 0 0 2.4-3.2l-1-3.6A2.5 2.5 0 0 0 13.5 3H7" />
      <path d="M7 12l3 6h1a2 2 0 0 0 2-2v-2" />
    </>
  );
}

Object.defineProperty(ThumbsDownIcon, Symbol.for("poly:icon:tags"), {
  value: ["dislike", "vote", "feedback"] as const,
  enumerable: false,
});

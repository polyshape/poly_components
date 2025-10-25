export function QuestionIcon() {
  return (
    <>
      <path
        d="M9.5 9a2.8 2.8 0 0 1 5 2c0 2-2.8 2-2.5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="18" r="0.2" fill="currentColor" />
    </>
  );
}

Object.defineProperty(QuestionIcon, Symbol.for("poly:icon:tags"), {
  value: ["help"] as const,
  enumerable: false,
});

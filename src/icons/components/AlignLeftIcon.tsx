export function AlignLeftIcon() {
  return (
    <>
      <path d="M6 7h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 11h10" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 15h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 19h8" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(AlignLeftIcon, Symbol.for("poly:icon:tags"), {
  value: ["text", "formatting"] as const,
  enumerable: false,
});

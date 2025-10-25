export function AlignCenterIcon() {
  return (
    <>
      <path d="M6 7h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M7 11h10" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 15h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M8 19h8" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(AlignCenterIcon, Symbol.for("poly:icon:tags"), {
  value: ["text", "formatting"] as const,
  enumerable: false,
});

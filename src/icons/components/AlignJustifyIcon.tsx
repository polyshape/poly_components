export function AlignJustifyIcon() {
  return (
    <>
      <path d="M6 7h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 11h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 15h12" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 19h12" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(AlignJustifyIcon, Symbol.for("poly:icon:tags"), {
  value: ["text", "formatting"] as const,
  enumerable: false,
});

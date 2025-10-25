export function UnderlineIcon() {
  return (
    <>
      <path
        d="M7 5v6a5 5 0 0 0 10 0V5"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M6 19h12" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(UnderlineIcon, Symbol.for("poly:icon:tags"), {
  value: ["fonts", "text", "formatting"] as const,
  enumerable: false,
});

export function BracketsIcon() {
  return (
    <>
      {/* Left square bracket */}
      <path d="M7 6H5v12h2" />
      {/* Right square bracket */}
      <path d="M17 6h2v12h-2" />
    </>
  );
}

Object.defineProperty(BracketsIcon, Symbol.for("poly:icon:tags"), {
  value: ["fonts", "text", "formatting", "code", "development"] as const,
  enumerable: false,
});

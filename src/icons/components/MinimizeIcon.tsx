export function MinimizeIcon() {
  return (
    <>
      <path d="M6 19h12" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(MinimizeIcon, Symbol.for("poly:icon:tags"), {
  value: ["collapse", "shrink", "reduce", "window"] as const,
  enumerable: false,
});

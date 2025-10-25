export function PauseIcon() {
  return (
    <>
      <path d="M8 6v12" stroke="currentColor" strokeLinecap="round" />
      <path d="M16 6v12" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(PauseIcon, Symbol.for("poly:icon:tags"), {
  value: ["stop", "media"] as const,
  enumerable: false,
});

export function SmileIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M8.5 14c1 1 2.5 1.5 3.5 1.5s2.5-.5 3.5-1.5" />
    </>
  );
}

Object.defineProperty(SmileIcon, Symbol.for("poly:icon:tags"), {
  value: ["emoji", "face", "happy"] as const,
  enumerable: false,
});

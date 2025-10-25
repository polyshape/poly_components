export function KeyIcon() {
  return (
    <>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </>
  );
}

Object.defineProperty(KeyIcon, Symbol.for("poly:icon:tags"), {
  value: ["security", "lock"] as const,
  enumerable: false,
});

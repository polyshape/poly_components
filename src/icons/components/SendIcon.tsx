export function SendIcon() {
  return (
    <>
      <path d="M3 11l18-8-8 18-2.5-7.5L3 11Z" />
    </>
  );
}

Object.defineProperty(SendIcon, Symbol.for("poly:icon:tags"), {
  value: ["message", "email", "paperplane"] as const,
  enumerable: false,
});

export function BoldIcon() {
  return (
    <>
      <path d="M7 5h6a3 3 0 0 1 0 6H7z" fill="currentColor" opacity="0.2" />
      <path d="M7 11h7a3 3 0 0 1 0 6H7z" fill="currentColor" opacity="0.2" />
      <path d="M7 5h6a3 3 0 0 1 0 6H7V5Z" fill="none" stroke="currentColor" />
      <path d="M7 11h7a3 3 0 0 1 0 6H7v-6Z" fill="none" stroke="currentColor" />
    </>
  );
}

Object.defineProperty(BoldIcon, Symbol.for("poly:icon:tags"), {
  value: ["fonts", "text", "formatting"] as const,
  enumerable: false,
});

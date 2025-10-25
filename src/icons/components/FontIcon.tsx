export function FontIcon() {
  return (
    <>
      <path d="M6 18h4M14 18h4" />
      <path d="M12 6l5 12M12 6l-5 12" />
      <path d="M9.5 14h5" />
    </>
  );
}

Object.defineProperty(FontIcon, Symbol.for("poly:icon:tags"), {
  value: ["text", "formatting"] as const,
  enumerable: false,
});

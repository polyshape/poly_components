export function BarcodeIcon() {
  return (
    <>
      <path d="M4 6v12" />
      <path d="M6 6v12" />
      <path d="M8.5 6v12" />
      <path d="M10 6v12" />
      <path d="M12.5 6v12" />
      <path d="M14 6v12" />
      <path d="M16.5 6v12" />
      <path d="M19 6v12" />
    </>
  );
}

Object.defineProperty(BarcodeIcon, Symbol.for("poly:icon:tags"), {
  value: ["scan"] as const,
  enumerable: false,
});

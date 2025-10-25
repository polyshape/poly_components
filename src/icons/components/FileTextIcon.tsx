export function FileTextIcon() {
  return (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />
      <path d="M8 12h8M8 16h8" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(FileTextIcon, Symbol.for("poly:icon:tags"), {
  value: ["document"] as const,
  enumerable: false,
});

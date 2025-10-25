export function FileMinusIcon() {
  return (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />
      <path d="M12 15h5" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(FileMinusIcon, Symbol.for("poly:icon:tags"), {
  value: ["document"] as const,
  enumerable: false,
});

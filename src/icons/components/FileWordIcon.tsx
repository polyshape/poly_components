export function FileWordIcon() {
  return (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />
      <path d="M9 14l1.2 4 1-3 1 3 1.2-4" />
    </>
  );
}

Object.defineProperty(FileWordIcon, Symbol.for("poly:icon:tags"), {
  value: ["microsoft", "document"] as const,
  enumerable: false,
});

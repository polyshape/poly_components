export function FileCodeIcon() {
  return (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />
      <path
        d="M10 12l-2 2 2 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 12l2 2-2 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(FileCodeIcon, Symbol.for("poly:icon:tags"), {
  value: ["dev", "document"] as const,
  enumerable: false,
});

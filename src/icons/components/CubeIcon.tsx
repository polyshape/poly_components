export function CubeIcon() {
  return (
    <>
      <path
        d="M4 8l8-4 8 4v10l-8 4-8-4V8Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M12 12v10" stroke="currentColor" />
      <path d="M4 8l8 4 8-4" stroke="currentColor" />
    </>
  );
}

Object.defineProperty(CubeIcon, Symbol.for("poly:icon:tags"), {
  value: ["shape", "geometry"] as const,
  enumerable: false,
});

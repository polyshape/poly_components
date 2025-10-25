export function BarsIcon() {
  return (
    <>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </>
  );
}

Object.defineProperty(BarsIcon, Symbol.for("poly:icon:tags"), {
  value: ["menu", "navigation"] as const,
  enumerable: false,
});

export function WiredInternetIcon() {
  return (
    <>
      <rect x="5" y="6" width="14" height="10" rx="1" />
      <path d="M9 20h6M12 16v4" />
      <path d="M21.5 11.5v8.5" />
      <rect x="20" y="6.5" width="3" height="5" rx="0.7" />
      <path d="M20.5 8h2M20.5 10h2" />
    </>
  );
}

Object.defineProperty(WiredInternetIcon, Symbol.for("poly:icon:tags"), {
  value: ["network", "connectivity", "internet"] as const,
  enumerable: false,
});

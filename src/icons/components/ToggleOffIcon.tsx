export function ToggleOffIcon() {
  return (
    <>
      <rect x="4.2" y="7" width="18" height="10" rx="5" stroke="currentColor" />
      <circle cx="9" cy="12" r="4" fill="currentColor" stroke="none" />
    </>
  );
}

Object.defineProperty(ToggleOffIcon, Symbol.for("poly:icon:tags"), {
  value: ["switch"] as const,
  enumerable: false,
});

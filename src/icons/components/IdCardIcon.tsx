export function IdCardIcon() {
  return (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" />
      <circle cx="8" cy="12" r="2" stroke="currentColor" />
      <path d="M13 10h6M13 13h5" stroke="currentColor" strokeLinecap="round" />
    </>
  );
}

Object.defineProperty(IdCardIcon, Symbol.for("poly:icon:tags"), {
  value: ["user", "profile"] as const,
  enumerable: false,
});

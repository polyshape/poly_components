export function PowerIcon() {
  return (
    <>
      <path d="M12 3v6" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M6 6a9 9 0 1 0 12 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </>
  );
}

Object.defineProperty(PowerIcon, Symbol.for("poly:icon:tags"), {
  value: ["battery", "energy"] as const,
  enumerable: false,
});

export function ShieldExclamationIcon() {
  return (
    <>
      <path
        d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8v6" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M12 17.5h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ShieldExclamationIcon, Symbol.for("poly:icon:tags"), {
  value: ["security", "lock", "warning", "alert"] as const,
  enumerable: false,
});

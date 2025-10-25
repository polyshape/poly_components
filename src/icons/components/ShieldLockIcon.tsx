export function ShieldLockIcon() {
  return (
    <>
      <path
        d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12v-1a2 2 0 1 1 4 0v1"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M9 12.5h6v4h-6z" stroke="currentColor" strokeLinejoin="round" />
    </>
  );
}

Object.defineProperty(ShieldLockIcon, Symbol.for("poly:icon:tags"), {
  value: ["security", "lock"] as const,
  enumerable: false,
});

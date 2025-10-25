export function CircleNotchIcon() {
  return (
    <>
      <path
        d="M12 2a10 10 0 1 0 10 10"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

Object.defineProperty(CircleNotchIcon, Symbol.for("poly:icon:tags"), {
  value: ["shape", "loading", "progress"] as const,
  enumerable: false,
});

export function ClockIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" />
      <path
        d="M12 8v4l3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ClockIcon, Symbol.for("poly:icon:tags"), {
  value: ["time", "alarm", "time"] as const,
  enumerable: false,
});

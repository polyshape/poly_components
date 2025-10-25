export function MoonIcon() {
  return (
    <>
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        fill="none"
      />
    </>
  );
}

Object.defineProperty(MoonIcon, Symbol.for("poly:icon:tags"), {
  value: [
    "weather",
    "night",
    "dark",
    "sleep",
    "lunar",
    "brightness",
    "theme",
  ] as const,
  enumerable: false,
});

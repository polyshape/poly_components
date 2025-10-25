export function LightbulbIcon() {
  return (
    <>
      <path d="M9 14a3 3 0 1 1 6 0c0 1.5-1 2.5-1.5 3H10.5C10 16.5 9 15.5 9 14z" />
      <path d="M10 19h4M10 21h4" />
    </>
  );
}

Object.defineProperty(LightbulbIcon, Symbol.for("poly:icon:tags"), {
  value: ["idea", "inspiration", "bulb"] as const,
  enumerable: false,
});

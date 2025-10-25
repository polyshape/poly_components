export function WatchIcon() {
  return (
    <>
      <rect x="9" y="3" width="6" height="3" rx="1" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12V9M12 12h3" />
      <rect x="9" y="18" width="6" height="3" rx="1" />
    </>
  );
}

Object.defineProperty(WatchIcon, Symbol.for("poly:icon:tags"), {
  value: ["time", "clock", "alarm"] as const,
  enumerable: false,
});

export function CloudSunIcon() {
  return (
    <>
      {/* Sun - partial circle on top left behind cloud, slightly rotated counterclockwise */}
      <path
        d="M5.5 10.2 A4 4 0 0 1 12.2 6.8"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />

      {/* Sun rays */}
      {/* Ray at 270 degrees (horizontal left) */}
      <path
        d="M3.05 8.8 L1.55 8.8"
        stroke="currentColor"
        strokeLinecap="round"
      />

      {/* Ray at 315 degrees (diagonal up-left) */}
      <path
        d="M4.62 5.27 L3.55 4.3"
        stroke="currentColor"
        strokeLinecap="round"
      />

      {/* Ray at 0/360 degrees (vertical up) */}
      <path d="M8.85 3.5 L8.85 2" stroke="currentColor" strokeLinecap="round" />

      {/* Ray at 45 degrees (diagonal up-right) */}
      <path
        d="M13.6 4.75 L14.66 3.69"
        stroke="currentColor"
        strokeLinecap="round"
      />

      {/* Cloud - slightly smaller than original */}
      <path
        d="M8.5 18.5H20a3 3 0 0 0 0-6 5 5 0 0 0-9.5-1.5A3.5 3.5 0 0 0 8.5 18.5Z"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(CloudSunIcon, Symbol.for("poly:icon:tags"), {
  value: ["weather"] as const,
  enumerable: false,
});

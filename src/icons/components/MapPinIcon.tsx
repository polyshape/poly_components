export function MapPinIcon() {
  return (
    <>
      <g
        transform="translate(0,2.5) scale(0.95)"
        vectorEffect="non-scaling-stroke"
      >
        {/* Map outline split into segments to avoid pin overlap */}
        <path
          d="M3 19V7"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M3 7L8 5"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M8 5L9 5.325"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M18.8 6.08L21 5"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M21 5V17"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M21 17L16 19"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M16 19L8 17"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M8 17L3 19"
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Interior folds split to leave a gap under the pin */}
        <path
          d="M8 5V17"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M16 10V19"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g
        transform="translate(5,-1) scale(0.7)"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M12 21c-4.5-4.6-7-8.2-7-11a7 7 0 0 1 14 0c0 2.8-2.5 6.4-7 11Z"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" fill="none" />
      </g>
    </>
  );
}

Object.defineProperty(MapPinIcon, Symbol.for("poly:icon:tags"), {
  value: ["location", "pin", "navigation", "gps"] as const,
  enumerable: false,
});

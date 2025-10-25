export function UserSettingsIcon() {
  return (
    <>
      <path
        d="M4 20v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2z"
        fill="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="6" r="3" fill="currentColor" strokeWidth="2" />
      <g
        transform="translate(16 6) scale(0.3)"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="
          M19.8 13.5
          a8.6 8.6 0 0 0 0-3
          l2.4-1.7
          -1.7-2.3
          -2.4 1.3
          a8.6 8.6 0 0 0-2.8-1.6
          l-.5-2.6h-3.6l-.5 2.6
          a8.6 8.6 0 0 0-2.8 1.6
          l-2.4-1.3
          -1.7 2.3
          2.4 1.7
          a8.6 8.6 0 0 0 0 3
          l-2.4 1.7
          1.7 2.3
          2.4-1.3
          a8.6 8.6 0 0 0 2.8 1.6
          l.5 2.6h3.6l.5-2.6
          a8.6 8.6 0 0 0 2.8-1.6
          l2.4 1.3
          1.7-2.3
          -2.4-1.7z"
          fill="currentColor"
          strokeWidth="2"
        />
        <circle cx="13" cy="12" r="3" />
      </g>
    </>
  );
}

Object.defineProperty(UserSettingsIcon, Symbol.for("poly:icon:tags"), {
  value: ["person", "account", "gear"] as const,
  enumerable: false,
});

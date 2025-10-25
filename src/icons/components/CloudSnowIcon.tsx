export function CloudSnowIcon() {
  return (
    <>
      <path
        d="M5.5 16.5H18a3.5 3.5 0 0 0 0-7 5.5 5.5 0 0 0-10.4-1.7A4 4 0 0 0 5.5 16.5Z"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g
        transform="translate(1 14) scale(0.5)"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M12 10v4M10 12h4M10.7 10.7l2.6 2.6M13.3 10.7l-2.6 2.6"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
      <g
        transform="translate(6 14) scale(0.5)"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M12 10v4M10 12h4M10.7 10.7l2.6 2.6M13.3 10.7l-2.6 2.6"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
      <g
        transform="translate(11 14) scale(0.5)"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M12 10v4M10 12h4M10.7 10.7l2.6 2.6M13.3 10.7l-2.6 2.6"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

Object.defineProperty(CloudSnowIcon, Symbol.for("poly:icon:tags"), {
  value: ["weather"] as const,
  enumerable: false,
});

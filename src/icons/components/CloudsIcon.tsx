import { useId } from "react";

export function CloudsIcon() {
  const id = useId();
  const clipId = `pc-back-cloud-clip-${id}`;
  return (
    <>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path
            d="M0 0H24V24H0Z M6.3 16.15H18a3.5 3.5 0 0 0 0-7 5.5 5.5 0 0 0-10.4-1.7A4 4 0 0 0 6.3 17.3Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </clipPath>
      </defs>
      <path
        d="M3.4 13.6H15.4a2.8 2.8 0 0 0 0-5.6 4.8 4.8 0 0 0-9.1-1.5A3.2 3.2 0 0 0 3.4 13.6Z"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${clipId})`}
      />
      <g transform="translate(0.8,0.8)">
        <path
          d="M5.5 16.5H18a3.5 3.5 0 0 0 0-7 5.5 5.5 0 0 0-10.4-1.7A4 4 0 0 0 5.5 16.5Z"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

Object.defineProperty(CloudsIcon, Symbol.for("poly:icon:tags"), {
  value: ["weather"] as const,
  enumerable: false,
});

import { useId } from "react";

export function StarHalfIcon() {
  const id = useId();
  const clipId = `pc-star-half-${id}`;
  return (
    <>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <rect x="2" y="2" width="10" height="20" />
        </clipPath>
      </defs>
      {/* filled half */}
      <path
        d="M12 2.5l2.9 6 6.6.6-5 4.5 1.5 6.4L12 16.8l-6 3.2 1.5-6.4-5-4.5 6.6-.6z"
        fill="currentColor"
        strokeWidth="0"
        clipPath={`url(#${clipId})`}
      />
      {/* outline */}
      <path
        d="M12 2.5l2.9 6 6.6.6-5 4.5 1.5 6.4L12 16.8l-6 3.2 1.5-6.4-5-4.5 6.6-.6z"
        fill="none"
        stroke="currentColor"
      />
    </>
  );
}


import { useId } from "react";

export function CircleHalfFullIcon() {
  const id = useId();
  const clipId = `pc-circle-half-full-clip-${id}`;
  return (
    <>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <rect x="2" y="2" width="10" height="20" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" clipPath={`url(#${clipId})`} />
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
    </>
  );
}

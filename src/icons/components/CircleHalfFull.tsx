export function CircleHalfFull() {
  return (
    <>
      <defs>
        <clipPath id="pc-circle-half-full-clip" clipPathUnits="userSpaceOnUse">
          <rect x="2" y="2" width="10" height="20" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" clipPath="url(#pc-circle-half-full-clip)" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
    </>
  );
}


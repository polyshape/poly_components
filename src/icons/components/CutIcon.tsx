export function CutIcon() {
  return (
    <>
      {/* Handles */}
      <circle cx="6.5" cy="7" r="2" stroke="currentColor" fill="none" />
      <circle cx="6.5" cy="17" r="2" stroke="currentColor" fill="none" />
      {/* Arms to pivot */}
      <path
        d="M8.2 8.7L12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 15.3L12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Blades */}
      <path
        d="M12 12L20 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L20 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pivot */}
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  );
}

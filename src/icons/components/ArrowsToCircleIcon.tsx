export function ArrowsToCircleIcon() {
  return (
    <>
      {/* Circle center */}
      <circle cx="12" cy="12" r="1.5" />
      {/* Inward arrows */}
      <path d="M12 3.5v5M9 6l3-3 3 3" />
      <path d="M12 20.5v-5M9 18l3 3 3-3" />
      <path d="M3.5 12h5M6 9l-3 3 3 3" />
      <path d="M20.5 12h-5M18 9l3 3-3 3" />
    </>
  );
}

export function ArrowsMaximizeIcon() {
  return (
    <>
      {/* Outward corners with centered shafts to arrowheads */}
      {/* Top-left */}
      <path d="M12 12L5 5" />
      <path d="M10 5H5V10" />
      {/* Top-right */}
      <path d="M12 12L19 5" />
      <path d="M14 5H19V10" />
      {/* Bottom-left */}
      <path d="M12 12L5 19" />
      <path d="M10 19H5V14" />
      {/* Bottom-right */}
      <path d="M12 12L19 19" />
      <path d="M14 19H19V14" />
    </>
  );
}

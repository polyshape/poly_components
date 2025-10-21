export function ArrowsMinimizeIcon() {
  return (
    <>
      {/* Shafts from corners to just-before center (rounded caps) */}
      <path d="M6 6L10.5 10.5" />
      <path d="M18 6L13.5 10.5" />
      <path d="M6 18L10.5 13.5" />
      <path d="M18 18L13.5 13.5" />

      {/* Arrow heads pointing toward center (inward L-corners around the center) */}
      {/* Top-left head around (10.5,10.5) */}
      <path d="M10.5 10.5H6.5" />
      <path d="M10.5 10.5V6.5" />
      {/* Top-right head around (13.5,10.5) */}
      <path d="M13.5 10.5H17.5" />
      <path d="M13.5 10.5V6.5" />
      {/* Bottom-left head around (10.5,13.5) */}
      <path d="M10.5 13.5H6.5" />
      <path d="M10.5 13.5V17.5" />
      {/* Bottom-right head around (13.5,13.5) */}
      <path d="M13.5 13.5H17.5" />
      <path d="M13.5 13.5V17.5" />
    </>
  );
}

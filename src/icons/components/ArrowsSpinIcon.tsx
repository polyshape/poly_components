export function ArrowsSpinIcon() {
  return (
    <>
      {/* Circle with 4 cuts at 0°, 90°, 180°, 270° */}
      {/* Top-right arc (between ~315° and ~45°) */}
      <path d="M14 4 A8 8 0 0 1 20 10" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Right-bottom arc (between ~45° and ~135°) */}
      <path d="M20 14 A8 8 0 0 1 14 20" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Bottom-left arc (between ~135° and ~225°) */}
      <path d="M10 20 A8 8 0 0 1 4 14" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Left-top arc (between ~225° and ~315°) */}
      <path d="M4 10 A8 8 0 0 1 10 4" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Arrowhead at gap */}
      <path d="M20 8v3h-3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(30 21.2 10.8)" />
      {/* Arrowhead at right gap */}
      <path d="M20 8v3h-3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(120 14.18 13.7)" />
      {/* Arrowhead at bottom gap */}
      <path d="M20 8v3h-3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(210 12.3 14.45)" />
      {/* Arrowhead at left gap */}
      <path d="M20 8v3h-3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(300 9.05 15.75)" />
    </>
  );
}

export function RouteIcon() {
  return (
    <>
      <g transform="translate(2) scale(0.2)" vectorEffect="non-scaling-stroke">
        <path d="M12 92c-4.5-4.6-7-8.2-7-11a7 7 0 0 1 14 0c0 2.8-2.5 6.4-7 11Z" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="81" r="2.5" stroke="currentColor" fill="none" />
      </g>
      {/* Dashed route: smooth, curvy path from left pin bottom to top pin bottom */}
      <path d="M4.8 19.4 Q7 20 9 17.2 Q11 14.4 12.4 12.2 Q13.8 10 16.2 10.8 Q17.8 12.2 18.8 11.2 Q20.4 9.6 22.4 6" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 2.25" />
      <g transform="translate(19.6) scale(0.2)" vectorEffect="non-scaling-stroke">
        <path d="M12 29c-4.5-4.6-7-8.2-7-11a7 7 0 0 1 14 0c0 2.8-2.5 6.4-7 11Z" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="18" r="2.5" stroke="currentColor" fill="none" />
      </g>
    </>
  );
}

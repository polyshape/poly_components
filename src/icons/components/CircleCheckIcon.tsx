export function CircleCheckIcon() {
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id="check-mask">
          <rect width="26" height="26" x="-1" y="-1" fill="white" />
          <path d="M8 12l3 3 5-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#check-mask)" />
    </g>
  );
}
export function CircleMinusIcon() {
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id="circle-minus-mask">
          <rect width="24" height="24" fill="white" />
          <path d="M8 12h8" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#circle-minus-mask)" />
    </g>
  );
}

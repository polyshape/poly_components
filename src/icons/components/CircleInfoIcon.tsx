export function CircleInfoIcon() {
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id="info-mask">
          <rect width="24" height="24" fill="white" />
          <circle cx="11.7" cy="8" r="0.2" stroke="black" strokeWidth="2" fill="none" />
          <path d="M10.5 11h1.4M12 11v5.5M10.5 16.5h3" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#info-mask)" />
    </g>
  );
}
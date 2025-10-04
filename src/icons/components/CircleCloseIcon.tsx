export function CloseCircleIcon() {
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id="xmark-mask">
          <rect width="24" height="24" fill="white" />
          <path d="M9 9l6 6M15 9l-6 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#xmark-mask)" />
    </g>
  );
}

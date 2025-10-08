export function CircleQuestionIcon() {
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id="question-mask">
          <rect width="24" height="24" fill="white" />
          <g transform="translate(0,-1)">
            <path
              d="M9.5 9a2.8 2.8 0 0 1 5 2c0 2-2.8 2-2.5 4"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="18" r="0.6" stroke="black" strokeWidth="1.2" fill="none" />
          </g>
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#question-mask)" />
    </g>
  );
}

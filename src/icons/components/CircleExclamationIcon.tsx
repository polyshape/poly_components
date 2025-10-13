import { useId } from "react";

export function CircleExclamationIcon() {
  const id = useId();
  const maskId = `pc-exclamation-mask-${id}`;
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <path d="M12 7v6" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="17" r="0.6" stroke="black" strokeWidth="1.2" fill="none" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10" fill="currentColor" mask={`url(#${maskId})`} />
    </g>
  );
}

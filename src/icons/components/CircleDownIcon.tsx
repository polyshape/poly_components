import { useId } from "react";

export function CircleDownIcon() {
  const id = useId();
  const maskId = `pc-circle-down-mask-${id}`;
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <path
            d="M12 6v10"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 13l4 4 4-4"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
    </g>
  );
}

Object.defineProperty(CircleDownIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "navigation"] as const,
  enumerable: false,
});

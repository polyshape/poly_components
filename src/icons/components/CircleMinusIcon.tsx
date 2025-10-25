import { useId } from "react";

export function CircleMinusIcon() {
  const id = useId();
  const maskId = `pc-circle-minus-mask-${id}`;
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <path
            d="M8 12h8"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
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

Object.defineProperty(CircleMinusIcon, Symbol.for("poly:icon:tags"), {
  value: ["math", "symbol"] as const,
  enumerable: false,
});

import { useId } from "react";

export function CircleCheckIcon() {
  const id = useId();
  const maskId = `pc-check-mask-${id}`;
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id={maskId}>
          <rect width="26" height="26" x="-1" y="-1" fill="white" />
          <path
            d="M8 12l3 3 5-6"
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

Object.defineProperty(CircleCheckIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "confirmation", "success", "alert"] as const,
  enumerable: false,
});

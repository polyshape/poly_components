import { useId } from "react";

export function CircleCloseIcon() {
  const id = useId();
  const maskId = `pc-xmark-mask-${id}`;
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <path
            d="M9 9l6 6M15 9l-6 6"
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

Object.defineProperty(CircleCloseIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "confirmation", "error", "alert"] as const,
  enumerable: false,
});

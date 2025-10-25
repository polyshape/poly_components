import { useId } from "react";

export function WarningTriangleFilledIcon() {
  const id = useId();
  const maskId = `pc-warning-triangle-filled-mask-${id}`;
  return (
    <g stroke="none" strokeWidth="0">
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <path
            d="M12 9v4"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 16h.01"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </mask>
      </defs>
      <path
        d="M12.392 3.697 L20.608 18.303 Q21 19 20.2 19 L3.8 19 Q3 19 3.392 18.303 L11.608 3.697 Q12 3 12.392 3.697 Z"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
    </g>
  );
}

Object.defineProperty(WarningTriangleFilledIcon, Symbol.for("poly:icon:tags"), {
  value: ["status", "alert"] as const,
  enumerable: false,
});

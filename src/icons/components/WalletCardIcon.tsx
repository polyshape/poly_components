export function WalletCardIcon() {
  return (
    <>
      <path
        d="M3 9 V17 A2 2 0 0 0 5 19 H19 A2 2 0 0 0 21 17 V9 A2 2 0 0 0 19 7"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9 A2 2 0 0 1 5 7"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 7H6" stroke="currentColor" strokeLinecap="round" />
      <path d="M16 7H19" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M30 20h12v12h-12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="scale(0.5)"
      />
      <circle
        cx="36"
        cy="26"
        r="3"
        stroke="currentColor"
        transform="scale(0.5)"
      />
      {/* Card hint */}
      <rect
        x="6"
        y="5"
        width="10"
        height="4"
        rx="1"
        stroke="currentColor"
        fill="none"
      />
    </>
  );
}

Object.defineProperty(WalletCardIcon, Symbol.for("poly:icon:tags"), {
  value: ["finance", "payment", "money"] as const,
  enumerable: false,
});

export function CouponIcon() {
  return (
    <>
      <path
        d="M6 7h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4 2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M10 9v10" stroke="currentColor" strokeDasharray="2 2" />
    </>
  );
}

Object.defineProperty(CouponIcon, Symbol.for("poly:icon:tags"), {
  value: ["discount", "money", "finance"] as const,
  enumerable: false,
});

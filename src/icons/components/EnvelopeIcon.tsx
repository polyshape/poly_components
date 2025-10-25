export function EnvelopeIcon() {
  return (
    <>
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 7l9 6 8-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(EnvelopeIcon, Symbol.for("poly:icon:tags"), {
  value: ["mail", "email", "message"] as const,
  enumerable: false,
});

export function MailIcon() {
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
        d="M3.5 7l6 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 7l-5.5 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 12.5h-4 M16 12.5c0-1.9-1.4-3.5-3.5-3.5s-3.5 1.6-3.5 3.5 1.4 3.5 3.5 3.5c1.2 0 2-.4 2.6-1.1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(MailIcon, Symbol.for("poly:icon:tags"), {
  value: ["email", "message", "envelope"] as const,
  enumerable: false,
});

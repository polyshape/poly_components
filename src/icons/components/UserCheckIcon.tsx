export function UserCheckIcon() {
  return (
    <>
      <path
        d="M4 20v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2z"
        fill="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="6" r="3" fill="currentColor" strokeWidth="2" />
      <path
        d="M17.5 9l2 2l3.5-3.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </>
  );
}

Object.defineProperty(UserCheckIcon, Symbol.for("poly:icon:tags"), {
  value: ["person", "account"] as const,
  enumerable: false,
});

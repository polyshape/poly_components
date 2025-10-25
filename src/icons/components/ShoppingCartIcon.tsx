export function ShoppingCartIcon() {
  return (
    <>
      <path
        d="M5 5h2l1 9h8l1.5-6H6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.5" stroke="currentColor" />
      <circle cx="17" cy="19" r="1.5" stroke="currentColor" />
    </>
  );
}

Object.defineProperty(ShoppingCartIcon, Symbol.for("poly:icon:tags"), {
  value: ["money", "expenses"] as const,
  enumerable: false,
});

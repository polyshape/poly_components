export function HeartIcon() {
  return (
    <>
      <path
        d="M12 21s-6.2-4.7-8.5-7c-2-2-2.1-5.3 0-7.2 1.9-1.8 4.5-1.4 6.5.5L12 9.1l2-1.8c2-1.9 4.6-2.3 6.5-.5 2.1 1.9 2 5.2 0 7.2-2.3 2.3-8.5 7-8.5 7"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(HeartIcon, Symbol.for("poly:icon:tags"), {
  value: ["favorite"] as const,
  enumerable: false,
});

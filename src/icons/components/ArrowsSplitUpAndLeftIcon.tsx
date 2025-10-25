export function ArrowsSplitUpAndLeftIcon() {
  return (
    <>
      {/* Stem */}
      <path d="M12 20V12" />
      {/* Split up */}
      <path d="M12 12V6M9 9l3-3 3 3" />
      {/* Split left */}
      <path d="M12 14H6M9 11l-3 3 3 3" />
    </>
  );
}

Object.defineProperty(ArrowsSplitUpAndLeftIcon, Symbol.for("poly:icon:tags"), {
  value: ["navigation"] as const,
  enumerable: false,
});

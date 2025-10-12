export function StrikethroughIcon() {
  return (
    <>
      {/* Middle strike */}
      <path d="M4 12h16" stroke="currentColor" strokeLinecap="round" />
      {/* S top curve */}
      <path d="M6 9 C 9 5, 15 5, 18 9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      {/* S bottom curve */}
      <path d="M6 15 C 9 19, 15 19, 18 15" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

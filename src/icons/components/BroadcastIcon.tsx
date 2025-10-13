export function BroadcastIcon() {
  return (
    <>
      {/* center dot */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      {/* right waves (more curvy using cubic Beziers) */}
      <path d="M17 6 C 20.5 9, 20.5 15, 17 18" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8 C 18 10.5, 18 13.5, 15 16" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* left waves (mirrored) */}
      <path d="M7 6 C 3.5 9, 3.5 15, 7 18" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8 C 6 10.5, 6 13.5, 9 16" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

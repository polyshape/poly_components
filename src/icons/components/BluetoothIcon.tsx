export function BluetoothIcon() {
  return (
    <>
      <path
        d="M12 3 L18 8 L12 12 L18 16 L12 21 V3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* subtle left extensions of the diagonals */}
      <path d="M12 12 L9 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12 L9 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

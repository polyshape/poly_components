export function QrCodeIcon() {
  return (
    <>
      {/* Finder squares */}
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        stroke="currentColor"
        fill="none"
      />
      <rect x="5.5" y="5.5" width="3" height="3" fill="currentColor" />
      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        stroke="currentColor"
        fill="none"
      />
      <rect x="15.5" y="5.5" width="3" height="3" fill="currentColor" />
      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        stroke="currentColor"
        fill="none"
      />
      <rect x="5.5" y="15.5" width="3" height="3" fill="currentColor" />
      {/* data modules */}
      <rect x="12" y="12" width="2" height="2" fill="currentColor" />
      <rect x="16" y="12" width="2" height="2" fill="currentColor" />
      <rect x="12" y="16" width="2" height="2" fill="currentColor" />
    </>
  );
}

Object.defineProperty(QrCodeIcon, Symbol.for("poly:icon:tags"), {
  value: ["scan", "barcode"] as const,
  enumerable: false,
});

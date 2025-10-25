export function UploadCloudIcon() {
  return (
    <>
      <path d="M5.5 16.5H18a3.5 3.5 0 0 0 0-7 5.5 5.5 0 0 0-10.4-1.7A4 4 0 0 0 5.5 16.5Z" />
      <path d="M12 8v6" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M9.5 10.5L12 8l2.5 2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(UploadCloudIcon, Symbol.for("poly:icon:tags"), {
  value: ["arrows", "connectivity"] as const,
  enumerable: false,
});

export function ChatDotsIcon() {
  return (
    <>
      <path
        d="M20 15a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11h.01M12 11h.01M15 11h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ChatDotsIcon, Symbol.for("poly:icon:tags"), {
  value: ["communication", "messages", "chat", "connectivity"] as const,
  enumerable: false,
});

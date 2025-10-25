export function ChatIcon() {
  return (
    <>
      <path
        d="M20 15a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

Object.defineProperty(ChatIcon, Symbol.for("poly:icon:tags"), {
  value: ["communication", "messages", "chat", "connectivity"] as const,
  enumerable: false,
});

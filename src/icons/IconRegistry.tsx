
// Icon definitions - each icon is just the SVG content
export const iconPaths = {
  home: (
    <>
      <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </>
  ),
  // Add more icons here as needed
  // settings: <path d="..." />,
  // user: <path d="..." />,
} as const;

export type IconName = keyof typeof iconPaths;
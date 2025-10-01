import { makeStyles, mergeClasses } from "@griffel/react";
import type { CSSProperties } from "react";
import { useLoading } from "./useLoading.js";
import { Spinner } from "./Spinner.js";

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});

interface LoadingOverlayProps {
  dismissOnClick?: boolean;
  // Spinner props
  size?: number;
  color?: string;
  speed?: number;
  // Styling props
  className?: string;
  styles?: {
    root?: CSSProperties;
    spinner?: CSSProperties;
  };
}

export function LoadingOverlay({ 
  dismissOnClick = false,
  size = 14,
  color,
  speed,
  className,
  styles,
}: LoadingOverlayProps) {
  const { state, setLoadingState } = useLoading();
  const classes = useStyles();

  if (state !== "loading") {
    return <></>;
  }

  return (
    <div
      className={mergeClasses(classes.overlay, className)}
      style={styles?.root}
      role="status"
      aria-live="polite"
      aria-busy="true"
      onClick={dismissOnClick ? () => setLoadingState(null) : undefined}
    >
      <Spinner 
        size={size} 
        color={color}
        speed={speed}
        style={styles?.spinner}
      />
    </div>
  );
}

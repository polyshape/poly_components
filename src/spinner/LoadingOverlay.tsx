import { makeStyles } from "@griffel/react";
import { useLoading } from "./useLoading";
import { Spinner } from "./Spinner";

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

export function LoadingOverlay({ dismissOnClick = false }: { dismissOnClick?: boolean }) {
  const { state, setLoadingState } = useLoading();
  const classes = useStyles();

  if (state !== "loading") {
    return <></>;
  }

  return (
    <div
      className={classes.overlay}
      role="status"
      aria-live="polite"
      aria-busy="true"
      onClick={dismissOnClick ? () => setLoadingState(null) : undefined}
    >
      <Spinner size={14} />
    </div>
  );
}

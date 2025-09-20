import { useMemo } from "react";
import type { CSSProperties } from "react";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import { normalizeBorderStyles } from "../utils/style";
import { Button } from "../button";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.4rem",
    margin: "1rem 0 1rem",
    flexWrap: "wrap",
  },
  button: {
    minWidth: "2.25rem",
    height: "2.25rem",
    padding: "0 0.6rem",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor("var(--pc-page-border, rgba(0,0,0,0.12))"),
    background: "var(--pc-page-bg, rgba(255,255,255,0.5))",
    color: "inherit",
    font: "inherit",
    ":hover:not(:disabled)": {
      background: "var(--pc-page-hover-bg, color-mix(in srgb, var(--pc-accent, #D69D0D) 12%, rgba(255,255,255,0.5)))",
    },
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  buttonArrow: {
    color: "inherit",
    font: "inherit",
    background: "var(--pc-page-bg, rgba(255,255,255,0.5))",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.borderColor("var(--pc-page-border, rgba(0,0,0,0.12))"),
    ":hover:not(:disabled)": {
      background: "var(--pc-page-hover-bg, color-mix(in srgb, var(--pc-accent, #D69D0D) 12%, rgba(255,255,255,0.5)))",
    },
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  active: {
    background: "var(--pc-page-active-bg, color-mix(in srgb, var(--pc-accent, #D69D0D) 18%, rgba(255,255,255,0.5)))",
    ...shorthands.borderColor("var(--pc-page-active-border, color-mix(in srgb, var(--pc-accent, #D69D0D) 40%, rgba(0,0,0,0.12)))"),
    fontWeight: 800,
  },
  ellipsis: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.25rem",
    height: "2.25rem",
    color: "var(--pc-page-ellipsis, inherit)",
  },
});

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  ariaLabel?: string;
  delta?: number;
  className?: string;
  styles?: {
    root?: CSSProperties;
    button?: CSSProperties;
    buttonActive?: CSSProperties;
    buttonDisabled?: CSSProperties;
    ellipsis?: CSSProperties;
  };
};

export default function Pagination({
  totalPages,
  currentPage,
  setPage,
  ariaLabel,
  delta = 1,
  className,
  styles,
}: PaginationProps) {
  const pageItems = useMemo(
    () => buildPageItems(totalPages, currentPage, delta),
    [totalPages, currentPage, delta]
  );
  const classes = useStyles();

  if (totalPages <= 1) return null;

  return (
    <nav className={mergeClasses(classes.root, className)} aria-label={ariaLabel} style={styles?.root}>
      <Button
        onClick={() => setPage(1)}
        shape="circular"
        size="small"
        iconOnly
        icon={<i className="fa-solid fa-angles-left" aria-hidden="true"></i>}
        disabled={currentPage <= 1}
        aria-label="First page"
        className={classes.buttonArrow}
        style={{
          ...normalizeBorderStyles(styles?.button),
          ...(currentPage <= 1 ? normalizeBorderStyles(styles?.buttonDisabled) : {}),
        }}
      />
      <Button
        onClick={() => setPage(currentPage - 1)}
        shape="circular"
        size="small"
        iconOnly
        icon={<i className="fa-solid fa-chevron-left" aria-hidden="true"></i>}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className={classes.buttonArrow}
        style={{
          ...normalizeBorderStyles(styles?.button || {}),
          ...(currentPage <= 1 ? normalizeBorderStyles(styles?.buttonDisabled) : {}),
        }}
      />
      {pageItems.map((item, idx) =>
        typeof item === "number" ? (
          <Button
            key={item}
            shape="square"
            size="small"
            className={mergeClasses(classes.button, item === currentPage && classes.active)}
            onClick={() => setPage(item)}
            aria-current={item === currentPage ? "page" : undefined}
            style={{
              ...normalizeBorderStyles(styles?.button || {}),
              ...(item === currentPage ? normalizeBorderStyles(styles?.buttonActive) : {}),
            }}
          >
            {item}
          </Button>
        ) : (
          <span
            key={`e-${idx}`}
            className={classes.ellipsis}
            aria-hidden="true"
            style={styles?.ellipsis}
          >
            …
          </span>
        )
      )}
      <Button
        onClick={() => setPage(currentPage + 1)}
        shape="circular"
        size="small"
        iconOnly
        icon={<i className="fa-solid fa-chevron-right" aria-hidden="true"></i>}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className={classes.buttonArrow}
        style={{
          ...normalizeBorderStyles(styles?.button || {}),
          ...(currentPage >= totalPages ? normalizeBorderStyles(styles?.buttonDisabled) : {}),
        }}
      />
      <Button
        onClick={() => setPage(totalPages)}
        shape="circular"
        size="small"
        iconOnly
        icon={<i className="fa-solid fa-angles-right" aria-hidden="true"></i>}
        disabled={currentPage >= totalPages}
        aria-label="Last page"
        className={classes.buttonArrow}
        style={{
          ...normalizeBorderStyles(styles?.button || {}),
          ...(currentPage >= totalPages ? normalizeBorderStyles(styles?.buttonDisabled) : {}),
        }}
      />
    </nav>
  );
}

function buildPageItems(total: number, current: number, delta: number): Array<number | "..."> {
  if (total <= 0) return [];
  if (total === 1) return [1];
  if (total === 2) return [1, 2];

  const minMid = 2;
  const maxMid = total - 1;
  const domainCount = maxMid - minMid + 1;
  const base = Math.min(domainCount, 2 * delta + 1);
  const center = Math.min(Math.max(current, minMid), maxMid);
  let start = Math.max(minMid, Math.min(center - Math.floor(base / 2), maxMid - base + 1));
  let end = start + base - 1;

  let leftGap = start > minMid;
  let rightGap = end < maxMid;

  let missing = (leftGap ? 0 : 1) + (rightGap ? 0 : 1);
  while (missing > 0 && (start > minMid || end < maxMid)) {
    if (!leftGap && end < maxMid) {
      end++;
      missing--;
    } else if (!rightGap && start > minMid) {
      start--;
      missing--;
    } else if (end < maxMid) {
      end++;
      missing--;
    } else if (start > minMid) {
      start--;
      missing--;
    } else {
      break;
    }
    leftGap = start > minMid;
    rightGap = end < maxMid;
  }

  const result: Array<number | "..."> = [1];
  if (leftGap) result.push("...");
  for (let p = start; p <= end; p++) result.push(p);
  if (rightGap) result.push("...");
  result.push(total);
  return result;
}

import { makeStyles, mergeClasses } from "@griffel/react";
import type { CSSProperties } from "react";

type Props = {
  size?: number;
  color?: string;
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

let injected = false;
function ensureKeyframes() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `
  @keyframes pc-propagate { 
    0%   { transform: translateX(0) scale(0.25); opacity: .5; }
    35%  { transform: translateX(var(--shift, 0)) scale(1); opacity: 1; }
    70%  { transform: translateX(var(--shift, 0)) scale(1); opacity: 1; }
    100% { transform: translateX(0) scale(0.25); opacity: .5; }
  }
  `;
  document.head.appendChild(style);
  injected = true;
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "inline-block",
    height: 0,
  },
  dot: {
    position: "absolute",
    left: "50%",
    transformOrigin: "center",
    borderRadius: "50%",
  },
});

export function Spinner({ size = 12, color = "var(--pc-accent)", speed = 1, className, style }: Props) {
  const classes = useStyles();
  ensureKeyframes();

  const spacing = size * 1.8;
  const width = spacing * 6 + size;
  const dots = [0, 1, 2, 3, -1, -2, -3];
  const durationSec = 1.2 / (speed <= 0 ? 1 : speed);

  return (
    <div className={mergeClasses(classes.root, className)} style={{ ...style, width: `${width}px`, paddingTop: `${size}px` }} aria-label="Loading">
      {dots.map((step, idx) => {
        const shift = `${step * spacing}px`;
        const delay = Math.abs(step) * (durationSec / 7);
        const mag = Math.abs(step);
        const factor = mag === 0 ? 1 : mag === 1 ? 0.85 : mag === 2 ? 0.7 : 0.55;
        const w = size * factor;
        const h = w;
        const marginTop = `${(size - h) / 2}px`;
        const styleDot: CSSProperties = {
          width: `${w}px`,
          height: `${h}px`,
          marginLeft: `-${w / 2}px`,
          top: `${size / 2}px`,
          marginTop,
          background: color,
          animationName: 'pc-propagate',
          animationDuration: `${durationSec}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${delay}s`,
          ["--shift" as any]: shift,
        };
        return <div key={idx} className={classes.dot} style={styleDot} aria-hidden />;
      })}
    </div>
  );
}

export default Spinner;

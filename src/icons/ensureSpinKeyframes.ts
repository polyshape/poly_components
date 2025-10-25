let inserted = false;

export function ensureSpinKeyframes() {
  if (inserted) return;
  if (typeof document === "undefined") return;

  const id = "pc-icon-spin-style";
  if (document.getElementById(id)) {
    inserted = true;
    return;
  }

  const style = document.createElement("style");
  style.id = id;
  style.textContent = "@keyframes pc-icon-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }";
  document.head.appendChild(style);
  inserted = true;
}

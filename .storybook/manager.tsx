import React, { useRef, useState } from "react";
import { addons, types, useGlobals } from "storybook/manager-api";

const ADDON_ID = "pc-tokens";
const TOOL_ID = `${ADDON_ID}/tool`;
const LIVE_EVENT = `${ADDON_ID}/live`;

function swatches(values: string[], onPick: (v: string) => void) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: 6 }}>
      {values.map((v) => (
        <button
          key={v || "default"}
          onClick={() => onPick(v)}
          title={v || "Default"}
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.2)",
            background: v || "linear-gradient(45deg, #bbb 25%, transparent 25%, transparent 50%, #bbb 50%, #bbb 75%, transparent 75%, transparent)",
            backgroundSize: v ? undefined : "8px 8px",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}

function TokensTool() {
  const [{ tokens: globalTokens, tokensOpen }, updateGlobals] = useGlobals();
  const [open, setOpen] = useState<boolean>(!!tokensOpen);
  const ref = useRef<HTMLDivElement | null>(null);

  const tokens = (globalTokens as Record<string, string>) || {};

  const setToken = (key: string, value?: string) => {
    const next = { ...(tokens as Record<string, string>) };
    if (!value) {
      delete (next as Record<string, string>)[key];
    } else {
      (next as Record<string, string>)[key] = value;
    }
    updateGlobals({ tokens: next });
  };

  const emitLive = (key: string, value: string) => {
    try {
      addons.getChannel().emit(LIVE_EVENT, { token: key, value });
    } catch {
      // Silently ignore channel errors
    }
  };

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center", gap: 8, padding: "6px 0" }}>
      <div style={{ fontWeight: 600 }}>{label}</div>
      <div>{children}</div>
    </div>
  );

  const ColorPick = ({ token, fallback }: { token: string; fallback: string }) => {
    const live = (tokens as Record<string, string>)[token] as string | undefined;
    const initial = /^#([0-9a-f]{3,8})$/i.test(live || "") ? (live as string) : fallback;
    const [val, setVal] = useState<string>(initial);
    // Keep picker in sync if globals change externally
    React.useEffect(() => {
      const next = /^#([0-9a-f]{3,8})$/i.test((tokens as Record<string, string>)[token] || "")
        ? ((tokens as Record<string, string>)[token] as string)
        : fallback;
      setVal(next);
    }, [live, token, fallback]);

    return (
      <input
        type="color"
        value={val}
        onChange={(e) => {
          // only update local value to prevent global re-render closing the native picker
          setVal(e.target.value);
          emitLive(token, e.target.value);
        }}
        onBlur={() => {
          setToken(token, val);
        }}
        title={token}
        style={{ width: 32, height: 24, border: "1px solid rgba(0,0,0,0.2)", borderRadius: 4, cursor: "pointer" }}
      />
    );
  };

  const popover = (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 36,
        right: 12,
        zIndex: 9999,
        background: "var(--pc-bg, #fff)",
        color: "var(--pc-fg, #111)",
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: 8,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        padding: 12,
        minWidth: 360,
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <strong>Theme Tokens</strong>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            updateGlobals({ tokensOpen: false });
          }}
          style={{ cursor: "pointer" }}
        >
          ×
        </button>
      </div>
      <Row label="Accent">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#D69D0D", "#0EA5E9", "#7c9eff", "#16a34a", "#ef4444"], (v) => setToken("--pc-accent", v))}
          <ColorPick token="--pc-accent" fallback="#D69D0D" />
        </div>
      </Row>
      <Row label="Background">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#0e1424", "#0b0b0b", "#ffffff", "#111827", "#f3f4f6"], (v) => setToken("--pc-bg", v))}
          <ColorPick token="--pc-bg" fallback="#0b0b0b" />
        </div>
      </Row>
      <Row label="Border">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#222634", "#e0e4ee", "#94a3b8"], (v) => setToken("--pc-border", v))}
          <ColorPick token="--pc-border" fallback="#222634" />
        </div>
      </Row>
      <Row label="Card">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#171b28", "#646464", "#f5f7fb", "#eef2f7"], (v) => setToken("--pc-card", v))}
          <ColorPick token="--pc-card" fallback="#171b28" />
        </div>
      </Row>
      <Row label="Field BG">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#1b2234", "#eef2f7"], (v) => setToken("--pc-field-bg", v))}
          <ColorPick token="--pc-field-bg" fallback="#1b2234" />
        </div>
      </Row>
      <Row label="Field Border">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#2a334a", "#e0e4ee", "#94a3b8"], (v) => setToken("--pc-field-border", v))}
          <ColorPick token="--pc-field-border" fallback="#2a334a" />
        </div>
      </Row>
      <Row label="Muted">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#a0a6b0", "#6e6e6e", "#b8b8b8"], (v) => setToken("--pc-muted", v))}
          <ColorPick token="--pc-muted" fallback="#a0a6b0" />
        </div>
      </Row>
      <Row label="Foreground">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {swatches(["", "#e7e7e7", "#0b0c0f"], (v) => setToken("--pc-fg", v))}
          <ColorPick token="--pc-fg" fallback="#e7e7e7" />
        </div>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
        <button onClick={() => updateGlobals({ tokens: {} })} style={{ cursor: "pointer" }}>Reset All</button>
      </div>
    </div>
  );

  return (
    <>
      <button
        title="Theme Tokens"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            updateGlobals({ tokensOpen: next });
            return next;
          });
        }}
        style={{
          background: "transparent",
          border: 0,
          padding: "6px 8px",
          cursor: "pointer",
        }}
      >
        🎨 Tokens
      </button>
      {open ? popover : null}
    </>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Theme Tokens",
    match: ({ viewMode }) => !!viewMode,
    render: () => <TokensTool />,
  });
});

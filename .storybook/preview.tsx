import type { Preview } from "@storybook/react-vite";
import { addons } from "storybook/preview-api";
import { ThemeProvider } from "../src/theme/ThemeProvider.js";
import { useTheme } from "../src/theme/useTheme.js";
import { useEffect, type ComponentType } from "react";

function ThemeSync({ target }: { target: "light" | "dark" }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(target);
  }, [target, setTheme]);
  return null;
}

function ThemeBodySync() {
  const { theme } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    const bg = getComputedStyle(root).getPropertyValue("--pc-bg") || (theme === "light" ? "#ffffff" : "#0b0b0b");
    const fg = getComputedStyle(root).getPropertyValue("--pc-fg") || (theme === "light" ? "#111111" : "#e7e7e7");
    document.body.style.background = bg.trim();
    document.body.style.color = fg.trim();
  }, [theme]);
  return null;
}

function LiveTokenSync() {
  useEffect(() => {
    const ch = (addons as { getChannel?: () => { on: (event: string, handler: (payload: unknown) => void) => void; off?: (event: string, handler: (payload: unknown) => void) => void } })?.getChannel?.();
    if (!ch) return;
    const handler = (payload: unknown) => {
      try {
        const root = document.documentElement;
        if (payload && typeof payload === "object" && payload !== null) {
          const tokenPayload = payload as { token?: string; value?: string };
          if (typeof tokenPayload.token === "string" && typeof tokenPayload.value === "string") {
            root.style.setProperty(tokenPayload.token, tokenPayload.value);
          }
        }
      } catch {
        // Silently ignore token sync errors
      }
    };
    ch.on("pc-tokens/live", handler);
    return () => ch.off?.("pc-tokens/live", handler);
  }, []);
  return null;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    tokens: {
      name: "Tokens",
      description: "Theme tokens passed to ThemeProvider (CSS vars)",
      defaultValue: {},
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story: ComponentType, context: { args: Record<string, unknown>; globals: Record<string, unknown> }) => {
      const baseTokens = ((context.args as { tokens?: Record<string, string> })?.tokens ?? context.globals.tokens) as Record<string, string>;
      return (
        <ThemeProvider initialTheme={context.globals.theme as "light" | "dark"} tokens={baseTokens}>
          <ThemeSync target={context.globals.theme as "light" | "dark"} />
          <ThemeBodySync />
          <LiveTokenSync />
          <main style={{ minHeight: "100vh", background: "var(--pc-bg)", color: "var(--pc-fg)", fontFamily: "Inter, ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial" }}>
            <Story />
          </main>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

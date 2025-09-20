import type { Preview } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { useTheme } from '../src/theme/useTheme';
import { useEffect } from 'react';

function ThemeSync({ target }: { target: 'light' | 'dark' }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(target);
  }, [target]);
  return null;
}

function ThemeBodySync() {
  const { theme } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    const bg = getComputedStyle(root).getPropertyValue('--pc-bg') || (theme === 'light' ? '#ffffff' : '#0b0b0b');
    const fg = getComputedStyle(root).getPropertyValue('--pc-fg') || (theme === 'light' ? '#111111' : '#e7e7e7');
    document.body.style.background = bg.trim();
    document.body.style.color = fg.trim();
  }, [theme]);
  return null;
}

function LiveTokenSync() {
  useEffect(() => {
    const ch: any = (addons as any)?.getChannel?.();
    if (!ch) return;
    const handler = (payload: any) => {
      try {
        const root = document.documentElement;
        if (payload && typeof payload.token === 'string' && typeof payload.value === 'string') {
          root.style.setProperty(payload.token, payload.value);
        }
      } catch {}
    };
    ch.on('pc-tokens/live', handler);
    return () => ch.off?.('pc-tokens/live', handler);
  }, []);
  return null;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    tokens: {
      name: 'Tokens',
      description: 'Theme tokens passed to ThemeProvider (CSS vars)',
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
    (Story, context) => {
      const baseTokens = ((context.args as any)?.tokens ?? context.globals.tokens) as any;
      return (
        <ThemeProvider initialTheme={context.globals.theme} tokens={baseTokens}>
          <ThemeSync target={context.globals.theme as 'light' | 'dark'} />
          <ThemeBodySync />
          <LiveTokenSync />
          <main style={{ minHeight: '100vh', background: 'var(--pc-bg)', color: 'var(--pc-fg)', fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial' }}>
            <Story />
          </main>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

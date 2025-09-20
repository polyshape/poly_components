import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.mdx',
  ],
  "addons": [
    "@storybook/addon-docs",
    'storybook-addon-pseudo-states',
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;
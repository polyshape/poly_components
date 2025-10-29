import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
  ],
  "addons": [
    "@storybook/addon-docs",
    "storybook-addon-pseudo-states",
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "typescript": {
    "reactDocgen": "react-docgen-typescript",
    "reactDocgenTypescriptOptions": {
      "tsconfigPath": "../tsconfig.json",
      "shouldExtractLiteralValuesFromEnum": true,
      "shouldRemoveUndefinedFromOptional": true,
      "propFilter": (prop: { parent?: { fileName?: string } }) => !/node_modules/.test(prop.parent?.fileName ?? "")
    }
  }
};
export default config;

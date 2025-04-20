import path from "node:path";
import type { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen",
  },

  viteFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          "react-native": path.resolve(
            __dirname,
            "node_modules/react-native-web",
          ),
          // tamagui.config.tsを読み込む
          "tamagui.config": path.resolve(__dirname, "../tamagui.config.ts"),
          // Add any custom aliases here
        },
      },
    };
  },
};

export default main;

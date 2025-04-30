import path from "node:path";
import type { StorybookConfig } from "@storybook/react-native-web-vite";
// import react from "@vitejs/plugin-react"; // Remove the react plugin import

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
    // Revert viteFinal to non-async
    // Add react-native-reanimated to optimizeDeps.include
    // https://github.com/software-mansion/react-native-reanimated/issues/3991#issuecomment-1477848414
    if (!config.optimizeDeps) {
      config.optimizeDeps = {};
    }
    if (!config.optimizeDeps.include) {
      config.optimizeDeps.include = [];
    }
    // config.optimizeDeps.include.push( // Remove these from include
    //   "react-native-reanimated",
    //   "moti",
    //   "@tamagui/animations-moti",
    // );

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
        // Needed for react-native-web
        extensions: [
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx",
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".mjs",
        ],
      },
      // Remove the manually added react plugin
      // plugins: [
      //   ...(config.plugins || []), // Keep existing plugins
      //   react({
      //     babel: {
      //       // Use babel.config.js settings
      //       configFile: true,
      //     },
      //   }),
      // ],
    };
  },
};

export default main;

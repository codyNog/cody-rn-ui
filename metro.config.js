import path from "node:path";
import { fileURLToPath } from "node:url";
// Learn more https://docs.expo.io/guides/customizing-metro
import { getDefaultConfig } from "expo/metro-config.js";

// ES Modulesでは__dirnameが使えないため、同等の機能を実装
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 1. Storybookのエイリアスを追加
config.resolver.resolverMainFields = [
  "sbmodern",
  ...config.resolver.resolverMainFields,
];

// 2. React Nativeのエイリアスを追加
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs"];

// 3. Storybookのアセットを含める
config.watchFolders = [...(config.watchFolders || []), "./.storybook"];

// Exclude specific modules from the bundle
config.resolver.extraNodeModules = {
  "@storybook/core": path.resolve(__dirname, "./empty-module.js"),
  "@storybook/core/manager-api": path.resolve(__dirname, "./empty-module.js"),
  "react-native-reanimated": path.resolve(__dirname, "./empty-module.js"),
};

export default config;

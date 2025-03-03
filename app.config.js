export default ({ config }) => ({
  ...config,
  name: "HelloWorld",
  slug: "expo-template-blank-typescript",
  version: "1.0.0",
  orientation: "portrait",
  newArchEnabled: true,
  splash: {
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
});

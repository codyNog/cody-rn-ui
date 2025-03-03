export default (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // ここにエイリアスを追加できます
          },
        },
      ],
      "react-native-web",
    ],
  };
};

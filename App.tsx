import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { UIProvider } from "./src/Provider";
import { Background } from "./src/Background";

function App() {
  return (
    <UIProvider>
      <Background>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      </Background>
    </UIProvider>
  );
}

// 環境変数に基づいてStorybookを表示するかどうかを決定
let AppEntryPoint = App;

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
  AppEntryPoint = require("./.rnstorybook").default;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppEntryPoint;

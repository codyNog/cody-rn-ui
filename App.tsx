import React, { useEffect } from "react";
import { getStorybookUI } from "@storybook/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import "./storybook.requires.js";

// Storybookの設定
const StorybookUIRoot = getStorybookUI({
  // オプション設定
  asyncStorage: AsyncStorage,
  onDeviceUI: true,
  disableWebsockets: Platform.OS !== "android", // Androidの場合はWebsocketsを有効に
  shouldPersistSelection: true,
});

// Expoアプリのエントリーポイント
export default function App() {
  useEffect(() => {
    // ここでアプリの初期化処理を行うことができます
    console.log("Storybook for React Native initialized");
  }, []);

  return <StorybookUIRoot />;
}

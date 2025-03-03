import React from "react";
import { UIProvider } from "../src/Provider";
import { Background } from "../src/Background";

export const decorators = [
  (Story, context) => {
    // コントロールパネルから選択されたキーカラーを取得（デフォルトは紫色）
    const keyColor = context.globals.keyColor || "#6750A4";

    return (
      <UIProvider keyColor={keyColor}>
        <Background>
          <Story />
        </Background>
      </UIProvider>
    );
  },
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // グローバルなパラメータを設定
  materialDesign: {
    keyColor: "#6750A4", // デフォルトのキーカラー
  },
};

export const globalTypes = {
  keyColor: {
    name: "Key Color",
    description: "Material Design 3のキーカラー",
    defaultValue: "#6750A4",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "#6750A4", title: "Default Purple" },
        { value: "#006A6A", title: "Teal" },
        { value: "#B3261E", title: "Red" },
        { value: "#386A20", title: "Green" },
        { value: "#006493", title: "Blue" },
      ],
      showName: true,
    },
  },
};

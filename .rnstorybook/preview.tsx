import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react";
import React from "react";
import { Background } from "../src/Background";
import { UIProvider } from "../src/Provider";

/**
 * Storybookのプレビュー設定
 *
 * Material Design 3のデザイントークンを使用したUIProviderでラップしています。
 * デフォルトのキーカラーは #6750A4（Material Design 3のデフォルト紫色）です。
 */
const preview: Preview = {
  decorators: [
    withBackgrounds,
    (Story, context) => {
      // コントロールパネルから選択されたキーカラーを取得
      const keyColor = context.globals?.keyColor || "#6750A4";

      return (
        <UIProvider keyColor={keyColor}>
          <Background>
            <Story />
          </Background>
        </UIProvider>
      );
    },
  ],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
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
  },
  
  // グローバルな引数を設定（Storybookのコントロールパネルで変更可能）
  globalTypes: {
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
  },
};

export default preview;

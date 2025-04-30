import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { Text } from "tamagui";
import { Card as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "filled", "outlined"],
      description: "カードのバリアント",
      defaultValue: "elevated",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// サンプル画像URL
const sampleImageUrl = "https://picsum.photos/800/400";

// 基本的なカード
export const Default: Story = {
  args: {
    title: "カードのタイトル",
    description: "これはMaterial Design 3のカードコンポーネントです。",
    actions: [
      {
        label: "アクション",
        onClick: () => {},
        variant: "text",
      },
    ],
  },
  render: (args) => <Component {...args} />,
};

// エレベーテッドカード
export const Elevated: Story = {
  args: {
    title: "エレベーテッドカード",
    subtitle: "影付きのカード",
    description:
      "エレベーテッドカードは、表面から浮き上がって見えるカードです。",
    variant: "elevated",
    actions: [
      {
        label: "キャンセル",
        onClick: () => {},
        variant: "text",
      },
      {
        label: "確認",
        onClick: () => {},
        variant: "filled",
      },
    ],
  },
  render: (args) => <Component {...args} />,
};

// フィルドカード
export const Filled: Story = {
  args: {
    title: "フィルドカード",
    subtitle: "塗りつぶしのカード",
    description: "フィルドカードは、背景色が塗りつぶされたカードです。",
    variant: "filled",
    actions: [
      {
        label: "詳細",
        onClick: () => {},
        variant: "text",
      },
    ],
  },
  render: (args) => <Component {...args} />,
};

// アウトラインカード
export const Outlined: Story = {
  args: {
    title: "アウトラインカード",
    subtitle: "境界線付きのカード",
    description: "アウトラインカードは、境界線で囲まれたカードです。",
    variant: "outlined",
    actions: [
      {
        label: "詳細",
        onClick: () => {},
        variant: "outlined",
      },
    ],
  },
  render: (args) => <Component {...args} />,
};

// メディア付きカード
export const WithMedia: Story = {
  args: {
    title: "メディア付きカード",
    subtitle: "画像を含むカード",
    description:
      "カードには画像などのメディアコンテンツを含めることができます。",
    media: {
      source: { uri: sampleImageUrl },
      alt: "サンプル画像",
    },
    actions: [
      {
        label: "共有",
        onClick: () => {},
        variant: "text",
      },
      {
        label: "詳細を見る",
        onClick: () => {},
        variant: "filled",
      },
    ],
  },
  render: (args) => <Component {...args} />,
};

// 子要素を持つカード
export const WithChildren: Story = {
  args: {
    title: "カスタムコンテンツ",
    subtitle: "子要素を持つカード",
    media: {
      source: { uri: sampleImageUrl },
      alt: "サンプル画像",
    },
  },
  render: (args) => (
    <Component {...args}>
      <Text color="$onSurfaceVariant">
        カードには任意のReactコンポーネントを子要素として追加することができます。
        これにより、カスタムコンテンツを柔軟に配置できます。
      </Text>
    </Component>
  ),
};

// 動作確認
export const Behavior: Story = {
  args: {
    title: "動作確認",
    subtitle: "インタラクションテスト",
    description: "このカードはインタラクションテスト用です。",
    actions: [
      {
        label: "アクション",
        onClick: () => {},
        variant: "filled",
      },
    ],
  },
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

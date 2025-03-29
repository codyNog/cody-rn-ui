import type { Meta, StoryObj } from "@storybook/react";
import { YStack } from "tamagui"; // YStack をインポート
import { Skeleton as Component } from ".";

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"], // ドキュメント自動生成用
  argTypes: {
    // Propsのコントロールを設定
    variant: {
      control: { type: "radio" },
      options: ["rect", "circle"],
    },
    width: { control: "text" },
    height: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// デフォルトの引数（StorybookのControlsで変更可能）
const defaultArgs: Story["args"] = {
  width: 100,
  height: 20,
  variant: "rect",
};

// 基本的な表示
export const Default: Story = {
  args: defaultArgs,
};

// 円形のスケルトン
export const Circle: Story = {
  args: {
    ...defaultArgs,
    variant: "circle",
    width: 50, // 円なので幅と高さを同じに
    height: 50,
  },
};

// 幅と高さを指定した例
export const CustomSize: Story = {
  args: {
    ...defaultArgs,
    width: "80%",
    height: 10,
  },
};

// 複数のスケルトンを組み合わせた例 (リストアイテム風)
export const Composition: Story = {
  render: () => (
    <YStack space="$2" width={200} padding="$2">
      <Component variant="circle" width={40} height={40} />
      <YStack flex={1} space="$1">
        <Component width="100%" height={15} />
        <Component width="80%" height={15} />
      </YStack>
    </YStack>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { Switch as Component } from ".";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに基づいたスイッチコンポーネント
 *
 * スイッチは、設定のオン/オフを切り替えるために使用されます。
 * 以下の機能をサポートしています：
 * - オン/オフ状態
 * - ラベルテキスト
 * - Material Design 3の状態レイヤー効果（ホバー、プレス）
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "スイッチの状態",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "スイッチのラベル",
    },
    size: {
      control: {
        type: "select",
        options: ["$2", "$3", "$4", "$5"],
      },
      description: "スイッチのサイズ",
      table: {
        defaultValue: { summary: "$3" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  label: "スイッチ",
  checked: false,
  id: "switch-example",
};

// 基本的なスイッチ
export const Default: Story = {
  args,
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Component {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
};

// 状態バリエーション
export const States: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Component label="オフ状態" checked={false} id="switch-off" />
      <Component label="オン状態" checked={true} id="switch-on" />
    </YStack>
  ),
};

// サイズバリエーション
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Component label="小サイズ" size="$2" checked={false} id="switch-small" />
      <Component
        label="標準サイズ"
        size="$3"
        checked={false}
        id="switch-medium"
      />
      <Component label="大サイズ" size="$4" checked={false} id="switch-large" />
      <Component
        label="特大サイズ"
        size="$5"
        checked={false}
        id="switch-xlarge"
      />
    </YStack>
  ),
};

// 動作確認
export const Behavior: Story = {
  args,
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Component {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

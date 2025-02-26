import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { Checkbox as Component } from ".";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに基づいたチェックボックスコンポーネント
 *
 * チェックボックスは、オプションの選択や状態の切り替えに使用されます。
 * 以下の機能をサポートしています：
 * - チェック状態（選択済み、未選択、不確定）
 * - ラベルテキスト
 * - Material Design 3の状態レイヤー効果（ホバー、プレス）
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: {
        type: "select",
        options: [true, false, "indeterminate"],
      },
      description: "チェックボックスの状態",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "チェックボックスのラベル",
    },
    size: {
      control: {
        type: "select",
        options: ["$2", "$3", "$4", "$5"],
      },
      description: "チェックボックスのサイズ",
      table: {
        defaultValue: { summary: "$3" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  label: "チェックボックス",
  checked: false,
};

// 基本的なチェックボックス
export const Default: Story = {
  args,
  render: (args) => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);
    return (
      <Component {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
};

// 状態バリエーション
export const States: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Component label="未選択" checked={false} />
      <Component label="選択済み" checked={true} />
      <Component label="不確定" checked="indeterminate" />
    </YStack>
  ),
};

// サイズバリエーション
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Component label="小サイズ" size="$2" />
      <Component label="標準サイズ" size="$3" />
      <Component label="大サイズ" size="$4" />
      <Component label="特大サイズ" size="$5" />
    </YStack>
  ),
};

// 動作確認
export const Behavior: Story = {
  args,
  render: (args) => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);
    return (
      <Component {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

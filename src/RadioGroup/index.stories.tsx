import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { RadioGroup as Component } from ".";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに基づいたラジオボタングループコンポーネント
 *
 * ラジオボタンは、複数の選択肢から1つを選ぶために使用されます。
 * 以下の機能をサポートしています：
 * - 複数のオプション表示
 * - サイズバリエーション
 * - Material Design 3の状態レイヤー効果（ホバー、プレス）
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["$2", "$3", "$4", "$5"],
      },
      description: "ラジオボタンのサイズ",
      table: {
        defaultValue: { summary: "$3" },
      },
    },
    value: {
      control: "text",
      description: "選択されている値",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;
const args: Story["args"] = {
  options: [
    {
      label: "オプション 1",
      value: "option1",
    },
    {
      label: "オプション 2",
      value: "option2",
    },
    {
      label: "オプション 3",
      value: "option3",
    },
  ],
};

// 基本的なラジオグループ
export const Default: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// サイズバリエーション
export const Sizes: Story = {
  args,
  render: (args) => (
    <YStack space="$6" padding="$4">
      <Component {...args} size="$2" value="option1" onChange={() => {}} />
      <Component {...args} size="$3" value="option1" onChange={() => {}} />
      <Component {...args} size="$4" value="option1" onChange={() => {}} />
      <Component {...args} size="$5" value="option1" onChange={() => {}} />
    </YStack>
  ),
};

// 動作確認
export const Behavior: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

// 無効状態
export const Disabled: Story = {
  args: {
    ...args,
    disabled: true,
    value: "option1",
  },
  render: (args) => {
    return <Component {...args} onChange={() => {}} />;
  },
};

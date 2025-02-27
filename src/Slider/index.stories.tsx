import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { Slider as Component } from ".";
import { Text } from "../Text";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに基づいたスライダーコンポーネント
 *
 * スライダーは、値の範囲から特定の値を選択するために使用されます。
 * 以下の機能をサポートしています：
 * - 連続的な値の選択
 * - デフォルト値の設定
 * - 最小値・最大値の設定
 * - Material Design 3のスタイリング
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "number",
      description: "スライダーのデフォルト値",
      table: {
        defaultValue: { summary: 0 },
      },
    },
    min: {
      control: "number",
      description: "スライダーの最小値",
      table: {
        defaultValue: { summary: 0 },
      },
    },
    max: {
      control: "number",
      description: "スライダーの最大値",
      table: {
        defaultValue: { summary: 100 },
      },
    },
    step: {
      control: "number",
      description: "スライダーのステップ値",
      table: {
        defaultValue: { summary: 1 },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["$2", "$3", "$4", "$5"],
      },
      description: "スライダーのサイズ",
      table: {
        defaultValue: { summary: "$3" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

const args = {
  defaultValue: [50],
  min: 0,
  max: 100,
  step: 1,
};

export const Default: Story = {
  args,
  render: (args) => <Component {...args} />,
};

export const WithValue: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args) => {
    const [value, setValue] = useState([25]);
    return (
      <YStack space="$4" padding="$4">
        <Component {...args} value={value} onValueChange={setValue} />
        <Text>現在の値: {value[0]}</Text>
      </YStack>
    );
  },
};

// サイズバリエーション
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Text variant="labelMedium">小サイズ</Text>
      <Component size="$2" defaultValue={[30]} />

      <Text variant="labelMedium">標準サイズ</Text>
      <Component size="$3" defaultValue={[50]} />

      <Text variant="labelMedium">大サイズ</Text>
      <Component size="$4" defaultValue={[70]} />

      <Text variant="labelMedium">特大サイズ</Text>
      <Component size="$5" defaultValue={[90]} />
    </YStack>
  ),
};

// 範囲バリエーション
export const Ranges: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Text variant="labelMedium">標準範囲 (0-100)</Text>
      <Component defaultValue={[50]} min={0} max={100} />

      <Text variant="labelMedium">カスタム範囲 (-50-50)</Text>
      <Component defaultValue={[0]} min={-50} max={50} />

      <Text variant="labelMedium">大きなステップ (ステップ: 10)</Text>
      <Component defaultValue={[50]} min={0} max={100} step={10} />
    </YStack>
  ),
};

export const Behavior: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState([50]);
    return (
      <YStack space="$4" padding="$4">
        <Component {...args} value={value} onValueChange={setValue} />
        <Text>スライダー値: {value[0]}</Text>
      </YStack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

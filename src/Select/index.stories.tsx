import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { YStack } from "tamagui";
import { expect } from "@storybook/test";
import { Select as Component } from ".";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに基づいたセレクトコンポーネント
 *
 * セレクトは、複数の選択肢から1つを選ぶためのドロップダウンメニューです。
 * 以下の機能をサポートしています：
 * - グループ化されたオプション
 * - プレースホルダーテキスト
 * - エラー状態
 * - 無効状態
 * - Material Design 3の状態レイヤー効果（ホバー）
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "選択されている値",
    },
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    error: {
      control: "text",
      description: "エラーメッセージ",
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
      group: "言語",
      options: [
        { label: "日本語", value: "ja" },
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
        { label: "Italian", value: "it" },
        { label: "Portuguese", value: "pt" },
        { label: "Russian", value: "ru" },
      ],
    },
    {
      group: "フルーツ",
      options: [
        { label: "りんご", value: "apple" },
        { label: "バナナ", value: "banana" },
        { label: "オレンジ", value: "orange" },
        { label: "パイナップル", value: "pineapple" },
        { label: "バナナ", value: "banana" },
        { label: "オレンジ", value: "orange" },
        { label: "パイナップル", value: "pineapple" },
        { label: "バナナ", value: "banana" },
        { label: "オレンジ", value: "orange" },
        { label: "パイナップル", value: "pineapple" },
      ],
    },
  ],
  placeholder: "選択してください",
};

// 基本的なセレクト
export const Default: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Component {...args} value={value} onChange={setValue} />;
  },
};

// 状態バリエーション
export const States: Story = {
  args,
  render: (args) => (
    <YStack space="$4" padding="$4">
      <Component options={args.options} placeholder="通常状態" />
      <Component
        options={args.options}
        placeholder="エラー状態"
        error="選択が必要です"
      />
      <Component options={args.options} placeholder="無効状態" disabled />
      <Component
        options={args.options}
        value="apple"
        placeholder="選択済み状態"
      />
    </YStack>
  ),
};

// フラットなオプション
export const FlatOptions: Story = {
  args: {
    ...args,
    options: [
      { label: "りんご", value: "apple" },
      { label: "バナナ", value: "banana" },
      { label: "オレンジ", value: "orange" },
      { label: "パイナップル", value: "pineapple" },
      { label: "バナナ", value: "banana" },
      { label: "オレンジ", value: "orange" },
      { label: "パイナップル", value: "pineapple" },
      { label: "バナナ", value: "banana" },
      { label: "オレンジ", value: "orange" },
      { label: "パイナップル", value: "pineapple" },
    ],
    placeholder: "フルーツを選択",
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Component {...args} value={value} onChange={setValue} />;
  },
};

export const Behavior: Story = {
  args,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { Select as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const options = [
  { label: "オプション 1", value: "option1" },
  { label: "オプション 2", value: "option2" },
  { label: "オプション 3", value: "option3" },
  { label: "オプション 4", value: "option4" },
  { label: "オプション 5", value: "option5" },
  { label: "オプション 6", value: "option6" },
  { label: "オプション 7", value: "option7" },
  { label: "オプション 8", value: "option8" },
  { label: "オプション 9", value: "option9" },
  { label: "オプション 10", value: "option10" },
  { label: "オプション 11", value: "option11" },
  { label: "オプション 12", value: "option12" },
  { label: "オプション 13", value: "option13" },
  { label: "オプション 14", value: "option14" },
  { label: "オプション 15", value: "option15" },
  { label: "オプション 16", value: "option16" },
  { label: "オプション 17", value: "option17" },
  { label: "オプション 18", value: "option18" },
  { label: "オプション 19", value: "option19" },
  { label: "オプション 20", value: "option20" },
  { label: "オプション 21", value: "option21" },
  { label: "オプション 22", value: "option22" },
  { label: "オプション 23", value: "option23" },
  { label: "オプション 24", value: "option24" },
  { label: "オプション 25", value: "option25" },
  { label: "オプション 26", value: "option26" },
];

// 基本的な使用例
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Component
        label="選択してください"
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// バリアント
export const Variants: Story = {
  render: () => {
    const [filledValue, setFilledValue] = useState<string>("");
    const [outlinedValue, setOutlinedValue] = useState<string>("");

    return (
      <Component
        label="選択してください"
        options={options}
        value={outlinedValue}
        onChange={setOutlinedValue}
      />
    );
  },
};

// エラー状態
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Component
        label="エラー状態"
        options={options}
        value={value}
        onChange={setValue}
        error="エラーメッセージがここに表示されます"
      />
    );
  },
};

// 無効状態
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Component
        label="無効状態"
        options={options}
        value={value}
        onChange={setValue}
        disabled
      />
    );
  },
};

// ヘルパーテキスト
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Component
        label="ヘルパーテキスト付き"
        options={options}
        value={value}
        onChange={setValue}
        helperText="補足情報をここに表示できます"
      />
    );
  },
};

// 選択済み状態
export const Selected: Story = {
  render: () => {
    const [value, setValue] = useState<string>("option2");
    return (
      <Component
        label="選択済み"
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// 動作テスト
export const Behavior: Story = {
  args: {
    label: "テスト用Select",
    options,
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

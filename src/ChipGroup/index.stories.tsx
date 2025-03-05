import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Check, X } from "@tamagui/lucide-icons";
import { useState } from "react";
import { ChipGroup as Component } from ".";
import type { ChipVariant } from "../Chip";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "fullscreen", // 表示範囲を100%に設定
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的なチップデータ
const defaultChips = [
  { children: "Chip 1" },
  { children: "Chip 2" },
  { children: "Chip 3" },
  { children: "Chip 4" },
  { children: "Chip 5" },
  { children: "Chip 6" },
  { children: "Chip 7" },
];

// デフォルトのChipGroup
export const Default: Story = {
  args: {
    chips: defaultChips,
  },
};

// 異なるバリアントのChipを含むChipGroup
export const WithVariants: Story = {
  args: {
    chips: [
      { children: "Assist", variant: "assist" },
      { children: "Filter", variant: "filter" },
      { children: "Input", variant: "input" },
      { children: "Suggestion", variant: "suggestion" },
      { children: "Selected", variant: "filter", selected: true },
      { children: "Disabled", variant: "filter", disabled: true },
    ],
  },
};

// アイコン付きのChipを含むChipGroup
export const WithIcons: Story = {
  args: {
    chips: [
      {
        children: "Leading Icon",
        leadingIcon: <Check size={16} color="currentColor" />,
      },
      {
        children: "Trailing Icon",
        trailingIcon: <X size={16} color="currentColor" />,
      },
      {
        children: "Both Icons",
        leadingIcon: <Check size={16} color="currentColor" />,
        trailingIcon: <X size={16} color="currentColor" />,
      },
    ],
  },
};

// 選択可能なChipGroupのコンポーネント
const SelectableChipGroup = () => {
  const [selectedChips, setSelectedChips] = useState<number[]>([]);

  const toggleChip = (index: number) => {
    setSelectedChips((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const chips = defaultChips.map((chip, index) => ({
    ...chip,
    variant: "filter" as ChipVariant,
    selected: selectedChips.includes(index),
    onClick: () => toggleChip(index),
  }));

  return <Component chips={chips} />;
};

// 選択可能なChipGroupのストーリー
export const Selectable: Story = {
  render: () => <SelectableChipGroup />,
};

// インタラクティブな動作テスト
export const Behavior: Story = {
  args: {
    chips: [
      { children: "Clickable 1", variant: "filter", onClick: () => {} },
      { children: "Clickable 2", variant: "filter", onClick: () => {} },
      {
        children: "Disabled",
        variant: "filter",
        disabled: true,
        onClick: () => {},
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();

    // 最初のチップを取得してクリック
    const firstChip = await within(canvasElement).findByText("Clickable 1");
    await userEvent.click(firstChip);

    // 無効化されたチップが存在することを確認
    const disabledChip = await within(canvasElement).findByText("Disabled");
    expect(disabledChip).toBeTruthy();
  },
};

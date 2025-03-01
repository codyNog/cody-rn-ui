import { Check, Plus, X } from "@tamagui/lucide-icons";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { XStack, YStack } from "tamagui";
import { Chip as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  argTypes: {
    variant: {
      control: "select",
      options: ["assist", "filter", "input", "suggestion"],
    },
    selected: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

const defaultArgs: Story["args"] = {
  children: "Chip",
  variant: "assist",
  selected: false,
  disabled: false,
};

export const Default: Story = {
  args: defaultArgs,
  render: (args) => <Component {...args} />,
};

export const Assist: Story = {
  args: {
    ...defaultArgs,
    variant: "assist",
    children: "アシストチップ",
  },
};

export const Filter: Story = {
  args: {
    ...defaultArgs,
    variant: "filter",
    children: "フィルターチップ",
  },
};

export const Input: Story = {
  args: {
    ...defaultArgs,
    variant: "input",
    children: "入力チップ",
  },
};

export const Suggestion: Story = {
  args: {
    ...defaultArgs,
    variant: "suggestion",
    children: "提案チップ",
  },
};

export const Selected: Story = {
  args: {
    ...defaultArgs,
    selected: true,
    children: "選択済み",
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    children: "無効",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    ...defaultArgs,
    leadingIcon: <Check size={16} color="currentColor" />,
    children: "アイコン付き",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    ...defaultArgs,
    trailingIcon: <X size={16} color="currentColor" />,
    children: "削除可能",
  },
};

export const WithBothIcons: Story = {
  args: {
    ...defaultArgs,
    leadingIcon: <Check size={16} color="currentColor" />,
    trailingIcon: <X size={16} color="currentColor" />,
    children: "両方のアイコン",
  },
};

export const ChipGroup: Story = {
  render: () => (
    <YStack space="$2">
      <XStack space="$2" flexWrap="wrap">
        <Component variant="assist">アシスト</Component>
        <Component variant="filter">フィルター</Component>
        <Component variant="input">入力</Component>
        <Component variant="suggestion">提案</Component>
      </XStack>

      <XStack space="$2" flexWrap="wrap">
        <Component variant="filter" selected>
          選択済み
        </Component>
        <Component variant="filter" disabled>
          無効
        </Component>
        <Component variant="filter" leadingIcon={<Check size={16} />}>
          アイコン付き
        </Component>
        <Component variant="filter" trailingIcon={<X size={16} />}>
          削除可能
        </Component>
      </XStack>
    </YStack>
  ),
};

export const Behavior: Story = {
  args: defaultArgs,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

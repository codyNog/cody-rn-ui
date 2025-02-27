import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { Accordion as Component } from ".";
import { Text } from "../Text";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに基づいたアコーディオンコンポーネント
 *
 * アコーディオンは、コンテンツを折りたたんで表示するコンポーネントです。
 * 以下の機能をサポートしています：
 * - 複数または単一のアイテムを開く
 * - デフォルトで開くアイテムの指定
 * - 開閉状態の制御
 * - Material Design 3の状態レイヤー効果（ホバー、プレス）
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "開いているアイテムの値の配列",
    },
    defaultValue: {
      control: "object",
      description: "デフォルトで開いているアイテムの値の配列",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  items: [
    {
      title: "First",
      content: "First content",
    },
    {
      title: "Second",
      content: "Second content",
    },
    {
      title: "Third",
      content: "Third content",
    },
  ],
};

export const Default: Story = {
  args,
  render: (args) => <Component {...args} />,
};

export const WithDefaultOpen: Story = {
  args: {
    ...args,
    defaultValue: ["First"],
  },
  render: (args) => <Component {...args} />,
};

export const SingleSelection: Story = {
  args: {
    ...args,
  },
  render: (args) => <Component {...args} />,
};

export const ControlledAccordion: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState<string[]>(["Second"]);
    return (
      <YStack space="$4">
        <Component {...args} value={value} onChange={setValue} />
        <YStack>
          <Text>現在開いているアイテム: {value.join(", ")}</Text>
        </YStack>
      </YStack>
    );
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

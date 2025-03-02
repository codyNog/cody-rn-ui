import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { YStack, Text } from "tamagui";
import { Divider as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

/**
 * デフォルトの区切り線（fullWidth）
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <YStack width={300} space="$4" padding="$4">
      <Text>上のコンテンツ</Text>
      <Component {...args} />
      <Text>下のコンテンツ</Text>
    </YStack>
  ),
};

/**
 * 左右に余白のあるDivider（inset）
 */
export const Inset: Story = {
  args: {
    variant: "inset",
  },
  render: (args) => (
    <YStack width={300} space="$4" padding="$4">
      <Text>上のコンテンツ</Text>
      <Component {...args} />
      <Text>下のコンテンツ</Text>
    </YStack>
  ),
};

/**
 * 余白のあるDivider
 */
export const WithMargin: Story = {
  args: {
    margin: "$4",
  },
  render: (args) => (
    <YStack width={300} padding="$4" backgroundColor="$surfaceVariant">
      <Text>余白のあるDivider</Text>
      <Component {...args} />
      <Text>下のコンテンツ</Text>
    </YStack>
  ),
};

/**
 * カスタムスタイルのDivider
 */
export const CustomStyle: Story = {
  args: {
    borderColor: "$primary",
    borderWidth: 2,
  },
  render: (args) => (
    <YStack width={300} space="$4" padding="$4">
      <Text>上のコンテンツ</Text>
      <Component {...args} />
      <Text>下のコンテンツ</Text>
    </YStack>
  ),
};

export const Behavior: Story = {
  args: {},
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

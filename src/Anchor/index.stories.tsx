import type { Meta, StoryObj } from "@storybook/react";
import { YStack } from "tamagui";

import { expect } from "@storybook/test";
import { Anchor as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    docs: {
      description: {
        component:
          "Material Design 3のガイドラインに基づいたリンクコンポーネント",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: { href: "https://expo.dev", children: "Expoのウェブサイトへ" },
  render: (args) => <Component {...args} />,
};

export const ButtonVariant: Story = {
  args: {
    href: "https://expo.dev",
    children: "ボタンスタイルのリンク",
    variant: "button",
  },
  render: (args) => <Component {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Component href="https://expo.dev">
        テキストリンク（デフォルト）
      </Component>
      <Component href="https://expo.dev" variant="button">
        ボタンスタイルのリンク
      </Component>
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

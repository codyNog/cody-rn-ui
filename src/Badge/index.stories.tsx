import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import type React from "react";
import { Text, XStack, YStack } from "tamagui";
import { Badge as Component } from ".";
import { View } from "../View";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Badge",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的なバッジのプロパティ
const baseArgs: Story["args"] = {
  content: 1,
};

// バッジを表示するためのコンテナ
const BadgeContainer = ({ children }: { children: React.ReactNode }) => (
  <View
    width={40}
    height={40}
    backgroundColor="$surfaceContainerLow"
    borderRadius="$medium"
    position="relative"
  >
    {children}
  </View>
);

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
    <BadgeContainer>
      <Component {...args} />
    </BadgeContainer>
  ),
};

export const Variants: Story = {
  render: () => (
    <XStack space="$4" padding="$4">
      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="standard" content={1} />
        </BadgeContainer>
        <Text>標準</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="small" content={1} />
        </BadgeContainer>
        <Text>小</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="large" content={1} />
        </BadgeContainer>
        <Text>大</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="dot" />
        </BadgeContainer>
        <Text>ドット</Text>
      </YStack>
    </XStack>
  ),
};

export const Directions: Story = {
  render: () => (
    <XStack space="$4" padding="$4">
      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="topRight" content={1} />
        </BadgeContainer>
        <Text>右上</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="topLeft" content={1} />
        </BadgeContainer>
        <Text>左上</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="bottomRight" content={1} />
        </BadgeContainer>
        <Text>右下</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="bottomLeft" content={1} />
        </BadgeContainer>
        <Text>左下</Text>
      </YStack>
    </XStack>
  ),
};

export const ErrorBadge: Story = {
  render: () => (
    <XStack space="$4" padding="$4">
      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content={1} />
        </BadgeContainer>
        <Text>エラーバッジ</Text>
      </YStack>
    </XStack>
  ),
};

export const ContentTypes: Story = {
  render: () => (
    <XStack space="$4" padding="$4">
      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content={1} />
        </BadgeContainer>
        <Text>数値</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content={100} max={99} />
        </BadgeContainer>
        <Text>最大値超過</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content="!" />
        </BadgeContainer>
        <Text>テキスト</Text>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content={0} showZero />
        </BadgeContainer>
        <Text>ゼロ表示</Text>
      </YStack>
    </XStack>
  ),
};

export const Behavior: Story = {
  args: baseArgs,
  render: (args) => (
    <BadgeContainer>
      <Component {...args} />
    </BadgeContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

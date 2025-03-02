import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import type React from "react";
import { Badge as Component } from ".";
import { getCanvas } from "../libs/storybook";
import { View } from "../View";
import { XStack, YStack } from "tamagui";

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
        <View>標準</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="small" content={1} />
        </BadgeContainer>
        <View>小</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="large" content={1} />
        </BadgeContainer>
        <View>大</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component variant="dot" />
        </BadgeContainer>
        <View>ドット</View>
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
        <View>右上</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="topLeft" content={1} />
        </BadgeContainer>
        <View>左上</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="bottomRight" content={1} />
        </BadgeContainer>
        <View>右下</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component direction="bottomLeft" content={1} />
        </BadgeContainer>
        <View>左下</View>
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
        <View>エラーバッジ</View>
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
        <View>数値</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content={100} max={99} />
        </BadgeContainer>
        <View>最大値超過</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content="!" />
        </BadgeContainer>
        <View>テキスト</View>
      </YStack>

      <YStack space="$4" alignItems="center">
        <BadgeContainer>
          <Component content={0} showZero />
        </BadgeContainer>
        <View>ゼロ表示</View>
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

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import {
  ArrowLeft,
  Bell,
  ChevronLeft,
  Menu,
  MoreVertical,
  Search,
  Settings,
  Share,
} from "@tamagui/lucide-icons";
import { Text, YStack } from "tamagui";
import { TopAppBar as Component } from ".";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のガイドラインに準拠したTopAppBar
 *
 * 4つのバリアントを提供:
 * - center: 中央配置のタイトル（高さ64dp）
 * - small: 左配置のタイトル（高さ64dp）
 * - medium: 左配置のタイトル（高さ112dp）
 * - large: 下部配置のタイトル（高さ152dp）
 *
 * 注意: Material Designのガイドラインに従い、trailingIconsは最大3つまでサポートしています。
 *
 * 参考: https://m3.material.io/components/top-app-bar/overview
 */
const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <YStack backgroundColor="$surfaceContainer" minHeight={200}>
        <Story />
      </YStack>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Component>;

// 共通のアイコンサイズとカラー
// Material Design 3では通常アイコンサイズは24dpですが、
// タップ領域を考慮して少し大きめに設定
const iconProps = { size: 22, color: "$onSurfaceVariant" };

export const Center: Story = {
  args: {
    variant: "center",
    headline: "Center Aligned",
    leadingIcon: <ChevronLeft {...iconProps} />,
    trailingIcons: [<MoreVertical {...iconProps} key="more" />],
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    headline: "Small Top App Bar",
    leadingIcon: <ArrowLeft {...iconProps} />,
    trailingIcons: [
      <Search {...iconProps} key="search" />,
      <Bell {...iconProps} key="bell" />,
    ],
  },
};

export const Medium: Story = {
  args: {
    variant: "medium",
    headline: "Medium Top App Bar",
    leadingIcon: <Menu {...iconProps} />,
    trailingIcons: [
      <Search {...iconProps} key="search" />,
      <Bell {...iconProps} key="bell" />,
      <Settings {...iconProps} key="settings" />,
    ],
  },
};

export const Large: Story = {
  args: {
    variant: "large",
    headline: "Large Top App Bar",
    leadingIcon: <Menu {...iconProps} />,
    trailingIcons: [
      <Search {...iconProps} key="search" />,
      <MoreVertical {...iconProps} key="more" />,
    ],
  },
};

export const WithContent: Story = {
  args: {
    variant: "small",
    headline: "With Content",
    leadingIcon: <Menu {...iconProps} />,
    trailingIcons: [<Search {...iconProps} key="search" />],
    children: (
      <YStack padding="$4" gap="$4">
        <Text>コンテンツエリア</Text>
        <Text>TopAppBarの下に表示されるコンテンツです。</Text>
      </YStack>
    ),
  },
};

export const WithMultipleIcons: Story = {
  args: {
    headline: "Multiple Icons",
    leadingIcon: <Menu {...iconProps} />,
    trailingIcons: [
      <Search {...iconProps} key="search" />,
      <Bell {...iconProps} key="bell" />,
      <Share {...iconProps} key="share" />,
    ],
  },
};

export const LeadingIconOnly: Story = {
  args: {
    variant: "center",
    headline: "Leading Icon Only",
    leadingIcon: <Menu {...iconProps} />,
    trailingIcons: [],
  },
};

export const TrailingIconOnly: Story = {
  args: {
    variant: "center",
    headline: "Trailing Icon Only",
    leadingIcon: undefined,
    trailingIcons: [<MoreVertical {...iconProps} key="more" />],
  },
};

export const NoIcons: Story = {
  args: {
    variant: "center",
    headline: "No Icons",
    leadingIcon: undefined,
    trailingIcons: [],
  },
};

export const Behavior: Story = {
  args: {
    headline: "TopAppBar",
    leadingIcon: <Menu {...iconProps} />,
    trailingIcons: [<Search {...iconProps} key="search" />],
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

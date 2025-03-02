import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { NavigationBar as Component } from ".";
import { getCanvas } from "../libs/storybook";
import { YStack } from "tamagui";
import { Home, Search, Settings, User, Bell } from "@tamagui/lucide-icons";
import type { BadgeVariant } from "../Badge";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 共通のアイコンプロパティ
const iconProps = { size: 24, color: "$onSurfaceVariant" };
const activeIconProps = { size: 24, color: "$primary" };

// ナビゲーションアイテムの定義
const navigationItems = [
  {
    icon: <Home {...iconProps} />,
    activeIcon: <Home {...activeIconProps} fill="$primary" />,
    label: "ホーム",
    value: "home",
  },
  {
    icon: <Search {...iconProps} />,
    activeIcon: <Search {...activeIconProps} />,
    label: "検索",
    value: "search",
  },
  {
    icon: <Bell {...iconProps} />,
    activeIcon: <Bell {...activeIconProps} />,
    label: "通知",
    value: "notifications",
    badge: {
      content: 3,
      variant: "small" as BadgeVariant,
    },
  },
  {
    icon: <User {...iconProps} />,
    activeIcon: <User {...activeIconProps} />,
    label: "プロフィール",
    value: "profile",
  },
  {
    icon: <Settings {...iconProps} />,
    activeIcon: <Settings {...activeIconProps} />,
    label: "設定",
    value: "settings",
  },
];

// バッジ付きのナビゲーションアイテム
const navigationItemsWithBadges = [
  {
    icon: <Home {...iconProps} />,
    activeIcon: <Home {...activeIconProps} fill="$primary" />,
    label: "ホーム",
    value: "home",
  },
  {
    icon: <Search {...iconProps} />,
    activeIcon: <Search {...activeIconProps} />,
    label: "検索",
    value: "search",
  },
  {
    icon: <Bell {...iconProps} />,
    activeIcon: <Bell {...activeIconProps} />,
    label: "通知",
    value: "notifications",
    badge: {
      content: 12,
      variant: "small" as BadgeVariant,
    },
  },
  {
    icon: <User {...iconProps} />,
    activeIcon: <User {...activeIconProps} />,
    label: "プロフィール",
    value: "profile",
    badge: {
      variant: "dot" as BadgeVariant,
      visible: true,
    },
  },
  {
    icon: <Settings {...iconProps} />,
    activeIcon: <Settings {...activeIconProps} />,
    label: "設定",
    value: "settings",
  },
];

// 標準的なナビゲーションバー
export const Standard: Story = {
  args: {
    items: navigationItems,
    defaultValue: "home",
    variant: "standard",
  },
  render: (args) => (
    <YStack height={200} justifyContent="flex-end">
      <Component {...args} />
    </YStack>
  ),
};

// バッジ付きナビゲーションバー
export const WithBadges: Story = {
  args: {
    items: navigationItemsWithBadges,
    defaultValue: "home",
    variant: "standard",
  },
  render: (args) => (
    <YStack height={200} justifyContent="flex-end">
      <Component {...args} />
    </YStack>
  ),
};

// ラベル付きナビゲーションバー
export const Labeled: Story = {
  args: {
    items: navigationItems,
    defaultValue: "search",
    variant: "labeled",
  },
  render: (args) => (
    <YStack height={200} justifyContent="flex-end">
      <Component {...args} />
    </YStack>
  ),
};

// ラベルなしナビゲーションバー（アイコンのみ）
export const Unlabeled: Story = {
  args: {
    items: navigationItems.slice(0, 4), // 4つのアイテムに制限
    defaultValue: "notifications",
    variant: "unlabeled",
  },
  render: (args) => (
    <YStack height={200} justifyContent="flex-end">
      <Component {...args} />
    </YStack>
  ),
};

// 動作確認用
export const Behavior: Story = {
  args: {
    items: navigationItems,
    defaultValue: "home",
    variant: "standard",
  },
  render: (args) => (
    <YStack height={200} justifyContent="flex-end">
      <Component {...args} />
    </YStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

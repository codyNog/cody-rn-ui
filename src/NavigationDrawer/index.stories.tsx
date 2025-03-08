import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import {
  Home,
  Settings,
  User,
  Mail,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
} from "@tamagui/lucide-icons";
import { NavigationDrawer as Component, type NavigationItem } from ".";
import { getCanvas } from "../libs/storybook";
import { Button } from "../Button";
import { Text, XStack, YStack } from "tamagui";
import { typographyScale } from "../theme";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// サンプルナビゲーションアイテム
const navigationItems: NavigationItem[] = [
  {
    key: "home",
    label: "ホーム",
    icon: <Home size={24} />,
    selected: true,
    onPress: () => console.log("ホームが選択されました"),
  },
  {
    key: "profile",
    label: "プロフィール",
    icon: <User size={24} />,
    onPress: () => console.log("プロフィールが選択されました"),
  },
  {
    key: "messages",
    label: "メッセージ",
    icon: <Mail size={24} />,
    badge: <Text color="$error">3</Text>,
    onPress: () => console.log("メッセージが選択されました"),
  },
  {
    key: "notifications",
    label: "通知",
    icon: <Bell size={24} />,
    onPress: () => console.log("通知が選択されました"),
  },
  {
    key: "settings",
    label: "設定",
    icon: <Settings size={24} />,
    onPress: () => console.log("設定が選択されました"),
  },
  {
    key: "help",
    label: "ヘルプ",
    icon: <HelpCircle size={24} />,
    onPress: () => console.log("ヘルプが選択されました"),
  },
  {
    key: "logout",
    label: "ログアウト",
    icon: <LogOut size={24} />,
    onPress: () => console.log("ログアウトが選択されました"),
  },
];

// カスタムヘッダーコンポーネント
const CustomHeader = () => (
  <YStack padding="$4" gap="$2">
    <Text {...typographyScale.headlineSmall} color="$onSurface">
      アプリ名
    </Text>
    <Text {...typographyScale.bodyMedium} color="$onSurfaceVariant">
      user@example.com
    </Text>
  </YStack>
);

// カスタムフッターコンポーネント
const CustomFooter = () => (
  <YStack padding="$4">
    <Text {...typographyScale.bodySmall} color="$onSurfaceVariant">
      バージョン 1.0.0
    </Text>
  </YStack>
);

// 制御可能なドロワーのラッパーコンポーネント
const ControlledDrawer = (props: Story["args"] = {}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        style={{ margin: 16 }}
        icon={<Menu size={20} />}
      >
        メニューを開く
      </Button>
      <Component
        {...props}
        items={props.items || navigationItems}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

// 基本的なドロワー
export const Default: Story = {
  args: {
    items: navigationItems,
    open: true,
  },
  render: (args) => <Component {...args} />,
};

// 制御可能なドロワー
export const Controlled: Story = {
  args: {
    items: navigationItems,
  },
  render: (args) => <ControlledDrawer {...args} />,
};

// ヘッダーとフッター付きのドロワー
export const WithHeaderAndFooter: Story = {
  args: {
    items: navigationItems,
    header: <CustomHeader />,
    footer: <CustomFooter />,
    open: true,
  },
  render: (args) => <Component {...args} />,
};

// 右側に表示されるドロワー
export const RightSide: Story = {
  args: {
    items: navigationItems,
    side: "right",
    open: true,
  },
  render: (args) => <Component {...args} />,
};

// トグルボタン付きのドロワー
export const WithToggleButton: Story = {
  args: {
    items: navigationItems,
    showToggleButton: true,
    open: true,
  },
  render: (args) => <Component {...args} />,
};

// 動作確認用のストーリー
export const Behavior: Story = {
  args: {
    items: navigationItems,
  },
  render: (args) => <ControlledDrawer {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();

    // ボタンをクリックしてドロワーを開く
    const openButton = await canvas.findByText("メニューを開く");
    await userEvent.click(openButton);

    // ドロワー内のアイテムをクリック
    const homeItem = await canvas.findByText("ホーム");
    await userEvent.click(homeItem);
  },
};

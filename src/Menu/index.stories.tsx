import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Bell, Home, LogOut, Settings, User } from "@tamagui/lucide-icons";
import { useEffect, useRef, useState } from "react";
import { Button, YStack } from "tamagui";
import { Menu as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的なメニュー項目
const basicMenuItems = [
  {
    label: "プロフィール",
    onPress: () => console.log("プロフィールが選択されました"),
    leadingIcon: <User size={20} />,
  },
  {
    label: "設定",
    onPress: () => console.log("設定が選択されました"),
    leadingIcon: <Settings size={20} />,
  },
  {
    label: "通知",
    onPress: () => console.log("通知が選択されました"),
    leadingIcon: <Bell size={20} />,
    trailingText: "99+",
  },
  {
    label: "ログアウト",
    onPress: () => console.log("ログアウトが選択されました"),
    leadingIcon: <LogOut size={20} />,
  },
];

// 無効な項目を含むメニュー
const withDisabledItems = [
  {
    label: "プロフィール",
    onPress: () => console.log("プロフィールが選択されました"),
    leadingIcon: <User size={20} />,
  },
  {
    label: "設定",
    onPress: () => console.log("設定が選択されました"),
    leadingIcon: <Settings size={20} />,
    disabled: true,
  },
  {
    label: "通知",
    onPress: () => console.log("通知が選択されました"),
    leadingIcon: <Bell size={20} />,
  },
];

// ネストされたメニュー項目
const nestedMenuItems = [
  {
    label: "アカウント",
    onPress: () => console.log("アカウントが選択されました"),
    leadingIcon: <User size={20} />,
    items: [
      {
        label: "プロフィール編集",
        onPress: () => console.log("プロフィール編集が選択されました"),
      },
      {
        label: "パスワード変更",
        onPress: () => console.log("パスワード変更が選択されました"),
      },
    ],
  },
  {
    label: "設定",
    onPress: () => console.log("設定が選択されました"),
    leadingIcon: <Settings size={20} />,
    items: [
      {
        label: "一般設定",
        onPress: () => console.log("一般設定が選択されました"),
      },
      {
        label: "通知設定",
        onPress: () => console.log("通知設定が選択されました"),
      },
      {
        label: "プライバシー設定",
        onPress: () => console.log("プライバシー設定が選択されました"),
      },
    ],
  },
];

// 複数セクションを持つメニュー
const multiSectionArgs: Story["args"] = {
  sections: [
    {
      key: "main",
      items: [
        {
          label: "ホーム",
          onPress: () => console.log("ホームが選択されました"),
          leadingIcon: <Home size={20} />,
        },
        {
          label: "プロフィール",
          onPress: () => console.log("プロフィールが選択されました"),
          leadingIcon: <User size={20} />,
        },
        {
          label: "設定",
          onPress: () => console.log("設定が選択されました"),
          leadingIcon: <Settings size={20} />,
        },
      ],
    },
    {
      key: "account",
      items: [
        {
          label: "ログアウト",
          onPress: () => console.log("ログアウトが選択されました"),
          leadingIcon: <LogOut size={20} />,
        },
      ],
    },
  ],
};

// 基本的なメニュー
export const Default: Story = {
  args: {
    items: basicMenuItems,
  },
};

// 無効な項目を含むメニュー
export const WithDisabledItems: Story = {
  args: {
    items: withDisabledItems,
  },
};

// ネストされたメニュー
export const NestedMenu: Story = {
  args: {
    items: nestedMenuItems,
  },
  parameters: {
    layout: "padded",
    docs: {
      canvas: {
        width: 600,
        height: 400,
      },
    },
  },
};

// 複数セクションを持つメニュー（sectionsプロパティを使用）
export const MultiSection: Story = {
  args: multiSectionArgs,
};

// メニューの実際の使用例（ボタンクリックで表示）
export const MenuWithTrigger: StoryObj<typeof YStack> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showMenu, setShowMenu] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const menuRef = useRef<HTMLDivElement | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!showMenu) return;

      // ウェブ環境でのみ動作する外部クリック検出
      const handleClickOutside = (event: MouseEvent) => {
        // メニューとボタン以外の場所をクリックした場合、メニューを閉じる
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setShowMenu(false);
        }
      };

      // ウェブ環境でのみイベントリスナーを追加
      if (typeof document !== "undefined") {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        // ウェブ環境でのみイベントリスナーを削除
        if (typeof document !== "undefined") {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      };
    }, [showMenu]);

    return (
      <YStack padding={20} position="relative">
        <Button ref={buttonRef} onPress={() => setShowMenu(!showMenu)}>
          メニューを開く
        </Button>

        {showMenu && (
          <YStack
            ref={menuRef}
            position="absolute"
            top={60}
            left={0}
            zIndex={1000}
          >
            <Component items={basicMenuItems} />
          </YStack>
        )}
      </YStack>
    );
  },
};

export const Behavior: Story = {
  args: {
    items: basicMenuItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

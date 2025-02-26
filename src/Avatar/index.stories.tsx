import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";
import { YStack, XStack, Text } from "tamagui";

/**
 * Material Design 3のガイドラインに基づいたアバターコンポーネント
 *
 * アバターは、ユーザーやエンティティを表す円形の画像です。
 * 以下の機能をサポートしています：
 * - 複数のサイズバリエーション（small, medium, large, xlarge）
 * - カスタムサイズ
 * - エレベーション（影）効果
 * - 画像読み込み失敗時のフォールバック表示（イニシャル）
 */
const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large", "xlarge", 100],
      },
      description: "アバターのサイズ",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    elevated: {
      control: "boolean",
      description: "エレベーション（影）効果を適用するかどうか",
    },
    fallbackInitials: {
      control: "text",
      description: "画像読み込み失敗時に表示するイニシャル",
    },
    alt: {
      control: "text",
      description: "アクセシビリティのための代替テキスト",
      table: {
        defaultValue: { summary: "アバター画像" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// 基本的なアバター
export const Default: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/12592949",
    size: "medium",
  },
};

// エレベーション（影）効果付きアバター
export const Elevated: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/12592949",
    size: "medium",
    elevated: true,
  },
};

// フォールバック表示（イニシャル）
export const WithFallback: Story = {
  args: {
    src: "https://invalid-image-url.jpg",
    size: "medium",
    fallbackInitials: "MD",
  },
};

// サイズバリエーション
export const SizeVariants: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Text>サイズバリエーション</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            size="small"
          />
          <Text>Small</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            size="medium"
          />
          <Text>Medium</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            size="large"
          />
          <Text>Large</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            size="xlarge"
          />
          <Text>XLarge</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            customSize={100}
          />
          <Text>Custom (100px)</Text>
        </YStack>
      </XStack>

      <Text marginTop="$4">フォールバック表示（イニシャル）</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://invalid-image-url.jpg"
            size="small"
            fallbackInitials="SM"
          />
          <Text>Small</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://invalid-image-url.jpg"
            size="medium"
            fallbackInitials="MD"
          />
          <Text>Medium</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://invalid-image-url.jpg"
            size="large"
            fallbackInitials="LG"
          />
          <Text>Large</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://invalid-image-url.jpg"
            size="xlarge"
            fallbackInitials="XL"
          />
          <Text>XLarge</Text>
        </YStack>
      </XStack>

      <Text marginTop="$4">エレベーション（影）効果</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            size="medium"
          />
          <Text>通常</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar
            src="https://avatars.githubusercontent.com/u/12592949"
            size="medium"
            elevated
          />
          <Text>エレベーション付き</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

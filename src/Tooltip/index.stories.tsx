import type { Meta, StoryObj } from "@storybook/react";
import { XStack, YStack } from "tamagui";
import { Tooltip as Component } from ".";
import { Button } from "../Button";
import { Text } from "../Text";

/**
 * Material Design 3のガイドラインに基づいたツールチップコンポーネント
 *
 * ツールチップは、要素に関する追加情報を表示するための小さなポップアップです。
 * 以下の機能をサポートしています：
 * - 通常のツールチップ（シンプルで軽量）
 * - リッチツールチップ（タイトル、詳細な情報、アクション付き）
 * - 閉じるボタン付きツールチップ
 * - アクション付きツールチップ
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "ツールチップの内容",
    },
    title: {
      control: "text",
      description: "ツールチップのタイトル（リッチツールチップの場合）",
    },
    variant: {
      control: {
        type: "select",
        options: ["plain", "rich"],
      },
      description: "ツールチップのバリアント",
      table: {
        defaultValue: { summary: "plain" },
      },
    },
    onClose: {
      action: "closed",
      description: "閉じるボタンがクリックされたときのコールバック",
    },
    action: {
      description:
        "ツールチップに表示するアクション（リッチツールチップの場合）",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

// 基本的なツールチップ
export const Default: Story = {
  args: {
    content: "これは基本的なツールチップです。",
    children: <Button>ホバーしてください</Button>,
  },
};

// プレーンバリアント
export const Plain: Story = {
  args: {
    content: "シンプルなプレーンツールチップです。短い説明に適しています。",
    children: <Button>プレーンツールチップ</Button>,
    variant: "plain",
  },
};

// リッチツールチップ
export const Rich: Story = {
  args: {
    content:
      "リッチツールチップは、より詳細な情報を表示するために使用されます。タイトルを含めることができ、閉じるボタンを追加することもできます。",
    children: <Button>リッチツールチップ</Button>,
    title: "リッチツールチップ",
    variant: "rich",
  },
};

// 閉じるボタン付きリッチツールチップ
export const WithCloseButton: Story = {
  args: {
    content:
      "このツールチップは閉じるボタンを持っています。右上の×ボタンをクリックすると閉じることができます。",
    children: <Button>閉じるボタン付き</Button>,
    title: "閉じるボタン付き",
    variant: "rich",
    onClose: () => console.log("ツールチップが閉じられました"),
  },
};

// バリアント比較
export const VariantComparison: Story = {
  render: () => (
    <YStack space="$6" padding="$4">
      <YStack space="$2">
        <Text variant="titleMedium">
          プレーンバリアント vs リッチバリアント
        </Text>
        <XStack space="$4" flexWrap="wrap">
          <YStack width={200} space="$2">
            <Text variant="labelMedium">プレーン</Text>
            <Component
              variant="plain"
              content={
                <Text color="$inverseOnSurface">
                  プレーンツールチップは軽量で、シンプルな情報を表示します。
                </Text>
              }
            >
              <Button>プレーン</Button>
            </Component>
          </YStack>

          <YStack width={280} space="$2">
            <Text variant="labelMedium">リッチ</Text>
            <Component
              variant="rich"
              title="リッチツールチップ"
              content={
                <Text>
                  リッチツールチップは、タイトルや詳細情報を表示できます。より構造化された情報を提供します。
                </Text>
              }
            >
              <Button>リッチ</Button>
            </Component>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  ),
};

// バリエーション
export const Variations: Story = {
  render: () => (
    <YStack space="$6" padding="$4">
      <YStack space="$2">
        <Text variant="titleMedium">プレーンツールチップ</Text>
        <Component content="シンプルなツールチップです。短い説明に適しています。">
          <Button>プレーン</Button>
        </Component>
      </YStack>

      <YStack space="$2">
        <Text variant="titleMedium">リッチツールチップ</Text>
        <Component
          variant="rich"
          title="リッチツールチップ"
          content="リッチツールチップは、より詳細な情報を表示するために使用されます。タイトルを含めることができ、より長いコンテンツに適しています。"
        >
          <Button>リッチ</Button>
        </Component>
      </YStack>

      <YStack space="$2">
        <Text variant="titleMedium">閉じるボタン付き</Text>
        <Component
          variant="rich"
          title="閉じるボタン付き"
          onClose={() => console.log("閉じられました")}
          content="このツールチップは閉じるボタンを持っています。ユーザーが明示的に閉じることができるため、重要な情報を表示する場合に便利です。"
        >
          <Button>閉じるボタン</Button>
        </Component>
      </YStack>

      <YStack space="$2">
        <Text variant="titleMedium">アクション付き</Text>
        <Component
          variant="rich"
          title="アクション付き"
          action={{
            onClick: () => alert("アクションが実行されました"),
            label: "アクション",
          }}
          content="このツールチップはアクションボタンを持っています。ユーザーが直接アクションを実行できるため、ガイダンスと操作を組み合わせる場合に便利です。"
        >
          <Button>アクション</Button>
        </Component>
      </YStack>
    </YStack>
  ),
};

// アクション付きリッチツールチップ
export const WithAction: Story = {
  args: {
    content:
      "このツールチップはアクションボタンを持っています。ユーザーが直接アクションを実行できるため、ガイダンスと操作を組み合わせる場合に便利です。",
    children: <Button>アクション付き</Button>,
    title: "アクション付き",
    variant: "rich",
    action: {
      onClick: () => alert("アクションが実行されました"),
      label: "アクション",
    },
  },
};

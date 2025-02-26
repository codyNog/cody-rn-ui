import type { Meta, StoryObj } from "@storybook/react";
import { YStack } from "tamagui";
import { expect } from "@storybook/test";
import { Text as Component } from ".";
import { getCanvas } from "../libs/storybook";

/**
 * Material Design 3のタイポグラフィスケールに基づいたテキストコンポーネント
 *
 * 以下のバリアントをサポートしています：
 * - display: 大きな見出しやヒーローセクション用
 * - headline: 主要な見出し用
 * - title: セクションタイトル用
 * - body: 本文テキスト用
 * - label: ラベルやボタンテキスト用
 */
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "displayLarge",
          "displayMedium",
          "displaySmall",
          "headlineLarge",
          "headlineMedium",
          "headlineSmall",
          "titleLarge",
          "titleMedium",
          "titleSmall",
          "bodyLarge",
          "bodyMedium",
          "bodySmall",
          "labelLarge",
          "labelMedium",
          "labelSmall",
        ],
      },
      description: "テキストのタイポグラフィバリアント",
      table: {
        defaultValue: { summary: "bodyMedium" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    children: "こんにちは、世界！",
    variant: "bodyMedium",
  },
  render: (args) => <Component {...args} />,
};

export const Behavior: Story = {
  args: {
    children: "テキストコンポーネント",
  },
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

// タイポグラフィスケールのサンプル
export const TypographyScale: Story = {
  render: () => (
    <YStack space="$4" padding="$4">
      <Component variant="displayLarge">ディスプレイ Large</Component>
      <Component variant="displayMedium">ディスプレイ Medium</Component>
      <Component variant="displaySmall">ディスプレイ Small</Component>

      <Component variant="headlineLarge">見出し Large</Component>
      <Component variant="headlineMedium">見出し Medium</Component>
      <Component variant="headlineSmall">見出し Small</Component>

      <Component variant="titleLarge">タイトル Large</Component>
      <Component variant="titleMedium">タイトル Medium</Component>
      <Component variant="titleSmall">タイトル Small</Component>

      <Component variant="bodyLarge">
        本文 Large - Material Design
        3のタイポグラフィシステムは、読みやすさと使いやすさを重視しています。
      </Component>
      <Component variant="bodyMedium">
        本文 Medium -
        各テキストスタイルは、フォントサイズ、行の高さ、文字間隔などが最適化されています。
      </Component>
      <Component variant="bodySmall">
        本文 Small -
        小さなテキストでも読みやすさを確保するために適切な設定がされています。
      </Component>

      <Component variant="labelLarge">ラベル Large</Component>
      <Component variant="labelMedium">ラベル Medium</Component>
      <Component variant="labelSmall">ラベル Small</Component>
    </YStack>
  ),
};

// 色のカスタマイズ例
export const CustomColors: Story = {
  render: () => (
    <YStack space="$2" padding="$4">
      <Component color="$primary" variant="titleLarge">
        プライマリカラーのテキスト
      </Component>
      <Component color="$secondary" variant="titleMedium">
        セカンダリカラーのテキスト
      </Component>
      <Component color="$error" variant="titleSmall">
        エラーカラーのテキスト
      </Component>
      <Component color="$onPrimaryContainer" variant="bodyLarge">
        コンテナ上のテキスト
      </Component>
    </YStack>
  ),
};

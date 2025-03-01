import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Info } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button, YStack } from "tamagui";
import { Dialog as Component } from ".";
import { Text } from "../Text";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的なダイアログの引数
const basicArgs: Story["args"] = {
  headline: "ダイアログのタイトル",
  supportingText:
    "これはダイアログの説明文です。ユーザーに情報を提供したり、アクションを促したりします。",
  actions: [
    {
      label: "キャンセル",
      onClick: () => console.log("キャンセルがクリックされました"),
      variant: "text",
    },
    {
      label: "確認",
      onClick: () => console.log("確認がクリックされました"),
      variant: "filled",
    },
  ],
};

// アイコン付きダイアログの引数
const withIconArgs: Story["args"] = {
  ...basicArgs,
  icon: <Info size={32} color="#6750A4" />,
};

// フルスクリーンダイアログの引数
const fullScreenArgs: Story["args"] = {
  ...basicArgs,
  variant: "fullScreen",
};

// ダイアログを開くためのラッパーコンポーネント
const DialogWrapper = ({ args }: { args: Story["args"] }) => {
  const [open, setOpen] = useState(false);
  return (
    <Component
      {...args}
      open={open}
      onOpenChange={setOpen}
      actions={args?.actions || []}
      content={
        <Text>
          これはダイアログの説明文です。ユーザーに情報を提供したり、アクションを促したりします。
        </Text>
      }
    >
      <Button>ダイアログを開く</Button>
    </Component>
  );
};

// 基本的なダイアログ
export const Basic: Story = {
  args: basicArgs,
  render: (args) => <DialogWrapper args={args} />,
};

// アイコン付きダイアログ
export const WithIcon: Story = {
  args: withIconArgs,
  render: (args) => <DialogWrapper args={args} />,
};

// フルスクリーンダイアログ
export const FullScreen: Story = {
  args: fullScreenArgs,
  render: (args) => <DialogWrapper args={args} />,
};

// 動作確認用のテスト
export const Behavior: Story = {
  args: basicArgs,
  render: (args) => <DialogWrapper args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

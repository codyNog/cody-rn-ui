import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { Button, Text, YStack } from "tamagui";
import { BottomSheet as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// シンプルなストーリー
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)}>ボトムシートを開く</Button>
        <Component
          open={open}
          onOpenChange={setOpen}
          snapPoints={[25, 50, 80]}
          content={
            <YStack space="$4" padding="$4">
              <Text fontSize={18} fontWeight="500">
                ボトムシートのコンテンツ
              </Text>
              <Text>
                これはボトムシートのコンテンツです。ユーザーに情報を提供したり、アクションを促したりします。
              </Text>
              <Button>アクション</Button>
            </YStack>
          }
        />
      </>
    );
  },
};

// カスタムスナップポイント
export const CustomSnapPoints: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)}>カスタムスナップポイント</Button>
        <Component
          open={open}
          onOpenChange={setOpen}
          snapPoints={[10, 40, 90]}
          content={
            <YStack space="$4" padding="$4">
              <Text fontSize={18} fontWeight="500">
                カスタムスナップポイント
              </Text>
              <Text>
                このボトムシートは [10, 40, 90]
                のカスタムスナップポイントを使用しています。
              </Text>
              <Button>アクション</Button>
            </YStack>
          }
        />
      </>
    );
  },
};

// モーダルなし
export const NonModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)}>モーダルなし</Button>
        <Component
          open={open}
          onOpenChange={setOpen}
          modal={false}
          snapPoints={[25, 50, 80]}
          content={
            <YStack space="$4" padding="$4">
              <Text fontSize={18} fontWeight="500">
                モーダルなしのボトムシート
              </Text>
              <Text>
                このボトムシートはモーダルではないため、背景をタップしても閉じません。
              </Text>
              <Button>アクション</Button>
            </YStack>
          }
        />
      </>
    );
  },
};

// 動作確認用のテスト
export const Behavior: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)}>動作テスト</Button>
        <Component
          open={open}
          onOpenChange={setOpen}
          snapPoints={[25, 50, 80]}
          content={
            <YStack space="$4" padding="$4">
              <Text fontSize={18} fontWeight="500">
                動作テスト用ボトムシート
              </Text>
              <Text>このボトムシートは動作テスト用です。</Text>
              <Button>アクション</Button>
            </YStack>
          }
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

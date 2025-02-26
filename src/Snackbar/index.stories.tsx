import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, YStack } from "tamagui";
import { Snackbar } from ".";

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    message: "メッセージが表示されました",
  },
};

export const WithAction: Story = {
  args: {
    message: "メッセージが表示されました",
    action: {
      label: "アクション",
      onPress: () => console.log("アクションが押されました"),
    },
  },
};

export const WithCloseButton: Story = {
  args: {
    message: "メッセージが表示されました",
    hasCloseButton: true,
    onClose: () => console.log("閉じるボタンが押されました"),
  },
};

export const WithActionAndCloseButton: Story = {
  args: {
    message: "メッセージが表示されました",
    action: {
      label: "アクション",
      onPress: () => console.log("アクションが押されました"),
    },
    hasCloseButton: true,
    onClose: () => console.log("閉じるボタンが押されました"),
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <YStack space="$4" padding="$4" alignItems="center">
        <Button onPress={() => setVisible(true)}>スナックバーを表示</Button>
        {visible && (
          <Snackbar
            message="これはスナックバーです"
            action={{
              label: "了解",
              onPress: () => setVisible(false),
            }}
            hasCloseButton
            onClose={() => setVisible(false)}
          />
        )}
      </YStack>
    );
  },
};

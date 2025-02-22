import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Chat } from ".";
import { getCanvas } from "../libs/storybook";
import { useState } from "react";
import { View } from "../View";

const meta: Meta<typeof Chat.Message> = {
  component: Chat.Message,
};

export default meta;

type Story = StoryObj<typeof Chat.Message>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Chat.Wrapper>
        <Chat.Content>
          <Chat.Message type="received">こんにちは</Chat.Message>
          <Chat.Message type="sent">こんにちは</Chat.Message>
          <Chat.Actions
            actions={[
              {
                label: "送信",
                onPress: () => {},
                children: "送信",
              },
              {
                label: "添付",
                onPress: () => {},
                children: "添付",
              },
              {
                label: "カメラ",
                onPress: () => {},
                children: "カメラ",
              },
            ]}
          />
        </Chat.Content>
        <Chat.Input
          value={value}
          onChange={setValue}
          onSubmit={() => console.log("submit")}
        />
      </Chat.Wrapper>
    );
  },
};

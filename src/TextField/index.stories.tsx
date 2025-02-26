import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { TextField as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {};

export const Default: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4">
        <Component
          {...args}
          value={value}
          onChangeText={setValue}
          label="label"
        />
        <Component
          {...args}
          value={value}
          onChangeText={setValue}
          label="label"
          variant="outlined"
        />
        <Component
          {...args}
          value={value}
          onChangeText={setValue}
          label="label"
          variant="outlined"
          maxLength={100}
        />
      </YStack>
    );
  },
};

export const Behavior: Story = {
  args,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

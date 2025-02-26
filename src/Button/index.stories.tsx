import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { Button as Component } from ".";
import { getCanvas } from "../libs/storybook";
import { YStack } from "tamagui";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <YStack space="$4" padding="$4">
      <Component {...args} variant="filled">
        Filled
      </Component>
      <Component {...args} variant="outlined">
        Outlined
      </Component>
      <Component {...args} variant="tonal">
        Tonal
      </Component>
      <Component {...args} variant="elevated">
        Elevated
      </Component>
      <Component {...args} variant="text">
        Text
      </Component>
      <Component {...args} variant="filled" disabled>
        disabled
      </Component>
    </YStack>
  ),
};

export const Behavior: Story = {
  args: {},
  render: (args) => <Component {...args}>Push</Component>,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

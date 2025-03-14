import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { YStack, XStack } from "tamagui";
import { IconButton as Component } from ".";
import { getCanvas } from "../libs/storybook";
import { Home, Settings, Menu, Heart } from "../icons";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <YStack space="$4" padding="$4">
      <Component {...args} icon={<Home />} variant="standard" />
      <Component {...args} icon={<Settings />} variant="outlined" />
      <Component {...args} icon={<Menu />} variant="filled" />
      <Component {...args} icon={<Heart />} variant="tonal" />
      <Component {...args} icon={<Home />} variant="standard" disabled />
    </YStack>
  ),
};

export const Toggle: Story = {
  args: {},
  render: (args) => (
    <YStack space="$4" padding="$4">
      <XStack space="$4">
        <Component {...args} icon={<Home />} variant="standard" />
        <Component {...args} icon={<Home />} variant="standard" isSelected />
      </XStack>
      <XStack space="$4">
        <Component {...args} icon={<Settings />} variant="outlined" />
        <Component
          {...args}
          icon={<Settings />}
          variant="outlined"
          isSelected
        />
      </XStack>
      <XStack space="$4">
        <Component {...args} icon={<Menu />} variant="filled" />
        <Component {...args} icon={<Menu />} variant="filled" isSelected />
      </XStack>
      <XStack space="$4">
        <Component {...args} icon={<Heart />} variant="tonal" />
        <Component {...args} icon={<Heart />} variant="tonal" isSelected />
      </XStack>
    </YStack>
  ),
};

export const Behavior: Story = {
  args: {
    icon: <Heart />,
    variant: "filled",
  },
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Home, Plus, Settings, Star } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";
import { Fab, FabButton, FabContainer } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof FabButton> = {
  component: FabButton,
};

export default meta;

type Story = StoryObj<typeof FabButton>;

export const Default: Story = {
  args: {
    icon: <Plus color="$primary" size={24} />,
  },
  render: (args) => (
    <YStack space="$8" padding="$4">
      <YStack space="$4">
        <FabButton {...args} />
      </YStack>
    </YStack>
  ),
};

export const Sizes: Story = {
  args: {},
  render: (args) => (
    <YStack space="$8" padding="$4">
      <YStack space="$4">
        <FabButton
          {...args}
          size="small"
          icon={<Plus color="$primary" size={18} />}
        />
        <FabButton
          {...args}
          size="regular"
          icon={<Plus color="$primary" size={24} />}
        />
      </YStack>
    </YStack>
  ),
};

export const Colors: Story = {
  args: {},
  render: (args) => (
    <YStack space="$8" padding="$4">
      <YStack space="$4">
        <FabButton
          {...args}
          color="primary"
          icon={<Plus color="$primary" size={24} />}
        />
        <FabButton
          {...args}
          color="secondary"
          icon={<Star color="$secondary" size={24} />}
        />
        <FabButton
          {...args}
          color="tertiary"
          icon={<Settings color="$tertiary" size={24} />}
        />
        <FabButton
          {...args}
          color="surface"
          icon={<Home color="$onSurface" size={24} />}
        />
      </YStack>
    </YStack>
  ),
};

export const Extended: Story = {
  args: {
    icon: <Home color="$primary" size={24} />,
    label: "ホーム",
  },
  render: (args) => (
    <YStack space="$8" padding="$4">
      <YStack space="$4">
        <FabButton {...args} />
      </YStack>
    </YStack>
  ),
};

export const Disabled: Story = {
  args: {
    icon: <Plus color="$primary" size={24} />,
    disabled: true,
  },
  render: (args) => (
    <YStack space="$8" padding="$4">
      <YStack space="$4">
        <FabButton {...args} />
        <FabButton {...args} label="無効" />
      </YStack>
    </YStack>
  ),
};

export const WithContainer: Story = {
  args: {
    icon: <Plus color="$primary" size={24} />,
  },
  render: (args) => (
    <YStack height={300} position="relative">
      <FabContainer>
        <FabButton {...args} />
      </FabContainer>
    </YStack>
  ),
};

export const Behavior: Story = {
  args: {
    icon: <Plus color="$primary" size={24} />,
  },
  render: (args) => <FabButton {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

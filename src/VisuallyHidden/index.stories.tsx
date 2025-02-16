import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { VisuallyHidden as Component } from ".";
import { Text } from "../Text";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: { children: <Text>"Hello, World!"</Text> },
  render: (args) => <Component {...args} />,
};

export const Behavior: Story = {
  args: {},
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

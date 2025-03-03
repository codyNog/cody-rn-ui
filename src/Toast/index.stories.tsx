import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { Toast as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: { children: "Hello, World!" },
  render: (args) => <Component {...args} duration={100} />,
};

export const Behavior: Story = {
  args: {},
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Avatar as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  src: "https://avatars.githubusercontent.com/u/12592949",
};

export const Default: Story = {
  args,
  render: (args) => <Component {...args} />,
};

export const Behavior: Story = {
  args,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

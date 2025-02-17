import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Tabs as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  tabs: [
    { value: "Tab 1", children: "children 1", label: "Tab 1" },
    { value: "Tab 2", children: "children 2", label: "Tab 2" },
    { value: "Tab 3", children: "children 3", label: "Tab 3" },
  ],
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

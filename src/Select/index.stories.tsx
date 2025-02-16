import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { Select as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  options: [
    {
      group: "Language",
      options: [
        { label: "日本語", value: "ja" },
        { label: "English", value: "en" },
      ],
    },
    {
      group: "Fruit",
      options: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Orange", value: "orange" },
      ],
    },
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

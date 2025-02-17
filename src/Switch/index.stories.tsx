import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/test";
import { useState } from "react";
import { Switch as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;
const args: Story["args"] = {
  checked: false,
};

export const Default: Story = {
  args,
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Component {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
};

export const Behavior: Story = {
  args: {},
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { type ComponentProps, useCallback, useState } from "react";
import { CheckboxList as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const parent: ComponentProps<typeof Component>["parent"] = {
  id: "parent",
  label: "Parent",
};

const checks: ComponentProps<typeof Component>["checks"] = [
  { id: "check1", label: "Check 1" },
  { id: "check2", label: "Check 2" },
];

export const Default: Story = {
  args: { parent, checks },

  render: (args) => {
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    return (
      <Component
        {...args}
        checkedIds={checkedIds}
        onChangeChecks={setCheckedIds}
      />
    );
  },
};

export const Behavior: Story = {
  args: { parent, checks },
  render: (args) => {
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    return (
      <Component
        {...args}
        checkedIds={checkedIds}
        onChangeChecks={setCheckedIds}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

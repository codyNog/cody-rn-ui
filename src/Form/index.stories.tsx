import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { XStack, YStack } from "tamagui";
import { Form as Component } from ".";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Select } from "../Select";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {},
  render: () => {
    const [type, settType] = useState("");
    return (
      <Component>
        <YStack gap="$4">
          <XStack gap="$2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="type this" />
          </XStack>
          <XStack gap="$2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" placeholder="type this" />
          </XStack>
          <XStack gap="$2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="type this" />
          </XStack>
          <XStack gap="$2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              value={type}
              options={[
                { value: "1", label: "Type 1" },
                { value: "2", label: "Type 2" },
              ]}
              onChange={settType}
            />
          </XStack>
          <Component.Trigger asChild>
            <Button>Submit</Button>
          </Component.Trigger>
        </YStack>
      </Component>
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

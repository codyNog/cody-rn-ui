import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { YStack } from "tamagui";
import { TextField as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {};

export const Default: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4">
        <Component {...args} value={value} onChange={setValue} label="label" />
        <Component
          {...args}
          value={value}
          onChange={setValue}
          label="label"
          variant="outlined"
        />
        <Component
          {...args}
          value={value}
          onChange={setValue}
          label="label"
          variant="filled"
          maxLength={100}
        />
      </YStack>
    );
  },
};

export const Multiline: Story = {
  args,
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <YStack gap="$4">
        <Component
          {...args}
          value={value}
          onChange={setValue}
          label="マルチライン入力"
          multiline={true}
          numberOfLines={3}
        />
        <Component
          {...args}
          value={value}
          onChange={setValue}
          label="マルチライン入力 (outlined)"
          variant="filled"
          multiline={true}
          numberOfLines={3}
        />
        <Component
          {...args}
          value={value}
          onChange={setValue}
          label="マルチライン入力 (with maxLength)"
          multiline={true}
          numberOfLines={4}
          maxLength={200}
        />
      </YStack>
    );
  },
};

export const Behavior: Story = {
  args,
  render: (args) => <Component {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

export const FilledWithContent: Story = {
  args,
  render: (args) => {
    const [singleLineValue, setSingleLineValue] = useState(
      "これはシングルラインのテキストです",
    );
    const [multiLineValue, setMultiLineValue] = useState(
      "これはマルチラインのテキストです。\n複数行にわたるテキストを入力できます。\nMaterial Design 3のガイドラインに従っています。",
    );

    return (
      <YStack gap="$4">
        <Component
          {...args}
          value={singleLineValue}
          onChange={setSingleLineValue}
          label="シングルライン"
        />
        <Component
          {...args}
          value={multiLineValue}
          onChange={setMultiLineValue}
          label="マルチライン"
          multiline={true}
          numberOfLines={4}
        />
      </YStack>
    );
  },
};

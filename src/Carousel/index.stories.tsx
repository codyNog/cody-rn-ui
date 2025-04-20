import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Carousel as Component } from ".";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

const args: Story["args"] = {
  items: [
    {
      id: "1",
      src: "https://placehold.co/600x400",
      alt: "Image 1",
    },
    {
      id: "2",
      src: "https://placehold.co/600x400",
      alt: "Image 2",
    },
    {
      id: "3",
      src: "https://placehold.co/600x400",
      alt: "Image 3",
    },
    {
      id: "4",
      src: "https://placehold.co/600x400",
      alt: "Image 4",
    },
    {
      id: "5",
      src: "https://placehold.co/600x400",
      alt: "Image 5",
    },
    {
      id: "6",
      src: "https://placehold.co/600x400",
      alt: "Image 6",
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

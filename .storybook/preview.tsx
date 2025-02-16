import type { Preview } from "@storybook/react";
import React from "react";
import { UIProvider } from "../src/Provider";

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <UIProvider>
        <Story />
      </UIProvider>
    ),
  ],

  tags: ["autodocs"],
};

export default preview;

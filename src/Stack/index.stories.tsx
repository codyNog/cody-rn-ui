import type { Meta } from "@storybook/react";
import { XStack, YStack } from ".";
import { Text } from "../Text";

const meta: Meta = {
  component: YStack,
};

export default meta;

const Component = () => (
  <YStack gap="$2">
    <XStack gap="$4">
      <Text>Hello</Text>
      <Text>World</Text>
    </XStack>
    <XStack>
      <Text>Goodbye</Text>
      <Text>World</Text>
    </XStack>
  </YStack>
);

export const Default = {
  args: {},
  render: Component,
};

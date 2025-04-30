import type { Meta, StoryObj } from "@storybook/react";
import { StyleSheet, View, Text } from "react-native";
import {
  AlertCircle,
  Check,
  File,
  Folder,
  Heart,
  Star,
  X,
} from "@tamagui/lucide-icons";
import { Button } from "../Button";
import { Card } from "../Card";
import { Checkbox } from "../Checkbox";
import { Chip } from "../Chip";
import { IconButton } from "../IconButton";
import { ListItem } from "../ListItem";
import { Ripple } from "./index";

const meta = {
  component: Ripple,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Ripple>;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    padding: 20,
    gap: 16,
    alignItems: "flex-start",
  },
});

/**
 * ButtonコンポーネントでのRippleエフェクトの例
 */
export const WithButton: Story = {
  args: {
    children: null,
  },
  render: () => (
    <View style={styles.container}>
      <Button variant="filled">Filled Button</Button>
      <Button variant="outlined">Outlined Button</Button>
    </View>
  ),
};

/**
 * IconButtonコンポーネントでのRippleエフェクトの例
 */
export const WithIconButton: Story = {
  args: {
    children: null,
  },
  render: () => (
    <View style={styles.container}>
      <IconButton icon={<Heart />} aria-label="Like" />
      <IconButton icon={<Star />} variant="filled" aria-label="Star" />
      <IconButton icon={<Check />} variant="tonal" aria-label="Check" />
      <IconButton icon={<X />} variant="outlined" aria-label="Close" />
    </View>
  ),
};

/**
 * ChipコンポーネントでのRippleエフェクトの例
 */
export const WithChip: Story = {
  args: {
    children: null,
  },
  render: () => (
    <View style={styles.container}>
      <Chip
        variant="assist"
        leadingIcon={<IconButton icon={<AlertCircle />} />}
      >
        Assist Chip
      </Chip>
      <Chip variant="filter" selected>
        Filter Chip
      </Chip>
      <Chip variant="input" trailingIcon={<IconButton icon={<X />} />}>
        Input Chip
      </Chip>
      <Chip variant="suggestion">Suggestion Chip</Chip>
    </View>
  ),
};

/**
 * ListItemコンポーネントでのRippleエフェクトの例
 */
export const WithListItem: Story = {
  args: {
    children: null,
  },
  render: () => (
    <View style={{ width: 300 }}>
      <ListItem
        headline="List Item 1"
        supportingText="Supporting text"
        leading={<IconButton icon={<Folder />} aria-label="Folder" />}
        trailing={<Checkbox checked />}
        onPress={() => console.log("Pressed Item 1")}
      />
      <ListItem
        headline="List Item 2"
        leading={<IconButton icon={<File />} aria-label="File" />}
        onPress={() => console.log("Pressed Item 2")}
      />
    </View>
  ),
};

/**
 * CardコンポーネントでのRippleエフェクトの例 (Clickable)
 */
export const WithCard: Story = {
  args: {
    children: null,
  },
  render: () => (
    <View style={{ width: 300, gap: 16 }}>
      <Card
        variant="elevated"
        onPress={() => console.log("Elevated Card Pressed")}
        title="Elevated Card"
        subtitle="Clickable"
      >
        <Text>This is the content of the elevated card. Click me!</Text>
      </Card>
      <Card
        variant="outlined"
        onPress={() => console.log("Outlined Card Pressed")}
        title="Outlined Card"
        subtitle="Clickable"
      >
        <Text>This is the content of the outlined card. Click me!</Text>
      </Card>
      <Card
        variant="filled"
        onPress={() => console.log("Filled Card Pressed")}
        title="Filled Card"
        subtitle="Clickable"
      >
        <Text>This is the content of the filled card. Click me!</Text>
      </Card>
    </View>
  ),
};

/**
 * CheckboxコンポーネントでのRippleエフェクトの例
 */
export const WithCheckbox: Story = {
  args: {
    children: null,
  },
  render: () => (
    <View style={styles.container}>
      <Checkbox checked />
      <Checkbox checked={false} />
      <Checkbox checked="indeterminate" />
      <Checkbox checked disabled />
    </View>
  ),
};

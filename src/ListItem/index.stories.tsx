import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { ChevronRight, Home, Mail, Star } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";
import { ListItem as Component } from ".";
import { Avatar } from "../Avatar";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "filled", "elevated"],
      description: "ListItemのバリアント",
    },
    selected: {
      control: "boolean",
      description: "選択状態",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// 基本的なListItem
export const Default: Story = {
  args: {
    headline: "リストアイテム",
    supportingText: "サポートテキスト",
  },
};

// アイコン付きListItem
export const WithLeadingIcon: Story = {
  args: {
    headline: "アイコン付きリストアイテム",
    supportingText: "アイコンが先頭に表示されます",
    leading: <Home size={24} color="$primary" />,
  },
};

// アバター付きListItem
export const WithAvatar: Story = {
  args: {
    headline: "アバター付きリストアイテム",
    supportingText: "アバターが先頭に表示されます",
    leading: <Avatar src="" fallbackInitials="US" size="medium" />,
  },
};

// 末尾にアイコン付きListItem
export const WithTrailingIcon: Story = {
  args: {
    headline: "末尾アイコン付きリストアイテム",
    supportingText: "末尾にアイコンが表示されます",
    trailing: <ChevronRight size={24} color="$onSurfaceVariant" />,
  },
};

// チェックボックス付きListItem
export const WithCheckbox: Story = {
  args: {
    headline: "チェックボックス付きリストアイテム",
    supportingText: "末尾にチェックボックスが表示されます",
    trailing: (
      <Checkbox
        id="list-item-checkbox"
        checked={true}
        style={{ width: "auto" }} // 幅を自動調整
      />
    ),
  },
};

// スイッチ付きListItem
export const WithSwitch: Story = {
  args: {
    headline: "スイッチ付きリストアイテム",
    supportingText: "末尾にスイッチが表示されます",
    trailing: (
      <Switch
        id="list-item-switch"
        checked={true}
        size="$3"
        style={{ width: "auto" }} // 幅を自動調整
      />
    ),
  },
};

// 選択状態のListItem
export const Selected: Story = {
  args: {
    headline: "選択状態のリストアイテム",
    supportingText: "選択されている状態です",
    leading: <Star size={24} color="$primary" />,
    selected: true,
  },
};

// 無効状態のListItem
export const Disabled: Story = {
  args: {
    headline: "無効状態のリストアイテム",
    supportingText: "無効化されている状態です",
    leading: <Mail size={24} color="$onSurfaceVariant" />,
    disabled: true,
  },
};

// 様々なバリアント
export const Variants: Story = {
  render: () => (
    <YStack space="$4" width={300}>
      <Component
        headline="標準のリストアイテム"
        supportingText="バリアント: standard"
        variant="standard"
      />
      <Component
        headline="塗りつぶしのリストアイテム"
        supportingText="バリアント: filled"
        variant="filled"
      />
      <Component
        headline="エレベーテッドのリストアイテム"
        supportingText="バリアント: elevated"
        variant="elevated"
      />
    </YStack>
  ),
};

// インタラクションのテスト
export const Behavior: Story = {
  args: {
    headline: "タップ可能なリストアイテム",
    supportingText: "タップするとコンソールにメッセージが表示されます",
    leading: <Mail size={24} color="$primary" />,
    trailing: <ChevronRight size={24} color="$onSurfaceVariant" />,
    onPress: () => console.log("ListItem pressed"),
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    const listItem = await canvas.findByText("タップ可能なリストアイテム");

    // ListItemをクリック
    await userEvent.click(listItem);

    // 存在確認
    expect(listItem).toBeTruthy();
    expect(
      await canvas.findByText(
        "タップするとコンソールにメッセージが表示されます",
      ),
    ).toBeTruthy();
  },
};

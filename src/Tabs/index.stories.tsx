import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { useState } from "react";
import { Text, View, YStack } from "tamagui";
import { Tabs as Component } from ".";
import { IconSymbol } from "../IconSymbol";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
      description: "タブのバリアント",
      defaultValue: "primary",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

const tabsData = [
  {
    value: "tab1",
    label: "タブ1",
    children: (
      <View padding="$4" alignItems="center">
        <Text>タブ1のコンテンツ</Text>
      </View>
    ),
  },
  {
    value: "tab2",
    label: "タブ2",
    children: (
      <View padding="$4" alignItems="center">
        <Text>タブ2のコンテンツ</Text>
      </View>
    ),
  },
  {
    value: "tab3",
    label: "タブ3",
    children: (
      <View padding="$4" alignItems="center">
        <Text>タブ3のコンテンツ</Text>
      </View>
    ),
  },
];

const args: Story["args"] = {
  tabs: tabsData,
  onValueChange: (value) => console.log(`タブが変更されました: ${value}`),
  variant: "primary",
};

export const Primary: Story = {
  args: {
    ...args,
    variant: "primary",
  },
  render: (args) => <Component {...args} />,
};

export const Secondary: Story = {
  args: {
    ...args,
    variant: "secondary",
  },
  render: (args) => <Component {...args} />,
};

// インタラクティブな例
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState("tab1");

    return (
      <View width={400} height={300}>
        <Component
          tabs={[
            {
              value: "tab1",
              label: "ホーム",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>ホーム画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab2",
              label: "プロフィール",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>プロフィール画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab3",
              label: "設定",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>設定画面のコンテンツ</Text>
                </View>
              ),
            },
          ]}
          defaultValue={activeTab}
          onValueChange={setActiveTab}
        />
      </View>
    );
  },
};

// アイコン付きの例
export const WithIcons: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState("home");

    return (
      <View width={400} height={300}>
        <Component
          tabs={[
            {
              value: "home",
              label: "ホーム",
              icon: (
                <IconSymbol
                  name="house.fill"
                  size={20}
                  color="var(--color-onSurface)"
                />
              ),
              children: (
                <View padding="$4" alignItems="center">
                  <Text>ホーム画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "messages",
              label: "メッセージ",
              icon: (
                <MaterialIcons
                  name="message"
                  size={20}
                  color="var(--color-onSurface)"
                />
              ),
              children: (
                <View padding="$4" alignItems="center">
                  <Text>メッセージ画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "settings",
              label: "設定",
              icon: (
                <MaterialIcons
                  name="settings"
                  size={20}
                  color="var(--color-onSurface)"
                />
              ),
              children: (
                <View padding="$4" alignItems="center">
                  <Text>設定画面のコンテンツ</Text>
                </View>
              ),
            },
          ]}
          defaultValue={activeTab}
          onValueChange={setActiveTab}
        />
      </View>
    );
  },
};

// バリアント比較
export const VariantComparison: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [primaryTab, setPrimaryTab] = useState("tab1");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [secondaryTab, setSecondaryTab] = useState("tab1");

    return (
      <YStack space="$6" width={400}>
        <View>
          <Text fontWeight="500" marginBottom="$2">
            Primary Variant
          </Text>
          <Component
            tabs={tabsData}
            defaultValue={primaryTab}
            onValueChange={setPrimaryTab}
            variant="primary"
          />
        </View>

        <View>
          <Text fontWeight="500" marginBottom="$2">
            Secondary Variant
          </Text>
          <Component
            tabs={tabsData}
            defaultValue={secondaryTab}
            onValueChange={setSecondaryTab}
            variant="secondary"
          />
        </View>
      </YStack>
    );
  },
};

// スクロール可能なタブの例
export const ScrollableTabs: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState("tab1");

    return (
      <View width={400} height={300}>
        <Component
          scrollable
          tabs={[
            {
              value: "tab1",
              label: "ホーム",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>ホーム画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab2",
              label: "プロフィール",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>プロフィール画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab3",
              label: "設定",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>設定画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab4",
              label: "通知",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>通知画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab5",
              label: "メッセージ",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>メッセージ画面のコンテンツ</Text>
                </View>
              ),
            },
            {
              value: "tab6",
              label: "お気に入り",
              children: (
                <View padding="$4" alignItems="center">
                  <Text>お気に入り画面のコンテンツ</Text>
                </View>
              ),
            },
          ]}
          defaultValue={activeTab}
          onValueChange={setActiveTab}
        />
      </View>
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

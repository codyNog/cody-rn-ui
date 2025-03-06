import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Home, MessageCircle, Settings, User } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Text, YStack } from "tamagui";
import { Tabs as Component, TabPanel } from ".";
import type { BadgeVariant } from "../Badge";
import { getCanvas } from "../libs/storybook";

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

// アイコン付きタブアイテム
const tabItemsWithIcons = [
  {
    label: "ホーム",
    value: "home",
    icon: <Home size={20} color="$onSurfaceVariant" />,
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          ホームタブの内容
        </Text>
        <Text>
          Material Design 3のガイドラインに準拠したタブコンポーネントです。
          このタブはホームタブの内容を表示しています。
        </Text>
      </YStack>
    ),
  },
  {
    label: "プロフィール",
    value: "profile",
    icon: <User size={20} color="$onSurfaceVariant" />,
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          プロフィールタブの内容
        </Text>
        <Text>
          ユーザープロフィールに関する情報をここに表示します。
          タブを切り替えると、コンテンツがスムーズに切り替わります。
        </Text>
      </YStack>
    ),
  },
  {
    label: "メッセージ",
    value: "messages",
    icon: <MessageCircle size={20} color="$onSurfaceVariant" />,
    badge: {
      content: "3",
      variant: "small" as BadgeVariant,
      visible: true,
    },
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          メッセージタブの内容
        </Text>
        <Text>
          ユーザーのメッセージやチャット履歴をここに表示します。
          バッジ付きのタブは未読メッセージがあることを示しています。
        </Text>
      </YStack>
    ),
  },
  {
    label: "設定",
    value: "settings",
    icon: <Settings size={20} color="$onSurfaceVariant" />,
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          設定タブの内容
        </Text>
        <Text>
          アプリケーションの設定オプションをここに表示します。
          ユーザーはここで各種設定を変更できます。
        </Text>
      </YStack>
    ),
  },
];

// アイコンなしタブアイテム
const tabItemsWithoutIcons = [
  {
    label: "ホーム",
    value: "home",
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          ホームタブの内容
        </Text>
        <Text>
          アイコンなしのシンプルなタブです。 テキストのみでタブを表示します。
        </Text>
      </YStack>
    ),
  },
  {
    label: "プロフィール",
    value: "profile",
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          プロフィールタブの内容
        </Text>
        <Text>
          アイコンがない場合、タブの高さは自動的に調整されます。
          これにより、よりコンパクトなレイアウトになります。
        </Text>
      </YStack>
    ),
  },
  {
    label: "メッセージ",
    value: "messages",
    badge: {
      content: "3",
      variant: "small" as BadgeVariant,
      visible: true,
    },
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          メッセージタブの内容
        </Text>
        <Text>
          アイコンがなくても、バッジを表示することができます。
          バッジはタブのラベルの右上に表示されます。
        </Text>
      </YStack>
    ),
  },
  {
    label: "設定",
    value: "settings",
    children: (
      <YStack padding="$4" space="$2">
        <Text fontSize="$6" fontWeight="500">
          設定タブの内容
        </Text>
        <Text>
          シンプルなテキストのみのタブは、特に多くのタブがある場合に
          スペースを効率的に使用できます。
        </Text>
      </YStack>
    ),
  },
];

// アイコン付き固定タブのサンプル
export const FixedWithIcons: Story = {
  args: {
    tabs: tabItemsWithIcons,
    defaultValue: "home",
    variant: "fixed",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// アイコンなし固定タブのサンプル
export const FixedWithoutIcons: Story = {
  args: {
    tabs: tabItemsWithoutIcons,
    defaultValue: "home",
    variant: "fixed",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// スクロール可能なタブのサンプル
export const ScrollableWithIcons: Story = {
  args: {
    tabs: tabItemsWithIcons,
    defaultValue: "home",
    variant: "scrollable",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// アイコンなしスクロール可能なタブのサンプル
export const ScrollableWithoutIcons: Story = {
  args: {
    tabs: tabItemsWithoutIcons,
    defaultValue: "home",
    variant: "scrollable",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// セカンダリータブのサンプル
export const SecondaryWithIcons: Story = {
  args: {
    tabs: tabItemsWithIcons,
    defaultValue: "home",
    variant: "secondary",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// アイコンなしセカンダリータブのサンプル
export const SecondaryWithoutIcons: Story = {
  args: {
    tabs: tabItemsWithoutIcons,
    defaultValue: "home",
    variant: "secondary",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// 下部配置のタブのサンプル
export const BottomPosition: Story = {
  args: {
    tabs: tabItemsWithIcons,
    defaultValue: "home",
    position: "bottom",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
};

// TabPanelを使用したカスタムコンテンツのサンプル
export const WithTabPanels: Story = {
  args: {
    tabs: tabItemsWithIcons.map(({ children, ...rest }) => rest), // childrenを除外
    defaultValue: "home",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      >
        <TabPanel value="home">
          <YStack
            padding="$4"
            space="$2"
            backgroundColor="$surfaceContainerLow"
          >
            <Text fontSize="$6" fontWeight="500">
              カスタムホームパネル
            </Text>
            <Text>
              TabPanelコンポーネントを使用して、カスタムコンテンツを表示できます。
              これにより、より柔軟なレイアウトが可能になります。
            </Text>
          </YStack>
        </TabPanel>
        <TabPanel value="profile">
          <YStack
            padding="$4"
            space="$2"
            backgroundColor="$surfaceContainerLow"
          >
            <Text fontSize="$6" fontWeight="500">
              カスタムプロフィールパネル
            </Text>
            <Text>
              各TabPanelには独自のスタイルを適用できます。
              これにより、タブごとに異なるデザインを実現できます。
            </Text>
          </YStack>
        </TabPanel>
        <TabPanel value="messages">
          <YStack
            padding="$4"
            space="$2"
            backgroundColor="$surfaceContainerLow"
          >
            <Text fontSize="$6" fontWeight="500">
              カスタムメッセージパネル
            </Text>
            <Text>
              TabPanelを使用すると、タブの内容を明示的に定義できます。
              これにより、コードの可読性が向上します。
            </Text>
          </YStack>
        </TabPanel>
        <TabPanel value="settings">
          <YStack
            padding="$4"
            space="$2"
            backgroundColor="$surfaceContainerLow"
          >
            <Text fontSize="$6" fontWeight="500">
              カスタム設定パネル
            </Text>
            <Text>
              TabPanelを使用することで、タブの内容を分離して管理できます。
              これにより、コードの保守性が向上します。
            </Text>
          </YStack>
        </TabPanel>
      </Component>
    );
  },
};

// インタラクションテスト
export const Behavior: Story = {
  args: {
    tabs: tabItemsWithIcons,
    defaultValue: "home",
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultValue || "home");
    return (
      <Component
        {...args}
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = getCanvas(canvasElement);
    expect(canvas).toBeTruthy();
  },
};

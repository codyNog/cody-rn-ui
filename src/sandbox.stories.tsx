import type { Meta, StoryObj } from "@storybook/react";
import {
  Bell,
  Home,
  Menu as MenuIcon,
  MessageCircle,
  MoreVertical,
  Search,
  Settings,
  User,
} from "@tamagui/lucide-icons";
import { useState } from "react";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";
import { ScreenLayout } from "./ScreenLayout";
import { Grid } from "./Grid";
import { Button } from "./Button";
import { Card } from "./Card";
import { Chat } from "./Chat";
import { Checkbox } from "./Checkbox";
import { Chip } from "./Chip";
import { Divider } from "./Divider";
import { Form } from "./Form";
import { IconSymbol } from "./IconSymbol";
import { NavigationBar } from "./NavigationBar";
import { NavigationDrawer, type NavigationItem } from "./NavigationDrawer";
import { Select } from "./Select";
import { Tabs } from "./Tabs";
import { TextField } from "./TextField";
import { TopAppBar } from "./TopAppBar";

// アイコンの共通スタイル
const iconProps = { size: 22, color: "$onSurfaceVariant" };

// サンドボックスアプリケーション
const SandboxApp = () => {
  // 状態管理
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("");
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Material Design 3を学ぶ", completed: true },
    { id: 2, text: "Tamaguiコンポーネントを確認する", completed: true },
    { id: 3, text: "サンドボックスアプリを作成する", completed: false },
    { id: 4, text: "コンポーネントライブラリを拡張する", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // TODOの切り替え処理
  const toggleTodo = (id: number) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  // 新しいTODOの追加
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newId = Math.max(0, ...todoItems.map((item) => item.id)) + 1;
    setTodoItems([
      ...todoItems,
      { id: newId, text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  // ナビゲーションドロワーのアイテム
  const drawerItems: NavigationItem[] = [
    {
      key: "home",
      label: "ホーム",
      icon: <Home size={24} />,
      selected: activeTab === "home",
      onPress: () => setActiveTab("home"),
    },
    {
      key: "profile",
      label: "プロフィール",
      icon: <User size={24} />,
      selected: activeTab === "profile",
      onPress: () => setActiveTab("profile"),
    },
    {
      key: "messages",
      label: "メッセージ",
      icon: <MessageCircle size={24} />,
      selected: activeTab === "messages",
      badge: <Text color="$error">3</Text>,
      onPress: () => setActiveTab("messages"),
    },
    {
      key: "settings",
      label: "設定",
      icon: <Settings size={24} />,
      selected: activeTab === "settings",
      onPress: () => setActiveTab("settings"),
    },
    {
      key: "notifications",
      label: "通知",
      icon: <Bell size={24} />,
      onPress: () => console.log("通知が選択されました"),
    },
  ];

  // ナビゲーションバーのアイテム
  const navigationItems = [
    {
      icon: <Home size={24} color="$onSurfaceVariant" />,
      activeIcon: <Home size={24} color="$primary" />,
      label: "ホーム",
      value: "home",
    },
    {
      icon: <User size={24} color="$onSurfaceVariant" />,
      activeIcon: <User size={24} color="$primary" />,
      label: "プロフィール",
      value: "profile",
    },
    {
      icon: <MessageCircle size={24} color="$onSurfaceVariant" />,
      activeIcon: <MessageCircle size={24} color="$primary" />,
      label: "メッセージ",
      value: "messages",
      badge: {
        content: "3",
        variant: "small" as const,
        visible: true,
      },
    },
    {
      icon: <Settings size={24} color="$onSurfaceVariant" />,
      activeIcon: <Settings size={24} color="$primary" />,
      label: "設定",
      value: "settings",
    },
  ];

  // TopAppBarコンポーネント
  const topAppBar = (
    <TopAppBar
      variant="small"
      headline="UIサンドボックス"
      leadingIcon={
        <MenuIcon {...iconProps} onPress={() => setDrawerOpen(true)} />
      }
      trailingIcons={[
        <Search {...iconProps} key="search" />,
        <Bell {...iconProps} key="bell" />,
        <MoreVertical {...iconProps} key="more" />,
      ]}
    />
  );

  // NavigationBarコンポーネント
  const navigationBar = (
    <NavigationBar
      items={navigationItems}
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      variant="standard"
    />
  );

  // タブの設定
  const tabsContent = (
    <Tabs
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
            <ScrollView padding="$4">
              <Grid.Container>
                <YStack space="$4">
                  <Card
                    title="ようこそ"
                    actions={[
                      {
                        label: "詳細",
                        onClick: () => console.log("詳細"),
                        variant: "text",
                      },
                      {
                        label: "開始",
                        onClick: () => console.log("開始"),
                        variant: "filled",
                      },
                    ]}
                  >
                    <Text>
                      このサンドボックスでは、様々なUIコンポーネントを試すことができます。
                      タブを切り替えて、異なるコンポーネントを確認してみましょう。
                    </Text>
                  </Card>

                  <Card
                    title="TODOリスト"
                    actions={[
                      {
                        label: "追加",
                        onClick: addTodo,
                        variant: "filled",
                      },
                    ]}
                  >
                    <YStack space="$2">
                      {todoItems.map((item) => (
                        <XStack key={item.id} alignItems="center" space="$2">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleTodo(item.id)}
                          />
                          <Text
                            textDecorationLine={
                              item.completed ? "line-through" : "none"
                            }
                            opacity={item.completed ? 0.6 : 1}
                          >
                            {item.text}
                          </Text>
                        </XStack>
                      ))}
                      <XStack flex={1} space="$2" marginTop="$2">
                        <TextField
                          label="新しいタスク"
                          value={newTodo}
                          onChange={setNewTodo}
                          flex={1}
                        />
                      </XStack>
                    </YStack>
                  </Card>

                  <Card title="チップ例">
                    <XStack flexWrap="wrap" gap="$2">
                      <Chip>デザイン</Chip>
                      <Chip>開発</Chip>
                      <Chip>UI/UX</Chip>
                      <Chip>React Native</Chip>
                      <Chip>Tamagui</Chip>
                      <Chip>Material Design</Chip>
                    </XStack>
                  </Card>
                </YStack>
              </Grid.Container>
            </ScrollView>
          ),
        },
        {
          value: "profile",
          label: "プロフィール",
          icon: <User size={20} color="var(--color-onSurface)" />,
          children: (
            <ScrollView padding="$4">
              <Grid.Container>
                <YStack space="$4">
                  <Card title="プロフィール情報">
                    <Form>
                      <YStack space="$4">
                        <TextField
                          label="名前"
                          value={formName}
                          onChange={setFormName}
                        />
                        <TextField
                          label="メールアドレス"
                          value={formEmail}
                          onChange={setFormEmail}
                        />
                        <Select
                          label="アカウントタイプ"
                          value={formType}
                          onChange={setFormType}
                          options={[
                            { value: "personal", label: "個人" },
                            { value: "business", label: "ビジネス" },
                            { value: "developer", label: "開発者" },
                          ]}
                        />
                        <Form.Trigger asChild>
                          <Button variant="filled">保存</Button>
                        </Form.Trigger>
                      </YStack>
                    </Form>
                  </Card>
                </YStack>
              </Grid.Container>
            </ScrollView>
          ),
        },
        {
          value: "messages",
          label: "メッセージ",
          icon: <MessageCircle size={20} color="var(--color-onSurface)" />,
          children: (() => {
            const [inputValue, setInputValue] = useState("");
            const [messages, setMessages] = useState([
              {
                id: "1",
                type: "received",
                text: "こんにちは、新しいデザインはどうですか？",
                sender: "Alice",
              },
              {
                id: "2",
                type: "sent",
                text: "良いと思います！いくつか修正点があります。",
              },
              {
                id: "3",
                type: "received",
                text: "プロジェクトの進捗状況を教えてください",
                sender: "Bob",
              },
              {
                id: "4",
                type: "sent",
                text: "予定通り進んでいます。来週までに完了予定です。",
              },
              {
                id: "5",
                type: "received",
                text: "新しいコンポーネントのレビューをお願いします",
                sender: "Charlie",
              },
            ]);

            const handleSubmit = () => {
              if (!inputValue.trim()) return;

              // メッセージを追加
              setMessages([
                ...messages,
                { id: `sent-${Date.now()}`, type: "sent", text: inputValue },
              ]);

              // 入力をクリア
              setInputValue("");

              // 自動返信（デモ用）
              setTimeout(() => {
                const senders = ["Alice", "Bob", "Charlie"];
                const randomSender =
                  senders[Math.floor(Math.random() * senders.length)];
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `recv-${Date.now()}`,
                    type: "received",
                    text: `「${inputValue}」についてもう少し詳しく教えてください。`,
                    sender: randomSender,
                  },
                ]);
              }, 1000);
            };

            return (
              <Grid.Container>
                <Chat.Wrapper>
                  <Chat.Content>
                    {messages.map((msg) => (
                      <YStack key={msg.id} space="$1">
                        {msg.type === "received" && (
                          <Text fontSize="$1" paddingLeft="$3" opacity={0.7}>
                            {msg.sender}
                          </Text>
                        )}
                        <Chat.Message type={msg.type as "sent" | "received"}>
                          {msg.text}
                        </Chat.Message>
                      </YStack>
                    ))}
                    <Chat.Actions
                      actions={[
                        {
                          label: "添付",
                          onPress: () => console.log("添付ファイル"),
                          children: "添付",
                        },
                        {
                          label: "カメラ",
                          onPress: () => console.log("カメラ"),
                          children: "カメラ",
                        },
                      ]}
                    />
                  </Chat.Content>
                  <Chat.Input
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleSubmit}
                  />
                </Chat.Wrapper>
              </Grid.Container>
            );
          })(),
        },
        {
          value: "settings",
          label: "設定",
          icon: <Settings size={20} color="var(--color-onSurface)" />,
          children: (
            <ScrollView padding="$4">
              <Grid.Container>
                <YStack space="$4">
                  <Card title="アプリ設定">
                    <YStack space="$3">
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text>ダークモード</Text>
                        <Checkbox />
                      </XStack>
                      <Divider />
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text>通知</Text>
                        <Checkbox defaultChecked />
                      </XStack>
                      <Divider />
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text>データの同期</Text>
                        <Checkbox />
                      </XStack>
                    </YStack>
                  </Card>

                  <Card title="アカウント設定">
                    <YStack space="$3">
                      <Button variant="outlined" icon={<User size={18} />}>
                        プロフィール編集
                      </Button>
                      <Button variant="outlined" icon={<Bell size={18} />}>
                        通知設定
                      </Button>
                      <Button variant="outlined" icon={<Settings size={18} />}>
                        詳細設定
                      </Button>
                    </YStack>
                  </Card>
                </YStack>
              </Grid.Container>
            </ScrollView>
          ),
        },
      ]}
      defaultValue={activeTab}
      onValueChange={setActiveTab}
    />
  );

  // カスタムヘッダー
  const drawerHeader = (
    <YStack padding="$4" gap="$2">
      <Text fontSize={22} fontWeight="500" color="$onSurface">
        UI コンポーネント
      </Text>
      <Text fontSize={14} color="$onSurfaceVariant">
        Material Design 3
      </Text>
    </YStack>
  );

  return (
    <>
      <ScreenLayout
        navigationDrawer={
          <NavigationDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            items={drawerItems}
            header={drawerHeader}
            closeOnSelect={true}
          />
        }
        topAppBar={topAppBar}
        navigationBar={navigationBar}
      >
        <ScrollView flex={1}>{tabsContent}</ScrollView>
      </ScreenLayout>
    </>
  );
};

// Storybookのメタデータ
const meta: Meta = {
  title: "Sandbox/FullscreenApp",
  parameters: {
    layout: "fullscreen",
    docs: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

// サンドボックスアプリケーションのストーリー
export const SandboxApplication: Story = {
  render: () => <SandboxApp />,
};

// Gridレイアウトのテストストーリー
export const GridLayoutTest: Story = {
  render: () => (
    <YStack gap="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        Gridレイアウトテスト
      </Text>
      <Text>
        Containerが画面中央に表示されるようになりました。
        ブラウザのサイズを変更して、様々な画面幅でのレイアウトを確認してください。
      </Text>

      {/* 基本的なグリッドレイアウト */}
      <Text fontSize="$5" fontWeight="bold">
        基本レイアウト
      </Text>
      <Grid.Container backgroundColor="$surfaceVariant" padding="$4">
        <Grid.Row>
          <Grid.Column span={6}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">Column 1 (span=6)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={6}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">Column 2 (span=6)</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>

      {/* 3カラムレイアウト */}
      <Text fontSize="$5" fontWeight="bold">
        3カラムレイアウト
      </Text>
      <Grid.Container backgroundColor="$surfaceVariant" padding="$4">
        <Grid.Row>
          <Grid.Column span={4}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">Column 1 (span=4)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={4}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">Column 2 (span=4)</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={4}>
            <View backgroundColor="$tertiary" padding="$4">
              <Text color="$onTertiary">Column 3 (span=4)</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>

      {/* レスポンシブレイアウト */}
      <Text fontSize="$5" fontWeight="bold">
        レスポンシブレイアウト
      </Text>
      <Grid.Container backgroundColor="$surfaceVariant" padding="$4">
        <Grid.Row>
          <Grid.Column span={12} sm={6} md={4} lg={3}>
            <View backgroundColor="$primary" padding="$4">
              <Text color="$onPrimary">レスポンシブカラム</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={12} sm={6} md={4} lg={3}>
            <View backgroundColor="$secondary" padding="$4">
              <Text color="$onSecondary">レスポンシブカラム</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={12} sm={6} md={4} lg={3}>
            <View backgroundColor="$tertiary" padding="$4">
              <Text color="$onTertiary">レスポンシブカラム</Text>
            </View>
          </Grid.Column>
          <Grid.Column span={12} sm={6} md={12} lg={3}>
            <View backgroundColor="$error" padding="$4">
              <Text color="$onError">レスポンシブカラム</Text>
            </View>
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>
    </YStack>
  ),
};

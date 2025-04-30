import type { Meta, StoryObj } from "@storybook/react";
import {
  // useTheme as useTamaguiTheme を削除し、useThemeName を追加
  ScrollView,
  Text,
  View,
  XStack,
  YStack,
  useThemeName,
} from "tamagui";
import { type ColorScheme, createMaterialTokens } from "../theme"; // ColorScheme 型をインポート、パスを修正

// カラーパレットを表示するコンポーネント
const ColorPalette = ({
  title,
  colors,
}: { title: string; colors: ColorScheme }) => {
  // 型を ColorScheme に変更
  return (
    <YStack
      space="$3"
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
    >
      <Text fontSize="$6" fontWeight="bold" color="$onBackground">
        {title}
      </Text>
      <YStack space="$2">
        {Object.entries(colors).map(([name, hex]) => (
          <XStack key={name} alignItems="center" space="$3">
            <View
              width={40}
              height={40}
              backgroundColor={hex}
              borderRadius="$2"
              borderWidth={1}
              borderColor="$outlineVariant"
            />
            <YStack flex={1}>
              <Text fontSize="$3" fontWeight="500" color="$onSurface">
                ${name}
              </Text>
              <Text fontSize="$2" color="$onSurfaceVariant">
                {hex}
              </Text>
            </YStack>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
};

// Storybookのストーリーコンポーネント
const ThemeDisplay = () => {
  // Storybookのグローバルからキーカラーを取得（デフォルトはMD3の紫）
  // Storybookのコンテキストにアクセスする方法がないため、ここではデフォルトを使用
  // 実際のStorybook環境では context.globals.keyColor を使う想定
  const keyColor = "#6750A4";
  const { colorScheme } = createMaterialTokens(keyColor);

  // 現在のTamaguiテーマ名（ライト/ダーク）を取得
  const themeName = useThemeName();

  // 表示するカラースキームを選択
  const displayScheme =
    themeName === "custom_dark" ? colorScheme.dark : colorScheme.light;
  const themeMode = themeName === "custom_dark" ? "Dark" : "Light";

  return (
    <ScrollView flex={1} padding="$4" backgroundColor="$background">
      <YStack space="$5">
        <Text fontSize="$7" fontWeight="bold" color="$onBackground">
          Material Design 3 Colors ({themeMode} Mode)
        </Text>
        <ColorPalette title="Color Scheme" colors={displayScheme} />
      </YStack>
    </ScrollView>
  );
};

// Storybookのメタデータ
const meta: Meta<typeof ThemeDisplay> = {
  title: "Theme/ColorPalette",
  component: ThemeDisplay,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Storybookのストーリー
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

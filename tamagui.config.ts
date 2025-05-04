import { createAnimations } from "@tamagui/animations-moti";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui, createFont } from "tamagui"; // createFont をインポート

const animations = createAnimations({
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

// フォントの設定
// アプリケーション側で Noto Sans が提供されることを想定
const headingFont = createFont({
  family: "NotoSansJP-Regular", // デフォルトフォントを NotoSansJP-Regular に変更
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 30,
    9: 36,
    10: 48,
    true: 16, // デフォルトサイズ
  },
  lineHeight: {
    1: 17,
    2: 20,
    3: 22,
    4: 23,
    5: 25,
    6: 28,
    7: 32,
    8: 40,
    9: 50,
    10: 66,
    true: 23, // デフォルト行の高さ
  },
  weight: {
    1: "300",
    3: "400",
    4: "500", // デフォルトウェイト
    5: "600",
    7: "700",
    9: "900",
    true: "500",
  },
  letterSpacing: {
    1: 0,
    2: -0.5,
    3: -0.75,
    4: -1, // デフォルト文字間隔
    5: -1.5,
    6: -2,
    7: -2.5,
    8: -3,
    9: -3.5,
    10: -4,
    true: -1,
  },
  // 他のフォントスタイル（イタリックなど）が必要な場合はここに追加
});

// body フォントも同様に設定（heading と同じ設定にするか、必要に応じて調整）
const bodyFont = headingFont;

// Tamaguiの設定
const config = createTamagui({
  defaultTheme: "light",
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens,
  // Webブラウザ環境での設定
  settings: {
    allowedStyleValues: "somewhat-strict",
    autocompleteSpecificTokens: true,
    // Webブラウザ環境でのアニメーション設定
    disableSSR: true,
    disableRootThemeClass: true,
  },
  animations,
});

export type AppConfig = typeof config;
export default config;

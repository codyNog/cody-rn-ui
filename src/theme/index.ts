import {
  type TonalPalette,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";
// createInterFont は不要になる
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens as tamaguiTokens } from "@tamagui/themes"; // tamaguiTokens を再度インポート
// GenericFont は不要になったので削除
// createFont をインポートに追加
import { createTamagui, createTokens, createFont } from "tamagui";

// キーカラーからMaterial Design 3のテーマを生成する関数
export function generateMaterialTheme(
  sourceColorHex: string,
): MaterialColorScheme {
  // 16進数カラーコードをARGBに変換
  const sourceColor = argbFromHex(sourceColorHex);

  // Material Color Utilitiesを使用してテーマを生成
  const theme = themeFromSourceColor(sourceColor);

  // パレットを取得
  const palettes = theme.palettes;

  const surface = (mode: "light" | "dark") => {
    if (mode === "light") {
      return {
        // サーフェスエレベーション（MD3ではトーンを使用してエレベーションを表現）
        surfaceDim: hexFromArgb(palettes.neutral.tone(87)),
        // Material Design 3の追加サーフェスカラー
        surfaceBright: hexFromArgb(palettes.neutral.tone(98)),
        surfaceContainerLowest: hexFromArgb(palettes.neutral.tone(100)),
        surfaceContainer: hexFromArgb(palettes.neutral.tone(94)),
        surfaceContainerLow: hexFromArgb(palettes.neutral.tone(96)),
        surfaceContainerHigh: hexFromArgb(palettes.neutral.tone(92)),
        surfaceContainerHighest: hexFromArgb(palettes.neutral.tone(90)),
      };
    }

    return {
      // サーフェスエレベーション（ダークモードでは異なるトーンを使用）
      surfaceDim: hexFromArgb(palettes.neutral.tone(6)),
      // Material Design 3の追加サーフェスカラー（ダークモード）
      surfaceBright: hexFromArgb(palettes.neutral.tone(24)),
      surfaceContainerLowest: hexFromArgb(palettes.neutral.tone(4)),
      surfaceContainer: hexFromArgb(palettes.neutral.tone(12)),
      surfaceContainerLow: hexFromArgb(palettes.neutral.tone(10)),
      surfaceContainerHigh: hexFromArgb(palettes.neutral.tone(17)),
      surfaceContainerHighest: hexFromArgb(palettes.neutral.tone(22)),
    };
  };

  const scheme = (mode: "light" | "dark") => {
    return {
      // ベースカラー
      primary: hexFromArgb(theme.schemes[mode].primary),
      onPrimary: hexFromArgb(theme.schemes[mode].onPrimary),
      primaryContainer: hexFromArgb(theme.schemes[mode].primaryContainer),
      onPrimaryContainer: hexFromArgb(theme.schemes[mode].onPrimaryContainer),

      secondary: hexFromArgb(theme.schemes[mode].secondary),
      onSecondary: hexFromArgb(theme.schemes[mode].onSecondary),
      secondaryContainer: hexFromArgb(theme.schemes[mode].secondaryContainer),
      onSecondaryContainer: hexFromArgb(
        theme.schemes[mode].onSecondaryContainer,
      ),

      tertiary: hexFromArgb(theme.schemes[mode].tertiary),
      onTertiary: hexFromArgb(theme.schemes[mode].onTertiary),
      tertiaryContainer: hexFromArgb(theme.schemes[mode].tertiaryContainer),
      onTertiaryContainer: hexFromArgb(theme.schemes[mode].onTertiaryContainer),

      error: hexFromArgb(theme.schemes[mode].error),
      onError: hexFromArgb(theme.schemes[mode].onError),
      errorContainer: hexFromArgb(theme.schemes[mode].errorContainer),
      onErrorContainer: hexFromArgb(theme.schemes[mode].onErrorContainer),

      background: hexFromArgb(theme.schemes[mode].background),
      onBackground: hexFromArgb(theme.schemes[mode].onBackground),

      surface: hexFromArgb(theme.schemes[mode].surface),
      onSurface: hexFromArgb(theme.schemes[mode].onSurface),
      surfaceVariant: hexFromArgb(theme.schemes[mode].surfaceVariant),
      onSurfaceVariant: hexFromArgb(theme.schemes[mode].onSurfaceVariant),

      outline: hexFromArgb(theme.schemes[mode].outline),
      outlineVariant: hexFromArgb(theme.schemes[mode].outlineVariant),

      inverseSurface: hexFromArgb(theme.schemes[mode].inverseSurface),
      inverseOnSurface: hexFromArgb(theme.schemes[mode].inverseOnSurface),
      inversePrimary: hexFromArgb(theme.schemes[mode].inversePrimary),

      // スクリムと影のカラー
      scrim: hexFromArgb(palettes.neutral.tone(0)),
      shadow: hexFromArgb(palettes.neutral.tone(0)),

      ...surface(mode),
    };
  };

  // カラースキームを生成（ライトモード）
  const lightScheme = scheme("light");

  // カラースキームを生成（ダークモード）
  const darkScheme = scheme("dark");

  return {
    light: lightScheme,
    dark: darkScheme,
    // トーナルパレットも返す（カスタムカラーが必要な場合に使用）
    palettes: {
      primary: palettes.primary,
      secondary: palettes.secondary,
      tertiary: palettes.tertiary,
      neutral: palettes.neutral,
      neutralVariant: palettes.neutralVariant,
      error: palettes.error,
    },
  };
}

// 特定のトーンの色を取得する関数（カスタムカラーが必要な場合）
export function getTone(palette: TonalPalette, tone: number): string {
  return hexFromArgb(palette.tone(tone));
}

// 型定義
export interface ColorScheme {
  // ベースカラー
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  background: string;
  onBackground: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  outline: string;
  outlineVariant: string;

  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;

  // スクリムと影
  scrim: string;
  shadow: string;

  // サーフェスエレベーション
  surfaceDim: string;
  // 追加のサーフェスカラー
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainer: string;
  surfaceContainerLow: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

export interface MaterialColorScheme {
  light: ColorScheme;
  dark: ColorScheme;
  palettes: {
    primary: TonalPalette;
    secondary: TonalPalette;
    tertiary: TonalPalette;
    neutral: TonalPalette;
    neutralVariant: TonalPalette;
    error: TonalPalette;
  };
}

// キーカラーからTamaguiのトークンを生成
export function createMaterialTokens(keyColor: string) {
  // Material Design 3のカラースキームを生成
  const materialTheme = generateMaterialTheme(keyColor);

  // トークンを作成（必須トークンをすべて含める）
  const tokens = createTokens({
    // カラートークン
    color: {
      // ライトモードのカラー
      ...materialTheme.light,

      // ダークモードのカラー
      darkPrimary: materialTheme.dark.primary,
      darkOnPrimary: materialTheme.dark.onPrimary,
      darkPrimaryContainer: materialTheme.dark.primaryContainer,
      darkOnPrimaryContainer: materialTheme.dark.onPrimaryContainer,

      darkSecondary: materialTheme.dark.secondary,
      darkOnSecondary: materialTheme.dark.onSecondary,
      darkSecondaryContainer: materialTheme.dark.secondaryContainer,
      darkOnSecondaryContainer: materialTheme.dark.onSecondaryContainer,

      darkTertiary: materialTheme.dark.tertiary,
      darkOnTertiary: materialTheme.dark.onTertiary,
      darkTertiaryContainer: materialTheme.dark.tertiaryContainer,
      darkOnTertiaryContainer: materialTheme.dark.onTertiaryContainer,

      darkError: materialTheme.dark.error,
      darkOnError: materialTheme.dark.onError,
      darkErrorContainer: materialTheme.dark.errorContainer,
      darkOnErrorContainer: materialTheme.dark.onErrorContainer,

      darkBackground: materialTheme.dark.background,
      darkOnBackground: materialTheme.dark.onBackground,

      darkSurface: materialTheme.dark.surface,
      darkOnSurface: materialTheme.dark.onSurface,
      darkSurfaceVariant: materialTheme.dark.surfaceVariant,
      darkOnSurfaceVariant: materialTheme.dark.onSurfaceVariant,

      darkOutline: materialTheme.dark.outline,
      darkOutlineVariant: materialTheme.dark.outlineVariant,

      // サーフェスエレベーション
      surfaceDim: materialTheme.light.surfaceDim,
      darkSurfaceDim: materialTheme.dark.surfaceDim,
      // 追加のサーフェスカラー（ライトモード）
      surfaceBright: materialTheme.light.surfaceBright,
      surfaceContainerLowest: materialTheme.light.surfaceContainerLowest,
      surfaceContainer: materialTheme.light.surfaceContainer,
      surfaceContainerLow: materialTheme.light.surfaceContainerLow,
      surfaceContainerHigh: materialTheme.light.surfaceContainerHigh,
      surfaceContainerHighest: materialTheme.light.surfaceContainerHighest,

      // 追加のサーフェスカラー（ダークモード）
      darkSurfaceBright: materialTheme.dark.surfaceBright,
      darkSurfaceContainerLowest: materialTheme.dark.surfaceContainerLowest,
      darkSurfaceContainer: materialTheme.dark.surfaceContainer,
      darkSurfaceContainerLow: materialTheme.dark.surfaceContainerLow,
      darkSurfaceContainerHigh: materialTheme.dark.surfaceContainerHigh,
      darkSurfaceContainerHighest: materialTheme.dark.surfaceContainerHighest,

      // その他のトークン
      shadow: materialTheme.light.shadow,
      scrim: materialTheme.light.scrim,
      darkShadow: materialTheme.dark.shadow,
      darkScrim: materialTheme.dark.scrim,
    },

    // スペーシングトークン（Material Design 3のスペーシングシステム）
    space: {
      $0: 0,
      $1: 4,
      $2: 8,
      $3: 12,
      $4: 16, // デフォルトスペーシング
      $true: 16, // Tamagui が期待するデフォルトスペーシングキー
      $5: 24,
      $6: 32,
      $7: 48,
      $8: 64,
    },

    // サイズトークン（必須）
    size: {
      $0: 0,
      $1: 4,
      $2: 8,
      $3: 12,
      $4: 16, // デフォルトサイズ
      $true: 16, // Tamagui が期待するデフォルトサイズキー
      $5: 24,
      $6: 32,
      $7: 48,
      $8: 64,
      // Material Design 3のコンポーネントサイズ
      $button: 40,
      $input: 48,
      $checkbox: 20,
      $switch: 32,
      $icon: 24,
      $avatar: 40,
    },

    // 角丸トークン（Material Design 3のシェイプシステム）
    radius: {
      $0: 0,
      $1: 4,
      $2: 8,
      $3: 12,
      $4: 16,
      $5: 28,
      // Material Design 3の角丸
      $small: 4,
      $medium: 8,
      $large: 16,
      $extraLarge: 28,
      $full: 9999,
    },

    // エレベーション（影の深さ）トークン
    zIndex: {
      $0: 0,
      $1: 1,
      $2: 2,
      $3: 3,
      $4: 4,
      $5: 5,
    },
  });

  return {
    tokens,
    // 生のカラースキームも返す（必要に応じて）
    colorScheme: materialTheme,
    // タイポグラフィスケールも返す
    typography: typographyScale,
    // エレベーションシステムも返す
    elevation: elevationSystem,
    // 状態レイヤーの不透明度も返す
    stateLayerOpacity,
  };
}

// フォントの設定 (tamagui.config.ts と同様の設定)
const headingFont = createFont({
  family: "NotoSansJP-Regular",
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
    true: 16,
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
    true: 23,
  },
  weight: {
    1: "300",
    3: "400",
    4: "500",
    5: "600",
    7: "700",
    9: "900",
    true: "500", // デフォルトウェイトは 500 (Medium 相当) にしておく
  },
  letterSpacing: {
    1: 0,
    2: -0.5,
    3: -0.75,
    4: -1,
    5: -1.5,
    6: -2,
    7: -2.5,
    8: -3,
    9: -3.5,
    10: -4,
    true: -1,
  },
});

// body フォントも同じ設定を使用
const bodyFont = headingFont;

// デフォルトのキーカラー（Material Design 3のデフォルト紫色）
export const DEFAULT_KEY_COLOR = "#6750A4";

export const useTheme = ({ keyColor }: { keyColor: string }) => {
  // bodyFont, headingFont は Provider から渡す必要がなくなる
  // キーカラーからMaterial Design 3のトークンとカラースキームを生成
  const { tokens: materialTokens, colorScheme } =
    createMaterialTokens(keyColor); // tokens も受け取る
  const sourceColor = argbFromHex(keyColor);

  // Material Color Utilitiesを使用してテーマを生成
  const theme = themeFromSourceColor(sourceColor);

  const config = createTamagui({
    themes: {
      ...themes,
      // Material Design 3のカラーをテーマに追加
      // @ts-ignore
      custom_light: colorScheme.light,
      // @ts-ignore
      custom_dark: colorScheme.dark,
    },
    tokens: {
      // 標準トークンとM3カラートークンをマージ
      ...tamaguiTokens,
      color: materialTokens.color,
    },
    shorthands,
    fonts: {
      body: bodyFont, // ここで定義した bodyFont を使う
      heading: headingFont, // ここで定義した headingFont を使う
    },
  });

  return { colorScheme, theme, config };
};

// Material Design 3のタイポグラフィスケール
export const typographyScale = {
  // ディスプレイ
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
    fontWeight: "400",
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
    fontWeight: "400",
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
    fontWeight: "400",
  },
  // 見出し
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
    fontWeight: "400",
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
    fontWeight: "400",
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    fontWeight: "400",
  },
  // タイトル
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: "400",
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: "500",
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: "500",
  },
  // 本文
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: "400",
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: "400",
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: "400",
  },
  // ラベル
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: "500",
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
};

// Material Design 3のエレベーションシステム
export const elevationSystem = {
  // エレベーションレベル（単位: dp）
  level0: 0, // フラット
  level1: 1, // 低エレベーション
  level2: 3, // 中エレベーション
  level3: 6, // 高エレベーション
  level4: 8, // 最高エレベーション
  level5: 12, // 特別なエレベーション

  // シャドウ設定（React Nativeのshadowプロパティに対応）
  shadows: {
    level0: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    level1: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1,
      elevation: 1,
    },
    level2: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 3,
    },
    level3: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 6,
    },
    level4: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 8,
    },
    level5: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 12,
    },
  },
};

// 状態レイヤーの不透明度（Material Design 3の仕様に基づく）
export const stateLayerOpacity = {
  hover: 0.08,
  focus: 0.12,
  press: 0.12,
  drag: 0.16,
};

import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  type TonalPalette,
} from "@material/material-color-utilities";
import { themes, type Theme, tokens as tamaguiTokens } from "@tamagui/themes";
import { createTamagui, createTokens, type GenericFont } from "tamagui";
import { shorthands } from "@tamagui/shorthands";

/**
 * Material Design 3のデザイントークンシステム
 *
 * Material Design 3の思想に基づいたデザイントークンを提供します。
 * 以下の要素を含みます：
 * - カラーシステム: 動的カラーパレットとトーナルパレット
 * - タイポグラフィシステム: MD3のタイポグラフィスケール
 * - エレベーションシステム: サーフェスエレベーションとシャドウ
 * - 状態レイヤー: インタラクション状態に対応するオーバーレイ
 * - スペーシングシステム: 一貫したスペーシング
 * - シェイプシステム: 角丸と形状
 */

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

  // カラースキームを生成（ライトモード）
  const lightScheme = {
    // ベースカラー
    primary: hexFromArgb(theme.schemes.light.primary),
    onPrimary: hexFromArgb(theme.schemes.light.onPrimary),
    primaryContainer: hexFromArgb(theme.schemes.light.primaryContainer),
    onPrimaryContainer: hexFromArgb(theme.schemes.light.onPrimaryContainer),

    secondary: hexFromArgb(theme.schemes.light.secondary),
    onSecondary: hexFromArgb(theme.schemes.light.onSecondary),
    secondaryContainer: hexFromArgb(theme.schemes.light.secondaryContainer),
    onSecondaryContainer: hexFromArgb(theme.schemes.light.onSecondaryContainer),

    tertiary: hexFromArgb(theme.schemes.light.tertiary),
    onTertiary: hexFromArgb(theme.schemes.light.onTertiary),
    tertiaryContainer: hexFromArgb(theme.schemes.light.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(theme.schemes.light.onTertiaryContainer),

    error: hexFromArgb(theme.schemes.light.error),
    onError: hexFromArgb(theme.schemes.light.onError),
    errorContainer: hexFromArgb(theme.schemes.light.errorContainer),
    onErrorContainer: hexFromArgb(theme.schemes.light.onErrorContainer),

    background: hexFromArgb(theme.schemes.light.background),
    onBackground: hexFromArgb(theme.schemes.light.onBackground),

    surface: hexFromArgb(theme.schemes.light.surface),
    onSurface: hexFromArgb(theme.schemes.light.onSurface),
    surfaceVariant: hexFromArgb(theme.schemes.light.surfaceVariant),
    onSurfaceVariant: hexFromArgb(theme.schemes.light.onSurfaceVariant),

    outline: hexFromArgb(theme.schemes.light.outline),
    outlineVariant: hexFromArgb(theme.schemes.light.outlineVariant),

    inverseSurface: hexFromArgb(theme.schemes.light.inverseSurface),
    inverseOnSurface: hexFromArgb(theme.schemes.light.inverseOnSurface),
    inversePrimary: hexFromArgb(theme.schemes.light.inversePrimary),

    // サーフェスエレベーション（MD3ではトーンを使用してエレベーションを表現）
    surfaceDim: hexFromArgb(palettes.neutral.tone(87)),
    surface1: hexFromArgb(palettes.neutral.tone(98)), // 低エレベーション
    surface2: hexFromArgb(palettes.neutral.tone(96)), // 中エレベーション
    surface3: hexFromArgb(palettes.neutral.tone(94)), // 高エレベーション
    surface4: hexFromArgb(palettes.neutral.tone(92)), // 最高エレベーション
    surface5: hexFromArgb(palettes.neutral.tone(90)), // 特別なエレベーション
  };

  // カラースキームを生成（ダークモード）
  const darkScheme = {
    // ベースカラー
    primary: hexFromArgb(theme.schemes.dark.primary),
    onPrimary: hexFromArgb(theme.schemes.dark.onPrimary),
    primaryContainer: hexFromArgb(theme.schemes.dark.primaryContainer),
    onPrimaryContainer: hexFromArgb(theme.schemes.dark.onPrimaryContainer),

    secondary: hexFromArgb(theme.schemes.dark.secondary),
    onSecondary: hexFromArgb(theme.schemes.dark.onSecondary),
    secondaryContainer: hexFromArgb(theme.schemes.dark.secondaryContainer),
    onSecondaryContainer: hexFromArgb(theme.schemes.dark.onSecondaryContainer),

    tertiary: hexFromArgb(theme.schemes.dark.tertiary),
    onTertiary: hexFromArgb(theme.schemes.dark.onTertiary),
    tertiaryContainer: hexFromArgb(theme.schemes.dark.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(theme.schemes.dark.onTertiaryContainer),

    error: hexFromArgb(theme.schemes.dark.error),
    onError: hexFromArgb(theme.schemes.dark.onError),
    errorContainer: hexFromArgb(theme.schemes.dark.errorContainer),
    onErrorContainer: hexFromArgb(theme.schemes.dark.onErrorContainer),

    background: hexFromArgb(theme.schemes.dark.background),
    onBackground: hexFromArgb(theme.schemes.dark.onBackground),

    surface: hexFromArgb(theme.schemes.dark.surface),
    onSurface: hexFromArgb(theme.schemes.dark.onSurface),
    surfaceVariant: hexFromArgb(theme.schemes.dark.surfaceVariant),
    onSurfaceVariant: hexFromArgb(theme.schemes.dark.onSurfaceVariant),

    outline: hexFromArgb(theme.schemes.dark.outline),
    outlineVariant: hexFromArgb(theme.schemes.dark.outlineVariant),

    inverseSurface: hexFromArgb(theme.schemes.dark.inverseSurface),
    inverseOnSurface: hexFromArgb(theme.schemes.dark.inverseOnSurface),
    inversePrimary: hexFromArgb(theme.schemes.dark.inversePrimary),

    // サーフェスエレベーション（ダークモードでは異なるトーンを使用）
    surfaceDim: hexFromArgb(palettes.neutral.tone(6)),
    surface1: hexFromArgb(palettes.neutral.tone(10)), // 低エレベーション
    surface2: hexFromArgb(palettes.neutral.tone(12)), // 中エレベーション
    surface3: hexFromArgb(palettes.neutral.tone(14)), // 高エレベーション
    surface4: hexFromArgb(palettes.neutral.tone(16)), // 最高エレベーション
    surface5: hexFromArgb(palettes.neutral.tone(18)), // 特別なエレベーション
  };

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

  // サーフェスエレベーション
  surfaceDim: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
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
      surface1: materialTheme.light.surface1,
      surface2: materialTheme.light.surface2,
      surface3: materialTheme.light.surface3,
      surface4: materialTheme.light.surface4,
      surface5: materialTheme.light.surface5,

      darkSurfaceDim: materialTheme.dark.surfaceDim,
      darkSurface1: materialTheme.dark.surface1,
      darkSurface2: materialTheme.dark.surface2,
      darkSurface3: materialTheme.dark.surface3,
      darkSurface4: materialTheme.dark.surface4,
      darkSurface5: materialTheme.dark.surface5,

      // その他のトークン
      shadow: "#000000",
      scrim: "#000000",
    },

    // スペーシングトークン（Material Design 3のスペーシングシステム）
    space: {
      $0: 0,
      $1: 4,
      $2: 8,
      $3: 12,
      $4: 16,
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
      $4: 16,
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

const useTheme = ({
  keyColor,
  bodyFont,
  headingFont,
}: { keyColor: string; bodyFont: GenericFont; headingFont: GenericFont }) => {
  const { colorScheme } = createMaterialTokens(keyColor);
  const theme = generateMaterialTheme(keyColor);

  const config = createTamagui({
    themes: {
      ...themes,
      // Material Design 3のカラーをテーマに追加
      md3_light: {
        background: "#FFFBFE", // Material Design 3のデフォルト背景色
        color: "#1C1B1F", // Material Design 3のデフォルトテキスト色
        primary: "#6750A4", // Material Design 3のデフォルトプライマリカラー
        secondary: "#625B71", // Material Design 3のデフォルトセカンダリカラー
        secondaryContainer: "#E8DEF8", // Material Design 3のデフォルトセカンダリコンテナ
        onSecondaryContainer: "#1D192B", // Material Design 3のデフォルトオンセカンダリコンテナ
      },
      light: {},
    },
    tokens: tamaguiTokens,
    shorthands,
    fonts: {
      body: bodyFont,
      heading: headingFont,
    },
  });

  return { colorScheme, theme, config };
};

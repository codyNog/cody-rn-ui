import { styled } from "tamagui";
import { Button as TamaguiButton, type ButtonProps } from "tamagui";
import { elevationSystem, stateLayerOpacity } from "../theme";

/**
 * Material Design 3のスタイルを適用したボタンコンポーネント
 *
 * Material Design 3のデザイン仕様に基づいたボタンコンポーネントです。
 * 以下のバリアントをサポートしています：
 * - filled: 塗りつぶしボタン（デフォルト）
 * - outlined: アウトラインボタン
 * - tonal: トーナルボタン
 * - elevated: エレベーテッドボタン
 * - text: テキストボタン
 *
 * サイズバリアント：
 * - small: 小サイズ
 * - medium: 中サイズ（デフォルト）
 * - large: 大サイズ
 */
export const Button = styled(TamaguiButton, {
  // MD3の標準的なボタンの角丸は8dp (borderRadius: 100)
  borderRadius: 100,

  // ボタンの標準的なパディング
  paddingVertical: "$2",
  paddingHorizontal: "$4",

  // ボタンの高さ
  height: "$button",

  // テキストのスタイル
  fontWeight: "500",
  letterSpacing: 0.1,

  // アニメーション設定
  animation: "medium",

  // ホバー、プレス状態の設定
  pressStyle: {
    opacity: 0.9,
    scale: 0.98,
  },

  hoverStyle: {
    opacity: 0.95,
  },

  // バリアント（Material Design 3のボタンスタイル）
  variants: {
    variant: {
      filled: {
        backgroundColor: "$primary",
        color: "$onPrimary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$outline",
        color: "$primary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: `rgba(var(--color-primary), ${stateLayerOpacity.hover})`,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: `rgba(var(--color-primary), ${stateLayerOpacity.press})`,
        },
      },
      tonal: {
        backgroundColor: "$secondaryContainer",
        color: "$onSecondaryContainer",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$secondaryContainer",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$secondaryContainer",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      elevated: {
        backgroundColor: "$surface1",
        color: "$primary",
        ...elevationSystem.shadows.level1,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surface1",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level2,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surface1",
          opacity: 1 - stateLayerOpacity.press,
          ...elevationSystem.shadows.level1,
        },
      },
      text: {
        backgroundColor: "transparent",
        color: "$primary",
        paddingHorizontal: "$2",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: `rgba(var(--color-primary), ${stateLayerOpacity.hover})`,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: `rgba(var(--color-primary), ${stateLayerOpacity.press})`,
        },
      },
    },
    // 無効状態
    disabled: {
      true: {
        opacity: 0.38,
        pointerEvents: "none",
      },
    },
  } as const,
  defaultVariants: {
    variant: "filled",
    disabled: false,
  },
});

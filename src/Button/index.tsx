import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { styled, useTheme } from "tamagui";
import { Button as TamaguiButton, type TamaguiElement } from "tamagui";
import { Ripple } from "../Ripple";
import { hexToRgba } from "../libs/color";
import { elevationSystem, stateLayerOpacity } from "../theme";

export type ButtonVariant =
  | "filled"
  | "outlined"
  | "tonal"
  | "elevated"
  | "text";

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
const BaseButton = styled(TamaguiButton, {
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
          backgroundColor: `$primary, ${stateLayerOpacity.hover})`,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: `$primary, ${stateLayerOpacity.press})`,
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
        backgroundColor: "$surfaceBright",
        color: "$primary",
        ...elevationSystem.shadows.level1,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surfaceBright",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level2,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surfaceBright",
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
          backgroundColor: `$primary, ${stateLayerOpacity.hover})`,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: `$primary, ${stateLayerOpacity.press})`,
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

export type ButtonProps = ComponentProps<typeof BaseButton>;
/**
 * Material Design 3のRippleエフェクトを適用したボタンコンポーネント
 *
 * タッチ時に波紋エフェクトが表示され、より良い視覚的フィードバックを提供します。
 */

export const Button = forwardRef<TamaguiElement, ButtonProps>((props, ref) => {
  const theme = useTheme();

  // バリアントに基づいてRippleの色を決定（各バリアントの前景色に基づく）
  const getRippleColor = () => {
    switch (props.variant) {
      case "filled":
        // Filledボタンの前景色（テキスト色）はonPrimary
        return hexToRgba(theme.onPrimary?.val, stateLayerOpacity.press);
      case "outlined":
      case "text":
        // OutlinedボタンとTextボタンの前景色（テキスト色）はprimary
        return hexToRgba(theme.primary?.val, stateLayerOpacity.press);
      case "tonal":
        // Tonalボタンの前景色（テキスト色）はonSecondaryContainer
        return hexToRgba(
          theme.onSecondaryContainer?.val,
          stateLayerOpacity.press,
        );
      case "elevated":
        // Elevatedボタンの前景色（テキスト色）はprimary
        return hexToRgba(theme.primary?.val, stateLayerOpacity.press);
      default:
        // デフォルトの前景色はonSurface
        return hexToRgba(theme.onSurface?.val, stateLayerOpacity.press);
    }
  };

  return (
    <Ripple
      color={getRippleColor()}
      disabled={props.disabled}
      centerRipple={true} // 常に中央からRippleを開始
      style={{ borderRadius: 100 }} // ボタンと同じ角丸を適用
    >
      <BaseButton {...props} ref={ref} />
    </Ripple>
  );
});

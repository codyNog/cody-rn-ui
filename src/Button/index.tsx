import { styled } from "tamagui";
import { Button as TamaguiButton } from "tamagui";
import { elevationSystem } from "../theme";

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
  borderRadius: "$2",
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  height: "$button",

  // バリアント（Material Design 3のボタンスタイル）
  variants: {
    variant: {
      filled: {
        backgroundColor: "$primary",
        color: "$onPrimary",
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$primary",
        color: "$primary",
      },
      tonal: {
        backgroundColor: "$secondaryContainer",
        color: "$onSecondaryContainer",
      },
      elevated: {
        backgroundColor: "$surface1",
        color: "$primary",
        ...elevationSystem.shadows.level1,
      },
      text: {
        backgroundColor: "transparent",
        color: "$primary",
        paddingHorizontal: "$2",
      },
    },
    // サイズバリアント
    size: {
      small: {
        height: 32,
        paddingHorizontal: "$3",
        fontSize: 14,
      },
      medium: {
        height: 40, // デフォルト
        paddingHorizontal: "$4",
        fontSize: 16,
      },
      large: {
        height: 48,
        paddingHorizontal: "$5",
        fontSize: 16,
        fontWeight: "500",
      },
    },
  },

  // デフォルト値
  defaultVariants: {
    variant: "filled",
    size: "medium",
  },
});

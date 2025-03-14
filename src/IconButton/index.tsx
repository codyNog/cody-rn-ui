"use client";
import { styled } from "tamagui";
import { Button as TamaguiButton, XStack } from "tamagui";
import { stateLayerOpacity } from "../theme";
import type { ReactNode } from "react";

export type IconButtonVariant = "standard" | "outlined" | "filled" | "tonal";

export type IconButtonProps = {
  icon: ReactNode;
  variant?: IconButtonVariant;
  disabled?: boolean;
  isSelected?: boolean; // 選択状態を示すプロパティ（トグル状態）
  onPress?: () => void;
};

// IconButtonの基本スタイル
const IconButtonBase = styled(TamaguiButton, {
  name: "IconButton",
  width: 48,
  height: 48,
  borderRadius: 1000,
  alignItems: "center",
  justifyContent: "center",
  padding: 12,

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

  variants: {
    variant: {
      standard: {
        backgroundColor: "transparent",
        color: "$onSurfaceVariant",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: `rgba($onSurfaceVariant, ${stateLayerOpacity.hover})`,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: `rgba($onSurfaceVariant, ${stateLayerOpacity.press})`,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$outline",
        color: "$primary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: `rgba($primary, ${stateLayerOpacity.hover})`,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: `rgba($primary, ${stateLayerOpacity.press})`,
        },
      },
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
    },
    isSelected: {
      true: {},
    },
    disabled: {
      true: {
        opacity: 0.38,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    variant: "standard",
    isSelected: false,
    disabled: false,
  },
});

// アイコンラッパー（アイコンのサイズを調整）
const IconWrapper = styled(XStack, {
  width: 24, // Material Design 3の標準アイコンサイズ
  height: 24,
  alignItems: "center",
  justifyContent: "center",
});

/**
 * Material Design 3のガイドラインに準拠したIconButtonコンポーネント
 *
 * バリアント:
 * - standard: 標準的なアイコンボタン（デフォルト）
 * - outlined: アウトライン付きアイコンボタン
 * - filled: 塗りつぶしアイコンボタン
 * - tonal: トーン付きアイコンボタン
 *
 * 選択状態:
 * - isSelected: 選択状態を表すプロパティ（トグル機能）
 */
export const IconButton = ({
  icon,
  variant = "standard",
  disabled = false,
  isSelected = false,
  onPress,
  ...props
}: IconButtonProps) => {
  // 選択状態に応じたスタイルを追加
  const getSelectedStyle = () => {
    if (!isSelected) return {};

    switch (variant) {
      case "standard":
        return {
          backgroundColor: `rgba($onSurfaceVariant, ${stateLayerOpacity.focus})`,
          color: "$onSurface",
        };
      case "outlined":
        return {
          backgroundColor: `rgba($primary, ${stateLayerOpacity.focus})`,
          borderColor: "$primary",
        };
      case "filled":
        return {
          backgroundColor: "$primaryContainer",
          color: "$onPrimaryContainer",
        };
      case "tonal":
        return {
          backgroundColor: "$tertiaryContainer",
          color: "$onTertiaryContainer",
        };
      default:
        return {};
    }
  };

  return (
    <IconButtonBase
      variant={variant}
      disabled={disabled}
      isSelected={isSelected}
      onPress={onPress}
      {...props}
      {...getSelectedStyle()}
    >
      <IconWrapper>{icon}</IconWrapper>
    </IconButtonBase>
  );
};

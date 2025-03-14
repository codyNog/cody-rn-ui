"use client";
import type { ReactNode } from "react";
import { styled, useTheme } from "tamagui";
import { Button as TamaguiButton, View, XStack } from "tamagui";
import { Ripple } from "../Ripple";
import { hexToRgba } from "../libs/color";
import { stateLayerOpacity } from "../theme";

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

  const theme = useTheme();

  // バリアントに基づいてRippleの色を決定（各バリアントの前景色に基づく）
  const getRippleColor = () => {
    switch (variant) {
      case "filled":
        // Filledアイコンボタンの前景色（アイコン色）はonPrimary
        return hexToRgba(theme.onPrimary?.val, stateLayerOpacity.press);
      case "outlined":
        // Outlinedアイコンボタンの前景色（アイコン色）はprimary
        return hexToRgba(theme.primary?.val, stateLayerOpacity.press);
      case "standard":
        // Standardアイコンボタンの前景色（アイコン色）はonSurfaceVariant
        return hexToRgba(theme.onSurfaceVariant?.val, stateLayerOpacity.press);
      case "tonal":
        // Tonalアイコンボタンの前景色（アイコン色）はonSecondaryContainer
        return hexToRgba(
          theme.onSecondaryContainer?.val,
          stateLayerOpacity.press,
        );
      default:
        // デフォルトの前景色はonSurface
        return hexToRgba(theme.onSurface?.val, stateLayerOpacity.press);
    }
  };

  // onPressハンドラをラップして型の不一致を解決
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const selectedStyle = getSelectedStyle();

  return (
    <View
      style={{
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ripple
        color={getRippleColor()}
        disabled={disabled}
        onPress={handlePress}
        centerRipple={true} // 常に中央からRippleを開始
        style={{
          borderRadius: 1000, // アイコンボタンと同じ角丸を適用
          width: 48,
          height: 48,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <IconButtonBase
          variant={variant}
          disabled={disabled}
          isSelected={isSelected}
          {...props}
          {...selectedStyle}
          onPress={undefined} // onPressはRippleに移動
        >
          <IconWrapper>{icon}</IconWrapper>
        </IconButtonBase>
      </Ripple>
    </View>
  );
};

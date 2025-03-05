"use client";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { type TamaguiElement, Text, XStack, YStack, styled } from "tamagui";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";

export type ChipVariant = "assist" | "filter" | "input" | "suggestion";

type ChipProps = {
  variant?: ChipVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

// スタイル付きのChipコンテナ
const StyledChip = styled(XStack, {
  name: "ChipContainer", // 名前を追加
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  height: 32,
  paddingHorizontal: "$3",
  gap: "$1",
  cursor: "pointer", // クリック可能な要素であることを示す

  // アニメーション設定
  animation: "medium",

  // ホバー、プレス状態の設定
  pressStyle: {
    scale: 0.98,
  },

  // バリアント
  variants: {
    variant: {
      assist: {
        backgroundColor: "$surfaceContainerLow",
        borderWidth: 0,
        ...elevationSystem.shadows.level0,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      filter: {
        backgroundColor: "$surfaceContainerLow",
        borderWidth: 0,
        ...elevationSystem.shadows.level0,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      input: {
        backgroundColor: "$surfaceContainerHighest",
        borderWidth: 0,
        ...elevationSystem.shadows.level0,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surfaceContainerHighest",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surfaceContainerHighest",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      suggestion: {
        backgroundColor: "$surfaceContainerLow",
        borderWidth: 0,
        ...elevationSystem.shadows.level0,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
    },
    selected: {
      true: {
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
    disabled: {
      true: {
        opacity: 0.38,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    variant: "assist",
    selected: false,
    disabled: false,
  },
});

// チップのテキスト
const ChipText = styled(Text, {
  name: "ChipText", // 名前を追加
  ...typographyScale.labelLarge,
  color: "$onSurfaceVariant",

  variants: {
    selected: {
      true: {
        color: "$onSecondaryContainer",
      },
    },
    disabled: {
      true: {
        color: "$onSurface",
        opacity: 0.38,
      },
    },
  } as const,
});

// アイコンコンテナ
const IconContainer = styled(YStack, {
  justifyContent: "center",
  alignItems: "center",
  height: 18,
  width: 18,
});

/**
 * Material Design 3のスタイルを適用したチップコンポーネント
 *
 * Material Design 3のデザイン仕様に基づいたチップコンポーネントです。
 * 以下のバリアントをサポートしています：
 * - assist: アシストチップ
 * - filter: フィルターチップ
 * - input: 入力チップ
 * - suggestion: 提案チップ
 */
export const Chip = forwardRef<TamaguiElement, Omit<ChipProps, "ref">>(
  (
    {
      variant = "assist",
      leadingIcon,
      trailingIcon,
      selected = false,
      disabled = false,
      onClick,
      children,
    },
    ref,
  ) => (
    <StyledChip
      ref={ref}
      variant={variant}
      selected={selected}
      disabled={disabled}
      onPress={onClick}
    >
      {leadingIcon && <IconContainer>{leadingIcon}</IconContainer>}

      <ChipText selected={selected} disabled={disabled}>
        {children}
      </ChipText>

      {trailingIcon && <IconContainer>{trailingIcon}</IconContainer>}
    </StyledChip>
  ),
);

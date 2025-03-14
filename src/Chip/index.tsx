"use client";
import type { ReactNode } from "react";
import { forwardRef, useCallback } from "react";
import {
  type TamaguiElement,
  Text,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";
import { Ripple } from "../Ripple";
import { hexToRgba } from "../libs/color";

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
        borderWidth: 1,
        borderColor: "$outline",
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
 *
 * タッチ時に波紋エフェクトが表示され、より良い視覚的フィードバックを提供します。
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
  ) => {
    const theme = useTheme();

    // バリアントと選択状態に基づいてRippleの色を決定
    const getRippleColor = useCallback(() => {
      // 選択状態の場合
      if (selected) {
        return hexToRgba(
          theme.onSecondaryContainer?.val,
          stateLayerOpacity.press,
        );
      }

      // 非選択状態の場合はバリアントに基づく
      if (
        variant === "assist" ||
        variant === "filter" ||
        variant === "suggestion"
      ) {
        return hexToRgba(theme.onSurfaceVariant?.val, stateLayerOpacity.press);
      }

      // input バリアント
      return hexToRgba(theme.onSurface?.val, stateLayerOpacity.press);
    }, [variant, selected, theme]);

    // onClickハンドラをラップして型の不一致を解決
    const handlePress = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);

    const chipContent = (
      <StyledChip
        ref={ref}
        variant={variant}
        selected={selected}
        disabled={disabled}
        onPress={undefined} // onPressはRippleに移動
      >
        {leadingIcon && <IconContainer>{leadingIcon}</IconContainer>}

        <ChipText selected={selected} disabled={disabled}>
          {children}
        </ChipText>

        {trailingIcon && <IconContainer>{trailingIcon}</IconContainer>}
      </StyledChip>
    );

    // onClickがある場合のみRippleを適用
    if (onClick && !disabled) {
      return (
        <Ripple
          color={getRippleColor()}
          disabled={disabled}
          onPress={handlePress}
          style={{
            borderRadius: 8, // チップと同じ角丸を適用
            overflow: "hidden",
          }}
        >
          {chipContent}
        </Ripple>
      );
    }

    // クリック不可の場合はRippleなしで返す
    return chipContent;
  },
);

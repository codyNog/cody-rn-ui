"use client";
import type { ReactNode } from "react";
import { styled } from "tamagui";
import {
  type ButtonProps,
  type StackProps,
  Button as TamaguiButton,
  XStack,
  YStack,
} from "tamagui";
import { elevationSystem, stateLayerOpacity } from "../theme";

/**
 * FAB（Floating Action Button）のプロパティ
 */
export type FabProps = ButtonProps & {
  /**
   * FABに表示するアイコン
   * ReactNodeを渡すことができます（例：<Icon />）
   */
  icon?: ReactNode;
  /**
   * 拡張FABの場合に表示するテキスト
   * このプロパティが設定されると拡張FABになります
   */
  label?: string;
  /**
   * FABの子要素（アイコンの代わりに使用可能）
   */
  children?: ReactNode;
  /**
   * FABの色
   */
  color?: "primary" | "secondary" | "tertiary" | "surface";
};

/**
 * FABのコンテナ
 * 通常は画面の右下に配置します
 */
export const FabContainer = styled(YStack, {
  position: "absolute",
  right: "$4",
  bottom: "$4",
  zIndex: 100,
});

/**
 * Material Design 3のFAB（Floating Action Button）コンポーネント
 *
 * FABは画面上の主要なアクションを表す浮動ボタンです。
 * 以下のバリアントをサポートしています：
 * - regular: 標準サイズのFAB（デフォルト）
 * - small: 小さいサイズのFAB
 * - extended: テキスト付きの拡張FAB（labelプロパティを設定すると自動的に拡張FABになります）
 *
 * 色のバリアント：
 * - primary: プライマリカラー（デフォルト）
 * - secondary: セカンダリカラー
 * - tertiary: ターシャリーカラー
 * - surface: サーフェスカラー
 */
export const Fab = styled(TamaguiButton, {
  // 円形のボタン
  borderRadius: 1000,

  // 標準的なパディング
  paddingHorizontal: "$4",
  paddingVertical: "$4",

  // エレベーション効果
  ...elevationSystem.shadows.level3,

  // アニメーション設定
  animation: "medium",

  // ホバー、プレス状態の設定
  pressStyle: {
    ...elevationSystem.shadows.level2,
    scale: 0.98,
  },

  hoverStyle: {
    ...elevationSystem.shadows.level4,
  },

  // バリアント（サイズ）
  variants: {
    size: {
      regular: {
        width: 56,
        height: 56,
      },
      small: {
        width: 40,
        height: 40,
        paddingHorizontal: "$2",
        paddingVertical: "$2",
      },
      extended: {
        height: 56,
        paddingHorizontal: "$4",
        paddingVertical: "$4",
        borderRadius: 16,
      },
    },
    // バリアント（色）
    color: {
      primary: {
        backgroundColor: "$primary",
        color: "$onPrimary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level4,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.press,
          ...elevationSystem.shadows.level2,
        },
      },
      secondary: {
        backgroundColor: "$secondary",
        color: "$onSecondary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$secondary",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level4,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$secondary",
          opacity: 1 - stateLayerOpacity.press,
          ...elevationSystem.shadows.level2,
        },
      },
      tertiary: {
        backgroundColor: "$tertiary",
        color: "$onTertiary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$tertiary",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level4,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$tertiary",
          opacity: 1 - stateLayerOpacity.press,
          ...elevationSystem.shadows.level2,
        },
      },
      surface: {
        backgroundColor: "$surface",
        color: "$primary",
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surface",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level4,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surface",
          opacity: 1 - stateLayerOpacity.press,
          ...elevationSystem.shadows.level2,
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
    size: "regular",
    color: "primary",
    disabled: false,
  },
});

/**
 * FABコンポーネントのラッパー
 * アイコンとラベルの表示を処理します
 */
export const FabButton = ({
  icon,
  label,
  size = "regular",
  color = "primary",
  disabled = false,
  children,
  ...props
}: FabProps) => {
  // labelが指定されている場合は拡張FABとして表示
  const isExtended = !!label;
  const actualSize = isExtended ? "extended" : size;

  return (
    <Fab size={actualSize} color={color} disabled={disabled} {...props}>
      <XStack alignItems="center" gap="$2">
        {icon}
        {children}
        {label && <XStack marginLeft={icon ? "$2" : 0}>{label}</XStack>}
      </XStack>
    </Fab>
  );
};

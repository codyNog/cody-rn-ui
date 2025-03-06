"use client";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { type TamaguiElement, Text, XStack, YStack, styled } from "tamagui";
import { elevationSystem, typographyScale } from "../theme";

type Props = {
  variant?: "center" | "small" | "medium" | "large";
  headline?: string;
  leadingIcon?: ReactNode;
  trailingIcons?: ReactNode[];
  children?: ReactNode;
};

// Material Design 3のガイドラインに基づくTopAppBarのスタイル
// https://m3.material.io/components/top-app-bar/specs

// コンテナスタイル
const Container = styled(XStack, {
  width: "100%",
  maxWidth: 1440, // Material Design 3の最大幅
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "$surfaceContainer",
  paddingHorizontal: "$4", // 16dp - Material Design 3のガイドラインに基づく水平パディング
  // エレベーション（Material Design 3では0-4dp）
  ...elevationSystem.shadows.level0,

  variants: {
    variant: {
      center: {
        height: 64, // 64dp
      },
      small: {
        height: 64, // 64dp
      },
      medium: {
        height: 112, // 112dp
      },
      large: {
        height: 152, // 152dp
      },
    },
  },
  defaultVariants: {
    variant: "center",
  },
});

// 見出しスタイル（Material Design 3のタイポグラフィに準拠）
const Headline = styled(Text, {
  color: "$onSurfaceVariant",
  fontWeight: "500",

  variants: {
    variant: {
      center: {
        ...typographyScale.titleLarge, // 22sp
        fontSize: 20, // Material Design 3の推奨値に調整
      },
      small: {
        ...typographyScale.titleLarge, // 22sp
        fontSize: 20, // Material Design 3の推奨値に調整
      },
      medium: {
        ...typographyScale.headlineSmall, // 24sp
        fontSize: 22, // Material Design 3の推奨値に調整
      },
      large: {
        ...typographyScale.headlineMedium, // 28sp
        fontSize: 24, // Material Design 3の推奨値に調整
      },
    },
  },
});

// アイコンコンテナ（Material Design 3のアイコン間隔を調整）
const IconContainer = styled(XStack, {
  alignItems: "center",
  gap: "$3", // 12dp - アイコン間の間隔を広げて視認性を向上
  height: "$icon", // 24dp
  justifyContent: "center",
  minWidth: "$icon", // 最小幅を設定して空の場合でもスペースを確保
});

// アイコンラッパー（個々のアイコン用）
const IconWrapper = styled(XStack, {
  width: "$icon", // 24dp
  height: "$icon", // 24dp
  alignItems: "center",
  justifyContent: "center",
  padding: "$1", // 4dp - タップ領域を広げるためのパディング
});

/**
 * Material Design 3のガイドラインに準拠したTopAppBarコンポーネント
 *
 * バリアント:
 * - center: 中央配置のタイトル（高さ64dp）
 * - small: 左配置のタイトル（高さ64dp）
 * - medium: 左配置のタイトル（高さ112dp）
 * - large: 下部配置のタイトル（高さ152dp）
 */
export const TopAppBar = forwardRef<TamaguiElement, Props>(
  (
    { variant = "center", headline, leadingIcon, trailingIcons, children },
    ref,
  ) => {
    // centerバリアントの場合のレイアウト
    if (variant === "center") {
      return (
        <XStack width="100%" justifyContent="center">
          <Container ref={ref} variant={variant}>
            <IconContainer>
              {leadingIcon ? <IconWrapper>{leadingIcon}</IconWrapper> : null}
            </IconContainer>

            <Headline variant={variant}>{headline}</Headline>

            <IconContainer>
              {trailingIcons && trailingIcons.length > 0 ? (
                <IconWrapper>{trailingIcons[0]}</IconWrapper>
              ) : null}
            </IconContainer>
          </Container>
        </XStack>
      );
    }

    // その他のバリアント
    return (
      <YStack width="100%" alignItems="center">
        <Container ref={ref} variant={variant}>
          <XStack alignItems="center" gap="$4">
            {leadingIcon && <IconWrapper>{leadingIcon}</IconWrapper>}

            {variant !== "large" && (
              <Headline variant={variant}>{headline}</Headline>
            )}
          </XStack>

          {trailingIcons && trailingIcons.length > 0 && (
            <IconContainer>
              {/* 
              アイコンを個別に表示することで、mapとインデックスキーの使用を回避
              最大5つのアイコンまでサポート
            */}
              {Array.isArray(trailingIcons) && trailingIcons[0] && (
                <IconWrapper key="icon-0">{trailingIcons[0]}</IconWrapper>
              )}
              {Array.isArray(trailingIcons) && trailingIcons[1] && (
                <IconWrapper key="icon-1">{trailingIcons[1]}</IconWrapper>
              )}
              {Array.isArray(trailingIcons) && trailingIcons[2] && (
                <IconWrapper key="icon-2">{trailingIcons[2]}</IconWrapper>
              )}
              {Array.isArray(trailingIcons) && trailingIcons[3] && (
                <IconWrapper key="icon-3">{trailingIcons[3]}</IconWrapper>
              )}
              {Array.isArray(trailingIcons) && trailingIcons[4] && (
                <IconWrapper key="icon-4">{trailingIcons[4]}</IconWrapper>
              )}
            </IconContainer>
          )}
        </Container>

        {/* large バリアントの場合、下部にタイトルを表示 */}
        {variant === "large" && (
          <XStack
            width="100%"
            maxWidth={1440}
            paddingHorizontal="$4" /* 16dp - 水平パディングを追加 */
            paddingBottom="$4"
            backgroundColor="$surfaceContainer"
            justifyContent="flex-start"
          >
            <Headline variant={variant}>{headline}</Headline>
          </XStack>
        )}

        {children}
      </YStack>
    );
  },
);

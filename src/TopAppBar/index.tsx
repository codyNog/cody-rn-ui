"use client";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { type TamaguiElement, Text, XStack, YStack, styled } from "tamagui";
import { elevationSystem, typographyScale } from "../theme";

type Props = {
  variant?: "center" | "small" | "medium" | "large";
  headline?: string;
  leadingIcon?: ReactNode;
  /**
   * Material Designのガイドラインに従い、最大3つまでのアイコンをサポート
   */
  trailingIcons?: ReactNode[];
  children?: ReactNode;
};

// Material Design 3のガイドラインに基づくTopAppBarのスタイル
// https://m3.material.io/components/top-app-bar/specs

// コンテナスタイル
const Container = styled(XStack, {
  width: "100%",
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
  gap: "$6", // React Nativeでは24dp、Webでは24px - Material Design公式ガイドラインに基づくアイコン間の間隔
  height: "$icon", // 24dp/px
  justifyContent: "center",
  // width: 48を削除し、アイコンの数に応じて自動的に幅が調整されるように
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
 *
 * 注意: Material Designのガイドラインに従い、trailingIconsは最大3つまでサポートしています。
 * それ以上のアイコンを表示する場合は、メニューやその他の方法を検討してください。
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
            {/* 左側のアイコンコンテナ - 常に同じ幅を確保 */}
            <IconContainer justifyContent="flex-start">
              {leadingIcon ? <IconWrapper>{leadingIcon}</IconWrapper> : null}
            </IconContainer>

            <Headline variant={variant}>{headline}</Headline>

            {/* 右側のアイコンコンテナ - 常に同じ幅を確保 */}
            <IconContainer justifyContent="flex-end">
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
              Material Designのガイドラインに従い、最大3つまでのアイコンをサポート
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

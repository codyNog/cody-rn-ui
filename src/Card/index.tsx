"use client";
import type { ReactNode, Ref } from "react";
import {
  Card as TamaguiCard,
  Image,
  Paragraph,
  Text,
  type TamaguiElement,
  type ImageProps,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Button } from "../Button";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";

/**
 * Material Design 3のスタイルを適用したカードコンポーネント
 *
 * Material Design 3のデザイン仕様に基づいたカードコンポーネントです。
 * 以下のバリアントをサポートしています：
 * - elevated: エレベーテッドカード（デフォルト）- 影付きのカード
 * - filled: フィルドカード - 塗りつぶしのカード
 * - outlined: アウトラインカード - 境界線付きのカード
 */
const StyledCard = styled(TamaguiCard, {
  // MD3の標準的なカードの角丸は12dp
  borderRadius: 12,

  // カードの標準的なパディング
  padding: "$4",

  // アニメーション設定
  animation: "medium",

  // ホバー、プレス状態の設定
  pressStyle: {
    scale: 0.98,
  },

  // バリアント（Material Design 3のカードスタイル）
  variants: {
    variant: {
      elevated: {
        backgroundColor: "$surfaceContainerLow",
        ...elevationSystem.shadows.level1,
        // ホバー時のスタイル
        hoverStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.hover,
          ...elevationSystem.shadows.level2,
        },
        // プレス時のスタイル
        pressStyle: {
          backgroundColor: "$surfaceContainerLow",
          opacity: 1 - stateLayerOpacity.press,
          ...elevationSystem.shadows.level1,
        },
      },
      filled: {
        backgroundColor: "$surfaceContainerHighest",
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
      outlined: {
        backgroundColor: "$surface",
        borderWidth: 1,
        borderColor: "$outlineVariant",
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
  } as const,
  defaultVariants: {
    variant: "elevated",
  },
});

// カードのヘッダーコンポーネント
const CardHeader = styled(YStack, {
  gap: "$1",
  marginBottom: "$2",
});

// カードのコンテンツコンポーネント
const CardContent = styled(YStack, {
  gap: "$2",
  marginBottom: "$3",
});

// カードのフッターコンポーネント
const CardFooter = styled(XStack, {
  gap: "$2",
  justifyContent: "flex-end",
});

// カードのタイトルコンポーネント
const CardTitle = styled(Text, {
  ...typographyScale.titleLarge,
  color: "$onSurface",
});

// カードのサブタイトルコンポーネント
const CardSubtitle = styled(Text, {
  ...typographyScale.bodyMedium,
  color: "$onSurfaceVariant",
});

// カードの説明コンポーネント
const CardDescription = styled(Paragraph, {
  ...typographyScale.bodyMedium,
  color: "$onSurfaceVariant",
});

// カードのメディアコンポーネント
const CardMedia = styled(Image, {
  width: "100%",
  height: 200,
  objectFit: "cover",
  marginBottom: "$3",
  borderRadius: 8,
});

type Props = {
  title?: string; // タイトル
  subtitle?: string; // サブタイトル
  description?: string; // 説明
  media?: {
    source: ImageProps["source"]; // 画像ソース
    alt?: string; // 代替テキスト
  };
  children?: ReactNode; // 子要素
  ref?: Ref<TamaguiElement>; // 参照
  actions?: {
    onClick: () => void;
    label: string;
    variant?: "filled" | "outlined" | "tonal" | "elevated" | "text";
  }[];
  variant?: "elevated" | "filled" | "outlined"; // カードのバリアント
};

export const Card = ({
  title,
  subtitle,
  description,
  media,
  children,
  ref,
  actions,
  variant = "elevated",
}: Props) => {
  return (
    <StyledCard ref={ref} variant={variant}>
      {media && (
        <CardMedia source={media.source} alt={media.alt || "Card media"} />
      )}

      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}

      <CardContent>
        {description && <CardDescription>{description}</CardDescription>}
        {children}
      </CardContent>

      {actions && actions.length > 0 && (
        <CardFooter>
          {actions.map(({ onClick, label, variant = "text" }) => (
            <Button key={label} onPress={onClick} variant={variant}>
              {label}
            </Button>
          ))}
        </CardFooter>
      )}
    </StyledCard>
  );
};

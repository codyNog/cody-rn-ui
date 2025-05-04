"use client";
import { forwardRef, useCallback } from "react";
import type { ReactNode } from "react";
import {
  Image,
  type ImageProps,
  Paragraph,
  Card as TamaguiCard,
  type TamaguiElement,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";
import { Button } from "../Button";
import { Ripple } from "../Ripple";
import { hexToRgba } from "../libs/color";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";
import { Text as CustomText } from "../Text";

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

// カードのメディアコンポーネント
const CardMedia = styled(Image, {
  width: "100%",
  height: 200,
  objectFit: "cover",
  marginBottom: "$3",
  borderRadius: 8,
});

// カードの説明コンポーネント
const CardDescription = styled(Paragraph, {
  ...typographyScale.bodyMedium,
  color: "$onSurfaceVariant",
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
  actions?: {
    onClick: () => void;
    label: string;
    variant?: "filled" | "outlined" | "tonal" | "elevated" | "text";
  }[];
  variant?: "elevated" | "filled" | "outlined"; // カードのバリアント
  onPress?: () => void; // カード全体のクリックハンドラ
  disabled?: boolean; // 無効状態
};

/**
 * Material Design 3のRippleエフェクトを適用したカードコンポーネント
 *
 * タッチ時に波紋エフェクトが表示され、より良い視覚的フィードバックを提供します。
 */
export const Card = forwardRef<TamaguiElement, Props>(
  (
    {
      title,
      subtitle,
      description,
      media,
      children,
      actions,
      variant = "elevated",
      onPress,
      disabled = false,
    },
    ref,
  ) => {
    const theme = useTheme();

    // バリアントに基づいてRippleの色を決定
    const getRippleColor = useCallback(() => {
      if (variant === "filled") {
        return hexToRgba(theme.onSurfaceVariant?.val, stateLayerOpacity.press);
      }

      if (variant === "outlined") {
        return hexToRgba(theme.primary?.val, stateLayerOpacity.press);
      }

      // elevated または他のバリアント
      return hexToRgba(theme.onSurface?.val, stateLayerOpacity.press);
    }, [variant, theme]);

    // onPressハンドラをラップして型の不一致を解決
    const handlePress = useCallback(() => {
      if (onPress) {
        onPress();
      }
    }, [onPress]);

    // カードのコンテンツ部分を定義
    const cardContent = (
      <StyledCard
        ref={ref}
        variant={variant}
        // onPress がない場合は pressStyle を上書きして scale を 1 にする
        pressStyle={!onPress ? { scale: 1 } : undefined}
        // StyledCard 自体の onPress は不要なので削除
        // onPress={onPress ? handlePress : undefined}
      >
        {media && (
          <CardMedia source={media.source} alt={media.alt || "Card media"} />
        )}

        {(title || subtitle) && (
          <CardHeader>
            {title && (
              <CustomText variant="headlineSmall" color="$onSurface">
                {title}
              </CustomText>
            )}
            {subtitle && (
              <CustomText variant="bodyMedium" color="$onSurfaceVariant">
                {subtitle}
              </CustomText>
            )}
          </CardHeader>
        )}

        <CardContent>
          {description && <CardDescription>{description}</CardDescription>}
          {typeof children === "string" ? (
            <CustomText>{children}</CustomText>
          ) : (
            children
          )}
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

    // onPress が指定されている場合のみ Ripple でラップ
    if (onPress) {
      return (
        <Ripple
          color={getRippleColor()}
          disabled={disabled}
          onPress={handlePress} // ここは handlePress を渡す
          style={{
            borderRadius: 12, // カードと同じ角丸を適用
            overflow: "hidden",
            width: "100%", // 幅を100%に設定
          }}
        >
          {cardContent}
        </Ripple>
      );
    }

    // onPress がない場合は StyledCard を直接返す
    return cardContent;
  },
);

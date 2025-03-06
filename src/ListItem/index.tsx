"use client";
import { forwardRef, type ReactNode } from "react";
import {
  type TamaguiElement,
  Text,
  XStack,
  YStack,
  styled,
  Stack,
  type StackProps,
  type GetProps,
} from "tamagui";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";

// ListItemのベースコンポーネント
const StyledListItem = styled(XStack, {
  width: "100%",
  minHeight: 56,
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  alignItems: "center",
  gap: "$4",
  backgroundColor: "$surface",
  borderRadius: "$medium",

  // アニメーション設定
  animation: "medium",

  // ホバー、プレス状態の設定
  pressStyle: {
    backgroundColor: "$surfaceContainer",
    opacity: 1 - stateLayerOpacity.press,
  },

  hoverStyle: {
    backgroundColor: "$surfaceContainer",
    opacity: 1 - stateLayerOpacity.hover,
    cursor: "pointer", // hover時にカーソルをポインターに変更
  },

  // バリアント
  variants: {
    variant: {
      // 標準のリストアイテム
      standard: {
        backgroundColor: "transparent",
      },
      // 塗りつぶしのリストアイテム
      filled: {
        backgroundColor: "$surfaceContainerLow",
      },
      // エレベーテッドのリストアイテム
      elevated: {
        backgroundColor: "$surfaceContainerLow",
        ...elevationSystem.shadows.level1,
      },
    },
    // 選択状態
    selected: {
      true: {
        backgroundColor: "$secondaryContainer",
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
    variant: "standard",
    selected: false,
    disabled: false,
  },
});

// コンテンツ部分のスタイル
const ContentContainer = styled(YStack, {
  flex: 1,
  justifyContent: "center",
  gap: "$1",
});

// ヘッドラインのスタイル
const Headline = styled(Text, {
  ...typographyScale.bodyLarge,
  color: "$onSurface",
});

// サポートテキストのスタイル
const SupportingText = styled(Text, {
  ...typographyScale.bodyMedium,
  color: "$onSurfaceVariant",
});

// Leading部分のコンテナ
const LeadingContainer = styled(Stack, {
  justifyContent: "center",
  alignItems: "center",
  minWidth: 40,
  minHeight: 40,
});

// Trailing部分のコンテナ
const TrailingContainer = styled(Stack, {
  justifyContent: "center",
  alignItems: "center",
  minWidth: 24,
  minHeight: 24,
  marginLeft: "auto", // 右端に配置するために追加
  alignSelf: "center", // 縦方向の中央揃え
});

// ListItemのプロパティ型定義
type ListItemVariants = GetProps<typeof StyledListItem>;
type ListItemBaseProps = {
  headline: string;
  supportingText?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
} & ListItemVariants;

export const ListItem = forwardRef<TamaguiElement, ListItemBaseProps>(
  (
    {
      headline,
      supportingText,
      leading,
      trailing,
      onPress,
      variant = "standard",
      selected = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledListItem
        ref={ref}
        variant={variant}
        selected={selected}
        disabled={disabled}
        onPress={onPress}
        {...props}
      >
        {leading && <LeadingContainer>{leading}</LeadingContainer>}

        <ContentContainer>
          <Headline>{headline}</Headline>
          {supportingText && <SupportingText>{supportingText}</SupportingText>}
        </ContentContainer>

        {trailing && <TrailingContainer>{trailing}</TrailingContainer>}
      </StyledListItem>
    );
  },
);

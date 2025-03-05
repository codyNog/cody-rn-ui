"use client";
import { forwardRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Stack,
  type TamaguiElement,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Badge, type BadgeVariant } from "../Badge";
import { elevationSystem, typographyScale } from "../theme";

type NavigationItem = {
  icon: ReactNode;
  activeIcon?: ReactNode; // アクティブ時に表示する別のアイコン（オプション）
  label: string;
  value: string;
  badge?: {
    content?: ReactNode;
    variant?: BadgeVariant;
    max?: number;
    showZero?: boolean;
    visible?: boolean;
  };
};

type Props = {
  items: NavigationItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "standard" | "labeled" | "unlabeled";
};

// コンテナスタイル
const Container = styled(XStack, {
  width: "100%",
  maxWidth: 1440, // Material Design 3の最大幅
  height: 80, // 標準的な高さ
  alignItems: "center",
  justifyContent: "space-around",
  backgroundColor: "$surfaceContainer",
  borderTopWidth: 1,
  borderTopColor: "$outlineVariant",
  // エレベーション（Material Design 3では0-3dp）
  ...elevationSystem.shadows.level2,

  variants: {
    variant: {
      standard: {
        height: 80, // 標準的な高さ
      },
      labeled: {
        height: 80, // ラベル付きの高さ
      },
      unlabeled: {
        height: 64, // ラベルなしの高さ
      },
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

// アイテムコンテナ
const ItemContainer = styled(YStack, {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: "$2",
  paddingHorizontal: "$2",
  gap: "$1",
  flex: 1,
  height: "100%",
  width: 0, // 幅を0に設定し、flexで均等に分割
});

// アイコンコンテナ
const IconContainer = styled(Stack, {
  width: 24,
  height: 24,
  alignItems: "center",
  justifyContent: "center",
});

// ラベルスタイル
const Label = styled(Text, {
  ...typographyScale.labelMedium,
  textAlign: "center",
  maxWidth: "100%", // 最大幅を親要素に合わせる
  overflow: "hidden", // オーバーフローを隠す
  textOverflow: "ellipsis", // 省略記号で表示
  whiteSpace: "nowrap", // 改行しない

  variants: {
    active: {
      true: {
        color: "$primary",
        fontWeight: "500",
      },
      false: {
        color: "$onSurfaceVariant",
        fontWeight: "400",
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

/**
 * Material Design 3のガイドラインに準拠したNavigationBarコンポーネント
 *
 * バリアント:
 * - standard: 標準的なナビゲーションバー（アイコンとラベル）
 * - labeled: ラベル付きナビゲーションバー（アイコンとラベル、アクティブ時に強調表示）
 * - unlabeled: ラベルなしナビゲーションバー（アイコンのみ）
 */
export const NavigationBar = forwardRef<TamaguiElement, Props>(
  ({ items, defaultValue, onValueChange, variant = "standard" }, ref) => {
    const initialValue = defaultValue || items[0]?.value || "";
    const [activeValue, setActiveValue] = useState(initialValue);

    return (
      <XStack width="100%" justifyContent="center">
        <Container ref={ref} variant={variant} position="relative">
          {/* ナビゲーションアイテム */}
          {items.map((item) => {
            const isActive = item.value === activeValue;
            const showLabel = variant !== "unlabeled" || isActive;

            return (
              <ItemContainer
                key={item.value}
                onPress={() => {
                  setActiveValue(item.value);
                  onValueChange?.(item.value);
                }}
                pressStyle={{
                  backgroundColor: "$surfaceContainerHigh",
                  opacity: 0.9,
                }}
                hoverStyle={{
                  backgroundColor: "$surfaceContainerHigh",
                  opacity: 0.8,
                }}
              >
                <Stack position="relative">
                  <IconContainer scale={isActive ? 1.05 : 1} animation="quick">
                    {isActive && item.activeIcon ? item.activeIcon : item.icon}
                  </IconContainer>

                  {item.badge && (
                    <Badge
                      variant={item.badge.variant || "small"}
                      content={item.badge.content}
                      max={item.badge.max}
                      showZero={item.badge.showZero}
                      visible={item.badge.visible}
                      direction="topRight"
                    />
                  )}
                </Stack>

                {showLabel && (
                  <Label
                    active={isActive}
                    scale={isActive ? 1.05 : 1}
                    animation="quick"
                  >
                    {item.label}
                  </Label>
                )}
              </ItemContainer>
            );
          })}
        </Container>
      </XStack>
    );
  },
);

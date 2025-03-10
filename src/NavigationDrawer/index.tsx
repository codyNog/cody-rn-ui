"use client";
import { Menu, X } from "@tamagui/lucide-icons";
import { forwardRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AnimatePresence,
  Overlay,
  Stack,
  type TamaguiElement,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Button } from "../Button";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";

// ナビゲーションアイテムの型定義
export type NavigationItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  badge?: ReactNode;
  children?: NavigationItem[];
};

// NavigationDrawerのプロパティ型定義
type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right";
  width?: number | string;
  header?: ReactNode;
  items: NavigationItem[];
  footer?: ReactNode;
  closeOnSelect?: boolean;
  showToggleButton?: boolean;
};

// ドロワーコンテナのスタイル
const DrawerContainer = styled(YStack, {
  position: "absolute",
  top: 0,
  bottom: 0,
  height: "100vh", // 画面の高さいっぱいに
  width: 360, // デフォルト幅
  maxWidth: "80%",
  backgroundColor: "$surface", // Material Design 3のsurface色を使用
  ...elevationSystem.shadows.level2,
  zIndex: 1000,

  // アニメーション設定は個別に適用

  // バリアント
  variants: {
    side: {
      left: {
        left: 0,
        borderTopRightRadius: 28,
        borderBottomRightRadius: 28,
      },
      right: {
        right: 0,
        borderTopLeftRadius: 28,
        borderBottomLeftRadius: 28,
      },
    },
  },
  defaultVariants: {
    side: "left",
  },
});

// ヘッダーコンテナのスタイル
const HeaderContainer = styled(YStack, {
  paddingHorizontal: "$4",
  paddingVertical: "$4",
  borderBottomWidth: 1,
  borderBottomColor: "$outlineVariant",
});

// コンテンツコンテナのスタイル
const ContentContainer = styled(YStack, {
  flex: 1,
  paddingVertical: "$2",
  paddingHorizontal: "$4", // 水平方向のパディングを増やす
  overflow: "scroll",
});

// NavigationDrawer専用のアイテムコンポーネント
const DrawerItem = styled(XStack, {
  width: "100%",
  minHeight: 56,
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  alignItems: "center",
  gap: "$4",
  backgroundColor: "transparent",
  borderRadius: 28, // DrawerContainerと同じ丸み
  marginBottom: "$1",

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
    cursor: "pointer",
  },

  // バリアント
  variants: {
    isSelected: {
      true: {
        backgroundColor: "$secondaryContainer",
      },
    },
    isDisabled: {
      true: {
        opacity: 0.38,
        pointerEvents: "none",
      },
    },
  } as const,
});

// アイコンコンテナ
const LeadingContainer = styled(Stack, {
  justifyContent: "center",
  alignItems: "center",
  minWidth: 40,
  minHeight: 40,
});

// ラベルコンテナ
const LabelContainer = styled(YStack, {
  flex: 1,
  justifyContent: "center",
});

// バッジコンテナ
const TrailingContainer = styled(Stack, {
  justifyContent: "center",
  alignItems: "center",
  minWidth: 24,
  minHeight: 24,
  marginLeft: "auto",
});

// フッターコンテナのスタイル
const FooterContainer = styled(YStack, {
  paddingHorizontal: "$4",
  paddingVertical: "$4",
  borderTopWidth: 1,
  borderTopColor: "$outlineVariant",
});

// トグルボタンのスタイル
const ToggleButton = styled(Button, {
  position: "absolute",
  top: "$4",
  zIndex: 1001,

  variants: {
    side: {
      left: {
        left: "calc(360px + $4)",
      },
      right: {
        right: "calc(360px + $4)",
      },
    },
  },
  defaultVariants: {
    side: "left",
  },
});

export const NavigationDrawer = forwardRef<TamaguiElement, Props>(
  (
    {
      open,
      onOpenChange,
      side = "left",
      width = 360,
      header,
      items = [],
      footer,
      closeOnSelect = true,
      showToggleButton = false,
    },
    ref,
  ) => {
    // 内部の開閉状態
    const [isOpen, setIsOpen] = useState(open || false);
    const { top } = useSafeAreaInsets();
    // 外部からのopen状態の制御と内部状態の同期
    useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    // 開閉状態の変更ハンドラ
    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    // アイテム選択時のハンドラ
    const handleItemPress = (item: NavigationItem) => {
      item.onPress?.();
      if (closeOnSelect) {
        handleOpenChange(false);
      }
    };

    // ドロワーのトグル
    const toggleDrawer = () => {
      handleOpenChange(!isOpen);
    };

    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <Overlay
              key="overlay"
              animation={{
                type: "timing",
                duration: 300,
                easing: "easeInOut",
              }}
              backgroundColor="$scrim"
              opacity={0.3}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              onPress={() => handleOpenChange(false)}
              zIndex={1000} // 明示的にz-indexを設定
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <DrawerContainer
              ref={ref}
              side={side}
              width={width}
              key="drawer"
              animation={{
                type: "spring",
                damping: 15,
                stiffness: 250,
                mass: 0.8,
                duration: 500,
              }}
              enterStyle={{
                x: side === "left" ? -width : width,
                opacity: 0,
              }}
              exitStyle={{
                x: side === "left" ? -width : width,
                opacity: 0,
              }}
              x={0}
              opacity={1}
              zIndex={1001} // オーバーレイよりも高いz-indexを設定
              paddingTop={top}
            >
              {header && <HeaderContainer>{header}</HeaderContainer>}

              <ContentContainer>
                {items.map((item) => (
                  <DrawerItem
                    key={item.key}
                    isSelected={item.selected}
                    isDisabled={item.disabled}
                    onPress={() => handleItemPress(item)}
                  >
                    {item.icon && (
                      <LeadingContainer>{item.icon}</LeadingContainer>
                    )}

                    <LabelContainer>
                      <Text {...typographyScale.bodyLarge} color="$onSurface">
                        {item.label}
                      </Text>
                    </LabelContainer>

                    {item.badge && (
                      <TrailingContainer>{item.badge}</TrailingContainer>
                    )}
                  </DrawerItem>
                ))}
              </ContentContainer>

              {footer && <FooterContainer>{footer}</FooterContainer>}
            </DrawerContainer>
          )}
        </AnimatePresence>

        {showToggleButton && (
          <ToggleButton
            variant="filled"
            size="small"
            onPress={toggleDrawer}
            side={side}
          >
            {isOpen ? (
              <X size={20} color="$onSurface" />
            ) : (
              <Menu size={20} color="$onSurface" />
            )}
          </ToggleButton>
        )}
      </>
    );
  },
);

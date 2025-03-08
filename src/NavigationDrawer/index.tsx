"use client";
import { Menu, X } from "@tamagui/lucide-icons";
import { forwardRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  Overlay,
  YStack,
  XStack,
  type TamaguiElement,
  styled,
  Stack,
  Text,
} from "tamagui";
import { Button } from "../Button";
import { ListItem } from "../ListItem";
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

  // アニメーション設定
  animation: "quick",

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
  overflow: "scroll",
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
              animation="quick"
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
              enterStyle={{
                x: side === "left" ? -width : width,
                opacity: 0.5,
              }}
              exitStyle={{
                x: side === "left" ? -width : width,
                opacity: 0.5,
              }}
              zIndex={1001} // オーバーレイよりも高いz-indexを設定
            >
              {header && <HeaderContainer>{header}</HeaderContainer>}

              <ContentContainer>
                {items.map((item) => (
                  <ListItem
                    key={item.key}
                    headline={item.label}
                    leading={item.icon}
                    trailing={item.badge}
                    selected={item.selected}
                    disabled={item.disabled}
                    onPress={() => handleItemPress(item)}
                  />
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
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </ToggleButton>
        )}
      </>
    );
  },
);

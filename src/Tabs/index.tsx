"use client";
import { forwardRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ScrollView,
  SizableText,
  Stack,
  type TamaguiElement,
  Tabs as TamaguiTabs,
  View,
  YStack,
} from "tamagui";

type Tab = {
  children: ReactNode;
  value: string;
  label: string;
  icon?: ReactNode;
  scrollable?: boolean;
};

type Props = {
  tabs: Tab[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
  variant?: "primary" | "secondary";
  scrollable?: boolean;
};

export const Tabs = forwardRef<TamaguiElement, Props>(
  (
    {
      tabs,
      onValueChange,
      defaultValue,
      variant = "primary",
      scrollable = false,
    },
    ref,
  ) => {
    const initialValue = defaultValue || tabs[0]?.value || "";
    // 現在アクティブなタブの値を追跡するための状態
    const [activeValue, setActiveValue] = useState(initialValue);
    // アクティブなタブのインデックスを追跡
    const [activeIndex, setActiveIndex] = useState(
      tabs.findIndex((tab) => tab.value === initialValue),
    );

    // バリアントに基づいたスタイルの設定
    const isPrimary = variant === "primary";

    // タブリストのスタイル
    const tabListStyles = isPrimary
      ? {
          backgroundColor: "$surfaceContainerLow",
          borderBottomWidth: 1,
          borderBottomColor: "$outlineVariant",
          paddingHorizontal: "$2",
        }
      : {
          backgroundColor: "transparent",
          borderBottomWidth: 1,
          borderBottomColor: "$outlineVariant",
          paddingHorizontal: "$1",
        };

    // タブ自体のスタイル
    const getTabStyles = () => {
      if (isPrimary) {
        return {
          height: 48,
          backgroundColor: "transparent",
          hoverStyle: { backgroundColor: "$surfaceContainerHigh" },
          focusStyle: { backgroundColor: "$surfaceContainerHigh" },
          pressStyle: { backgroundColor: "$surfaceContainerHigh" },
        };
      }

      return {
        height: 40,
        paddingHorizontal: "$2",
        backgroundColor: "transparent",
        hoverStyle: { backgroundColor: "$surfaceContainerHigh" },
        focusStyle: { backgroundColor: "$surfaceContainerHigh" },
        pressStyle: { backgroundColor: "$surfaceContainerHigh" },
      };
    };

    // テキストのスタイル
    const getTextStyles = (isActive: boolean) => {
      if (isPrimary) {
        return {
          fontFamily: "$body" as const,
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0.1,
          fontWeight: "500" as const,
          color: isActive ? "$primary" : "$onSurface",
          animation: "quick" as const,
        };
      }

      return {
        fontFamily: "$body" as const,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        fontWeight: "500" as const,
        color: isActive ? "$primary" : "$onSurface",
        animation: "quick" as const,
      };
    };

    // アクティブなタブが変更されたときにインデックスを更新
    useEffect(() => {
      const newIndex = tabs.findIndex((tab) => tab.value === activeValue);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }, [activeValue, tabs, activeIndex]);

    // インジケーターの位置を計算
    const getIndicatorPosition = () => {
      if (scrollable) {
        // scrollable の場合は固定幅を使用
        return {
          left: 0,
          width: "50%",
          transform: `translateX(${activeIndex * 100}%)`,
        };
      }

      // 通常のタブの場合は従来の計算方法
      const tabWidth = 100 / tabs.length;
      const indicatorWidth = tabWidth * 0.5; // タブ幅の50%
      const leftOffset =
        tabWidth * activeIndex + (tabWidth - indicatorWidth) / 2;
      return {
        left: `${leftOffset}%`,
        width: `${indicatorWidth}%`,
        transform: "none",
      };
    };

    const indicatorPosition = getIndicatorPosition();

    return (
      <TamaguiTabs
        ref={ref}
        defaultValue={initialValue}
        orientation="horizontal"
        flexDirection="column"
        overflow="hidden"
        value={activeValue}
        onValueChange={(value) => {
          setActiveValue(value);
          onValueChange(value);
        }}
        flex={1}
        height="100%"
      >
        <YStack
          backgroundColor={isPrimary ? "$surfaceContainerLow" : "transparent"}
          position="relative"
        >
          {scrollable ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TamaguiTabs.List aria-label="tabs" {...tabListStyles}>
                {tabs.map(({ value, label, icon }) => {
                  const isActive = value === activeValue;
                  const tabStyles = getTabStyles();
                  const textStyles = getTextStyles(isActive);

                  return (
                    <TamaguiTabs.Tab
                      key={value}
                      value={value}
                      width={120} // スクロール可能なタブの固定幅
                      justifyContent="center"
                      alignItems="center"
                      position="relative"
                      {...tabStyles}
                    >
                      <YStack
                        space="$1"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {icon && (
                          <Stack opacity={isActive ? 1 : 0.8}>{icon}</Stack>
                        )}
                        <SizableText {...textStyles}>{label}</SizableText>
                      </YStack>
                    </TamaguiTabs.Tab>
                  );
                })}
              </TamaguiTabs.List>
            </ScrollView>
          ) : (
            <TamaguiTabs.List aria-label="tabs" {...tabListStyles}>
              {tabs.map(({ value, label, icon }) => {
                const isActive = value === activeValue;
                const tabStyles = getTabStyles();
                const textStyles = getTextStyles(isActive);

                return (
                  <TamaguiTabs.Tab
                    key={value}
                    value={value}
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    {...tabStyles}
                  >
                    <YStack
                      space="$1"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {icon && (
                        <Stack opacity={isActive ? 1 : 0.8}>{icon}</Stack>
                      )}
                      <SizableText {...textStyles}>{label}</SizableText>
                    </YStack>
                  </TamaguiTabs.Tab>
                );
              })}
            </TamaguiTabs.List>
          )}

          {/* 共通のインジケーター */}
          {scrollable ? (
            <Stack
              position="absolute"
              bottom={0}
              height={isPrimary ? 3 : 2}
              borderRadius="$1"
              backgroundColor="$primary"
              left={0}
              width={60} // 固定幅のインジケーター
              animation="medium"
              animateOnly={["transform"]}
              transform={[{ translateX: activeIndex * 120 + 30 }]} // タブの中央に配置
            />
          ) : (
            <Stack
              position="absolute"
              bottom={0}
              height={isPrimary ? 3 : 2}
              borderRadius="$1"
              backgroundColor="$primary"
              left={indicatorPosition.left}
              width={indicatorPosition.width}
              animation="medium"
              animateOnly={["left", "width"]}
            />
          )}
        </YStack>

        {tabs.map(({ value, children }) => {
          return (
            <TamaguiTabs.Content
              key={value}
              value={value}
              backgroundColor="$surface"
              flex={1}
            >
              <ScrollView
                flex={1}
                contentContainerStyle={{
                  padding: isPrimary ? 16 : 12,
                  paddingBottom: 32, // スクロール時に下部が見切れないように余分にパディングを追加
                }}
              >
                {children}
              </ScrollView>
            </TamaguiTabs.Content>
          );
        })}
      </TamaguiTabs>
    );
  },
);

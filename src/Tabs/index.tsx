"use client";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Animated, View, useWindowDimensions } from "react-native";
import {
  ScrollView,
  Stack,
  type TamaguiElement,
  Text,
  XStack,
  YStack,
  getTokens,
  styled,
} from "tamagui";
import type { BadgeVariant } from "../Badge";
import { Badge } from "../Badge";
import { elevationSystem, typographyScale } from "../theme";

// タブアイテムの型定義
type TabItem = {
  label: string;
  value: string;
  icon?: ReactNode;
  badge?: {
    content?: ReactNode;
    variant?: BadgeVariant;
    visible?: boolean;
  };
  children?: ReactNode;
};

// Tabsコンポーネントのプロパティ
type TabsProps = {
  // タブの項目データ
  tabs: TabItem[];
  // デフォルトで選択されるタブの値
  defaultValue?: string;
  // タブ変更時のコールバック
  onValueChange?: (value: string) => void;
  // タブのバリエーション
  variant?: "fixed" | "scrollable" | "secondary";
  // タブの位置
  position?: "top" | "bottom";
  // タブコンテンツ
  children?: ReactNode;
  // スワイプを有効にするかどうか
  swipeable?: boolean;
  // アニメーション速度
  animationDuration?: number;
};

// TabsListコンポーネントのプロパティ
type TabsListProps = {
  tabs: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  variant: "fixed" | "scrollable" | "secondary";
};

// TabsContentコンポーネントのプロパティ
type TabsContentProps = {
  tabs: TabItem[];
  activeValue: string;
  swipeable?: boolean;
  onChange: (value: string) => void;
  children?: ReactNode;
};

// TabPanelコンポーネントのプロパティ
type TabPanelProps = {
  value: string;
  children?: ReactNode;
};

// タブリストコンテナのスタイル
const TabsListContainer = styled(XStack, {
  width: "100%", // 親要素に合わせて幅を調整
  backgroundColor: "$surfaceContainer",
  ...elevationSystem.shadows.level1,

  variants: {
    variant: {
      fixed: {
        minHeight: 48, // 標準的な高さ
      },
      scrollable: {
        minHeight: 48, // 標準的な高さ
      },
      secondary: {
        minHeight: 40, // よりコンパクトな高さ
      },
    },
    hasIcons: {
      true: {
        minHeight: 72, // アイコンがある場合の高さ
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "fixed",
    hasIcons: false,
  },
});

// タブアイテムのスタイル
const TabItemContainer = styled(YStack, {
  alignItems: "center",
  justifyContent: "center",
  height: "100%",

  variants: {
    variant: {
      fixed: {
        flex: 1, // 均等に分割
        paddingHorizontal: "$3",
      },
      scrollable: {
        minWidth: 80, // 最小幅を設定
        paddingHorizontal: "$1", // 左右のパディングを小さく設定
      },
      secondary: {
        minWidth: 70, // よりコンパクトな最小幅
        paddingHorizontal: "$1", // 左右のパディングを小さく設定
      },
    },
    active: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    variant: "fixed",
    active: false,
  },
});

// タブラベルのスタイル
const TabLabel = styled(Text, {
  ...typographyScale.titleSmall,
  textAlign: "center",

  variants: {
    variant: {
      fixed: {},
      scrollable: {},
      secondary: {
        ...typographyScale.labelLarge,
      },
    },
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
    variant: "fixed",
    active: false,
  },
});

// タブコンテンツコンテナのスタイル
const ContentContainer = styled(YStack, {
  width: "100%",
  flex: 1,
});

// タブパネルのスタイル
const TabPanelContainer = styled(YStack, {
  width: "100%",
  flex: 1,
});

// アイコンコンテナのスタイル
const IconContainer = styled(Stack, {
  width: 24,
  height: 24,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "$1",
});

/**
 * TabsList - タブのリストを表示するコンポーネント
 */
const TabsList = ({ tabs, activeValue, onChange, variant }: TabsListProps) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  // React Native の View コンポーネントの参照を保持
  // biome-ignore lint/suspicious/noExplicitAny: React Native の measureLayout メソッドを使用するために必要
  const itemRefs = useRef<{ [key: string]: any }>({});
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  // indicatorPosition変数は使用しないため削除

  // 各タブの位置と幅を保存するためのステート
  const [tabLayouts, setTabLayouts] = useState<{
    [key: string]: { width: number; x: number };
  }>({});

  // アクティブなタブが変更されたときにインジケーターを更新
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeValue);
    if (activeIndex >= 0) {
      // 現在のアクティブタブのレイアウト情報を取得
      const activeTabLayout = tabLayouts[activeValue];

      if (activeTabLayout) {
        // インジケーターの位置と幅を更新
        setIndicatorWidth(activeTabLayout.width);

        // アニメーションを開始
        Animated.timing(indicatorAnim, {
          toValue: activeTabLayout.x,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      // スクロール可能な場合、アクティブなタブが見えるようにスクロール
      if (
        variant === "scrollable" &&
        scrollViewRef.current &&
        itemRefs.current[activeValue]
      ) {
        const currentRef = itemRefs.current[activeValue];
        const scrollRef = scrollViewRef.current;

        if (currentRef) {
          currentRef.measureLayout(
            // @ts-ignore - measureLayout expects a host component
            scrollRef,
            (x: number) => {
              scrollRef.scrollTo({ x: x - 20, animated: true });
            },
            () => {},
          );
        }
      }
    }
  }, [activeValue, tabs, indicatorAnim, variant, tabLayouts]);

  // タブアイテムのレイアウトが変更されたときにレイアウト情報を保存
  const updateTabLayout = (value: string, width: number, x: number) => {
    setTabLayouts((prev) => ({
      ...prev,
      [value]: { width, x },
    }));
  };

  // インジケーターのスタイル
  const indicatorStyle = {
    position: "absolute" as const,
    bottom: 0,
    height: 3,
    width: indicatorWidth,
    backgroundColor: "#6750A4", // Material Design 3のデフォルト紫色
    borderRadius: 1.5, // 角丸
    transform: [
      {
        translateX: indicatorAnim,
      },
    ],
  };

  // タブにアイコンがあるかどうかを確認
  const hasIcons = tabs.some((tab) => !!tab.icon);

  return (
    <XStack width="100%" justifyContent="center">
      <TabsListContainer variant={variant} hasIcons={hasIcons}>
        {variant === "fixed" ? (
          // 固定タブの場合は均等に分割
          <>
            {tabs.map((tab) => {
              const isActive = tab.value === activeValue;
              return (
                <TabItemContainer
                  key={tab.value}
                  variant={variant}
                  active={isActive}
                  onPress={() => onChange(tab.value)}
                  ref={(ref) => {
                    itemRefs.current[tab.value] = ref;
                  }}
                  onLayout={(e) => {
                    const { width, x } = e.nativeEvent.layout;
                    updateTabLayout(tab.value, width, x);
                  }}
                  hoverStyle={{ cursor: "pointer" }}
                >
                  {tab.icon && (
                    <Stack position="relative">
                      <IconContainer>{tab.icon}</IconContainer>
                      {tab.badge && (
                        <Badge
                          variant={tab.badge.variant || "small"}
                          content={tab.badge.content}
                          visible={tab.badge.visible}
                          direction="topRight"
                        />
                      )}
                    </Stack>
                  )}
                  <TabLabel variant={variant} active={isActive}>
                    {tab.label}
                  </TabLabel>
                </TabItemContainer>
              );
            })}
          </>
        ) : (
          // スクロール可能またはセカンダリータブの場合は中央揃え
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              minWidth: "100%", // 最小幅を100%に設定
              justifyContent: "center", // 中央揃え
              paddingHorizontal: 0, // パディングなし
            }}
          >
            {tabs.map((tab) => {
              const isActive = tab.value === activeValue;
              return (
                <TabItemContainer
                  key={tab.value}
                  variant={variant}
                  active={isActive}
                  onPress={() => onChange(tab.value)}
                  ref={(ref) => {
                    itemRefs.current[tab.value] = ref;
                  }}
                  onLayout={(e) => {
                    const { width, x } = e.nativeEvent.layout;
                    updateTabLayout(tab.value, width, x);
                  }}
                >
                  {tab.icon && (
                    <Stack position="relative">
                      <IconContainer>{tab.icon}</IconContainer>
                      {tab.badge && (
                        <Badge
                          variant={tab.badge.variant || "small"}
                          content={tab.badge.content}
                          visible={tab.badge.visible}
                          direction="topRight"
                        />
                      )}
                    </Stack>
                  )}
                  <TabLabel variant={variant} active={isActive}>
                    {tab.label}
                  </TabLabel>
                </TabItemContainer>
              );
            })}
          </ScrollView>
        )}
        <Animated.View style={indicatorStyle} />
      </TabsListContainer>
    </XStack>
  );
};

/**
 * TabPanel - 個々のタブパネルを表示するコンポーネント
 */
export const TabPanel = forwardRef<TamaguiElement, TabPanelProps>(
  ({ value, children, ...props }, ref) => {
    return (
      <TabPanelContainer ref={ref} {...props}>
        {children}
      </TabPanelContainer>
    );
  },
);

/**
 * TabsContent - タブコンテンツを表示するコンポーネント
 */
const TabsContent = ({
  tabs,
  activeValue,
  swipeable = true,
  onChange,
  children,
}: TabsContentProps) => {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView | null>(null);
  // scrollEnabled変数は使用されていないため削除

  // アクティブなタブが変更されたときにスクロールビューをスクロール
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeValue);
    if (activeIndex >= 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: activeIndex * width,
        animated: true,
      });
    }
  }, [activeValue, tabs, width]);

  // スクロールが終了したときにアクティブなタブを更新
  const handleScrollEnd = (e: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    if (page >= 0 && page < tabs.length) {
      const newValue = tabs[page].value;
      if (newValue !== activeValue) {
        onChange(newValue);
      }
    }
  };

  // 子要素をフィルタリングしてタブパネルのみを取得
  const tabPanels = Children.toArray(children).filter(
    (child) =>
      isValidElement(child) && (child.type === TabPanel || child.props.value),
  );

  // タブの内容を表示
  const renderTabContent = () => {
    // 子要素が提供されている場合はそれを使用
    if (tabPanels.length > 0) {
      return tabPanels.map((child, i) => {
        if (isValidElement(child)) {
          // 一意のキーを生成
          const tabValue = child.props.value || `tab-panel-${i}`;
          return (
            <YStack key={tabValue} width={width} height="100%">
              {cloneElement(child)}
            </YStack>
          );
        }
        return null;
      });
    }

    // 子要素がない場合はtabsのchildrenを使用
    return tabs.map((tab) => {
      return (
        <YStack key={tab.value} width={width} height="100%">
          {tab.children}
        </YStack>
      );
    });
  };

  return (
    <ContentContainer>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={swipeable}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast" // スワイプの減速率を速くして、より明確なページング効果を得る
      >
        {renderTabContent()}
      </ScrollView>
    </ContentContainer>
  );
};

/**
 * Tabs - Material Design 3のガイドラインに準拠したタブコンポーネント
 */
export const Tabs = forwardRef<TamaguiElement, TabsProps>(
  (
    {
      tabs,
      defaultValue,
      onValueChange,
      variant = "fixed",
      position = "top",
      swipeable = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [activeValue, setActiveValue] = useState(
      defaultValue || tabs[0]?.value || "",
    );

    const handleChange = (value: string) => {
      setActiveValue(value);
      onValueChange?.(value);
    };

    return (
      <YStack ref={ref} flex={1} {...props}>
        {position === "top" && (
          <TabsList
            tabs={tabs}
            activeValue={activeValue}
            onChange={handleChange}
            variant={variant}
          />
        )}

        <TabsContent
          tabs={tabs}
          activeValue={activeValue}
          swipeable={swipeable}
          onChange={handleChange}
        >
          {children}
        </TabsContent>

        {position === "bottom" && (
          <TabsList
            tabs={tabs}
            activeValue={activeValue}
            onChange={handleChange}
            variant={variant}
          />
        )}
      </YStack>
    );
  },
);

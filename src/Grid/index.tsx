"use client";
import { Children, forwardRef, useMemo } from "react";
import type { ReactElement, ReactNode, Ref } from "react";
import { useWindowDimensions } from "react-native";
import { View, XStack } from "tamagui";
import type { GetProps, TamaguiElement } from "tamagui";

// Material Design 3のグリッドシステムの定義
// レスポンシブデザイン、ガターとマージンをサポート
// 画面サイズに応じてカラム数が変わる
//  - スモールスクリーン（600px未満）: 4カラム
//  - ミディアムスクリーン（600px以上905px未満）: 8カラム
//  - ラージスクリーン（905px以上）: 12カラム

// グリッドのプロパティ
type GridContainerProps = {
  ref?: Ref<TamaguiElement>;
  children?: ReactNode;
  fluid?: boolean; // trueの場合、コンテナの幅が100%になる
  maxWidth?: number | string; // コンテナの最大幅
  padding?: number | string; // コンテナのパディング
} & GetProps<typeof View>;

// グリッドの行のプロパティ
type GridRowProps = {
  ref?: Ref<TamaguiElement>;
  children?: ReactNode;
  gutter?: number | string | [number | string, number | string]; // 行のガター（水平、垂直）
  wrap?: boolean; // 行の折り返し
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
} & GetProps<typeof XStack>;

// グリッドの列のプロパティ
type GridColumnProps = {
  ref?: Ref<TamaguiElement>;
  children?: ReactNode;
  span?: number; // 列の幅（1-12）
  offset?: number; // 列のオフセット（0-11）
  sm?: number; // スモールスクリーンでの列の幅
  md?: number; // ミディアムスクリーンでの列の幅
  lg?: number; // ラージスクリーンでの列の幅
  xl?: number; // エクストララージスクリーンでの列の幅
  padding?: number | string; // 列のパディング
} & GetProps<typeof View>;

// ブレークポイントとカラム数（Material Design 3の仕様に基づく）
const breakpoints = {
  sm: 600, // スモールスクリーン
  md: 905, // ミディアムスクリーン
  lg: 1240, // ラージスクリーン
  xl: 1440, // エクストララージスクリーン
};

// 画面サイズに応じたカラム数
const columnsForWidth = {
  xs: 4, // 600px未満
  sm: 8, // 600px以上905px未満
  md: 12, // 905px以上1240px未満
  lg: 12, // 1240px以上1440px未満
  xl: 12, // 1440px以上
};

// 現在の画面サイズに基づいてブレークポイントを取得する関数
const getBreakpoint = (width: number) => {
  if (width < breakpoints.sm) return "xs";
  if (width < breakpoints.md) return "sm";
  if (width < breakpoints.lg) return "md";
  if (width < breakpoints.xl) return "lg";
  return "xl";
};

// 現在の画面サイズに基づいてカラム数を取得する関数
const getColumnsForWidth = (width: number) => {
  const breakpoint = getBreakpoint(width);
  return columnsForWidth[breakpoint as keyof typeof columnsForWidth];
};

// グリッドコンテナコンポーネント
const Container = forwardRef<TamaguiElement, GridContainerProps>(
  (
    {
      children,
      fluid = false,
      maxWidth = fluid ? "100%" : breakpoints.lg,
      padding = "$4",
      ...props
    },
    ref,
  ) => {
    return (
      <View
        ref={ref}
        width="100%"
        maxWidth={maxWidth}
        marginHorizontal="auto"
        paddingHorizontal={padding}
        alignSelf="center"
        {...props}
      >
        {children}
      </View>
    );
  },
);

// Material Design 3のグリッドシステムの定数
// カラム間のgap（Material Design 3の規則に従った固定値）
// 8dpの倍数を使用（ここでは8dp = $2と仮定）
const GRID_GAP = "$2";

// グリッド行コンポーネント
const Row = forwardRef<TamaguiElement, GridRowProps>(
  (
    {
      children,
      gutter = "$4",
      wrap = true,
      justifyContent = "flex-start",
      alignItems = "stretch",
      ...props
    },
    ref,
  ) => {
    // ガターの計算
    const [horizontalGutter, verticalGutter] = Array.isArray(gutter)
      ? gutter
      : [gutter, gutter];

    // 子要素の数を確認
    const childCount = Children.count(children);

    // 子要素が1つしかない場合はガターを適用しない
    const shouldApplyGutter = childCount > 1;

    // 現在の画面幅を取得
    const { width } = useWindowDimensions();

    // 現在の画面サイズに基づいてカラム数を取得
    const totalColumns = useMemo(() => getColumnsForWidth(width), [width]);

    // 子要素のspanの合計を計算し、必要に応じて警告を表示
    const childrenWithValidation = useMemo(() => {
      if (!children) return null;

      let totalSpan = 0;
      const rowChildren: ReactNode[] = [];

      Children.forEach(children, (child) => {
        if (!child) return;

        // Grid.Columnコンポーネントからspanプロパティを取得
        const columnProps = (child as ReactElement<GridColumnProps>)?.props;
        const span = columnProps?.span || 12;

        // 現在のブレークポイントに基づいてレスポンシブなspanを取得
        const breakpoint = getBreakpoint(width);
        let responsiveSpan = span;

        if (breakpoint === "xs" && columnProps?.sm !== undefined) {
          responsiveSpan = columnProps.sm;
        } else if (breakpoint === "sm" && columnProps?.md !== undefined) {
          responsiveSpan = columnProps.md;
        } else if (breakpoint === "md" && columnProps?.lg !== undefined) {
          responsiveSpan = columnProps.lg;
        } else if (
          (breakpoint === "lg" || breakpoint === "xl") &&
          columnProps?.xl !== undefined
        ) {
          responsiveSpan = columnProps.xl;
        }

        totalSpan += responsiveSpan;
        rowChildren.push(child);

        // 開発環境での警告（totalColumnsを超える場合）
        if (process.env.NODE_ENV !== "production" && totalSpan > totalColumns) {
          console.warn(
            `Grid.Row: 子要素のspanの合計(${totalSpan})がtotalColumns(${totalColumns})を超えています。自動的に折り返されます。`,
          );
        }
      });

      return rowChildren;
    }, [children, width, totalColumns]);

    return (
      <XStack
        ref={ref}
        flexWrap={wrap ? "wrap" : "nowrap"}
        justifyContent={justifyContent}
        alignItems={alignItems}
        marginHorizontal={
          shouldApplyGutter
            ? typeof horizontalGutter === "number"
              ? -horizontalGutter / 2
              : `calc(${horizontalGutter} * -0.5)` // トークンを使った計算
            : undefined
        }
        marginVertical={
          shouldApplyGutter
            ? typeof verticalGutter === "number"
              ? -verticalGutter / 2
              : `calc(${verticalGutter} * -0.5)` // トークンを使った計算
            : undefined
        }
        // 子要素が1つしかない場合はgapを適用しない
        gap={shouldApplyGutter ? GRID_GAP : undefined}
        {...props}
      >
        {childrenWithValidation}
      </XStack>
    );
  },
);

// グリッド列コンポーネント
const Column = forwardRef<TamaguiElement, GridColumnProps>(
  (
    { children, span = 12, offset = 0, sm, md, lg, xl, padding, ...props },
    ref,
  ) => {
    // 現在の画面幅を取得
    const { width } = useWindowDimensions();

    // 現在の画面サイズに基づいてカラム数を取得
    const totalColumns = useMemo(() => getColumnsForWidth(width), [width]);

    // 現在のブレークポイントを取得
    const breakpoint = useMemo(() => getBreakpoint(width), [width]);

    // 実際に使用するspan
    const responsiveSpan = useMemo(() => {
      if (breakpoint === "xs" && sm !== undefined) return sm;
      if (breakpoint === "sm" && md !== undefined) return md;
      if (breakpoint === "md" && lg !== undefined) return lg;
      if ((breakpoint === "lg" || breakpoint === "xl") && xl !== undefined)
        return xl;
      return span;
    }, [breakpoint, sm, md, lg, xl, span]);

    // spanが総カラム数を超えないように制限
    const clampedSpan = useMemo(() => {
      return Math.min(responsiveSpan, totalColumns);
    }, [responsiveSpan, totalColumns]);

    // レスポンシブな幅の計算
    // Material Design 3のグリッドシステムに準拠した幅計算
    const columnWidth = useMemo(() => {
      // 各カラムの基本幅（gapを考慮しない場合）
      const baseWidth = clampedSpan / totalColumns;

      // カラム間のgapの合計幅（カラム数 - 1）* gap
      // 8pxはGRID_GAPの$2に相当する値と仮定
      const gapWidth = 8; // pxで指定

      // 実際の幅計算
      // 各カラムの幅 = (基本幅 * 100%) - (gap調整)
      return `calc(${baseWidth * 100}% - ${gapWidth * (1 - baseWidth)}px)`;
    }, [clampedSpan, totalColumns]);

    // オフセットの計算
    const marginLeft = useMemo(() => {
      if (offset === 0) return 0;
      return `${(offset / totalColumns) * 100}%`;
    }, [offset, totalColumns]);

    return (
      <View
        ref={ref}
        width={columnWidth}
        marginLeft={marginLeft}
        padding={padding}
        {...props}
      >
        {children}
      </View>
    );
  },
);

export const Grid = {
  Container,
  Row,
  Column,
  // ブレークポイントとカラム数をエクスポート
  breakpoints,
  columnsForWidth,
  getBreakpoint,
  getColumnsForWidth,
};

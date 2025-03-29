"use client";
import { forwardRef, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  Easing,
} from "react-native-reanimated";
import { type TamaguiElement, View, YStack, useTheme } from "tamagui";

type SkeletonProps = {
  /**
   * スケルトンの幅
   */
  width?: number | string;
  /**
   * スケルトンの高さ
   */
  height?: number | string;
  /**
   * スケルトンの形状
   * @default 'rect'
   */
  variant?: "rect" | "circle";
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const Skeleton = forwardRef<TamaguiElement, SkeletonProps>(
  ({ width = "100%", height = 20, variant = "rect" }, ref) => {
    const theme = useTheme();
    const progress = useSharedValue(0);

    // ベースカラーとハイライトカラーをテーマから取得
    // surfaceContainerLow をベースに、少し明るい色をハイライトにする
    // 例: lightモード: surfaceContainerLow -> surfaceContainer
    //     darkモード: darkSurfaceContainerLow -> darkSurfaceContainer
    // useTheme() は現在のテーマモードに応じて適切な色を返すはず
    // ?. と ?? を使って、万が一テーマ変数が取得できなかった場合のフォールバックを設定
    const baseColor = theme.surfaceContainerLow?.val ?? "#EEEEEE"; // フォールバック色 (ライトグレー)
    const highlightColor = theme.surfaceContainer?.val ?? "#DDDDDD"; // フォールバック色 (少し濃いグレー)

    useEffect(() => {
      // 0 -> 1 -> 0 のアニメーションを繰り返す
      progress.value = withRepeat(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1, // 無限に繰り返す
        true, // 逆再生する (1 -> 0)
      );
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => {
      // progress (0~1) に応じて色を補間
      const backgroundColor = interpolateColor(
        progress.value,
        [0, 1],
        [baseColor, highlightColor],
      );
      return {
        backgroundColor,
      };
      // baseColor と highlightColor が変更されたときにスタイルを再計算するように依存配列を指定
    }, [baseColor, highlightColor]);

    const borderRadius = variant === "circle" ? 9999 : "$2"; // $2 は theme/index.ts の radius.$2 (8)

    return (
      <YStack ref={ref}>
        <AnimatedView
          width={width}
          height={height}
          borderRadius={borderRadius}
          overflow="hidden" // borderRadiusを適用するために必要
          style={animatedStyle}
        />
      </YStack>
    );
  },
);

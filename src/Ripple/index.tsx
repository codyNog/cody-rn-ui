import { useCallback, useState } from "react";
import type { FC, ReactNode } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import type { GestureResponderEvent, ViewStyle } from "react-native";

export interface RippleProps {
  /**
   * 子要素（ラップするコンポーネント）
   */
  children: ReactNode;
  /**
   * Rippleの色
   * @default "rgba(0, 0, 0, 0.12)"
   */
  color?: string;
  /**
   * Rippleアニメーションの持続時間（ミリ秒）
   * @default 400
   */
  duration?: number;
  /**
   * Rippleエフェクトを無効にするかどうか
   * @default false
   */
  disabled?: boolean;
  /**
   * コンテナのスタイル
   */
  style?: ViewStyle;
  /**
   * プレス時のコールバック
   */
  onPress?: () => void;
  /**
   * Rippleの最大サイズの倍率
   * @default 2
   */
  maxScale?: number;
  /**
   * Rippleを常に中央から開始するかどうか
   * @default false
   */
  centerRipple?: boolean;
}

/**
 * Material Design 3のRippleエフェクトを実装したコンポーネント
 *
 * タッチ位置から波紋が広がるアニメーションを提供します。
 * インタラクティブな要素（ボタン、アイコンボタンなど）をラップして使用します。
 *
 * @example
 * ```tsx
 * <Ripple onPress={() => console.log('Pressed')}>
 *   <View style={{ padding: 16 }}>
 *     <Text>Press me</Text>
 *   </View>
 * </Ripple>
 * ```
 */
export const Ripple: FC<RippleProps> = ({
  children,
  color = "rgba(0, 0, 0, 0.5)", // より濃い色に変更
  duration = 600, // 長めの持続時間
  disabled = false,
  style,
  onPress,
  maxScale = 3, // より大きなスケール
  centerRipple = false, // 中央からRippleを開始するかどうか
}) => {
  // タッチ位置の状態
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  // リップルの表示状態
  const [isRippleVisible, setIsRippleVisible] = useState(false);

  // React Native の標準 Animated API を使用
  const scale = useState(new Animated.Value(0))[0];
  const opacity = useState(new Animated.Value(0.8))[0];

  // アニメーションの完了時に呼ばれるコールバック
  const onAnimationComplete = useCallback(() => {
    setIsRippleVisible(false);
  }, []);

  // コンポーネントのサイズを保持する参照
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

  // コンポーネントのサイズを測定する関数
  const measureComponent = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { width, height } = event.nativeEvent.layout;
      setComponentSize({ width, height });
    },
    [],
  );

  // プレス時の処理
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) return;

      // タッチ位置を取得（相対座標）
      let touchX: number;
      let touchY: number;

      if (centerRipple) {
        // 中央からRippleを開始する場合
        touchX = componentSize.width / 2;
        touchY = componentSize.height / 2;
      } else {
        // タッチ位置からRippleを開始する場合
        // 注意: nativeEventのlocationXとlocationYはコンポーネント内の相対座標
        touchX = event.nativeEvent.locationX || componentSize.width / 2;
        touchY = event.nativeEvent.locationY || componentSize.height / 2;
      }

      // タッチ位置を設定
      setRipplePosition({ x: touchX, y: touchY });
      setIsRippleVisible(true);

      // アニメーションをリセット
      scale.setValue(0);
      opacity.setValue(0.8);

      // アニメーションを開始
      Animated.parallel([
        Animated.timing(scale, {
          toValue: maxScale,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start(onAnimationComplete);

      // onPressコールバックを呼び出す
      if (onPress) {
        onPress();
      }
    },
    [
      disabled,
      centerRipple,
      maxScale,
      duration,
      onPress,
      scale,
      opacity,
      onAnimationComplete,
      componentSize,
    ],
  );

  return (
    <Pressable
      onPress={handlePress}
      onLayout={measureComponent}
      style={[styles.container, style]}
    >
      {children}
      {isRippleVisible && (
        <View style={styles.rippleContainer} pointerEvents="none">
          <Animated.View
            style={[
              styles.ripple,
              {
                backgroundColor: color,
                left: ripplePosition.x,
                top: ripplePosition.y,
                transform: [{ scale: scale }],
                opacity: opacity,
              },
            ]}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  rippleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 10, // 重なり順序を高く設定
    elevation: 10, // Androidでの重なり順序
  },
  ripple: {
    position: "absolute",
    width: 80, // さらに大きな初期サイズ
    height: 80, // さらに大きな初期サイズ
    borderRadius: 40, // 円形のリップル
    // 中心から広がるように位置を調整
    marginLeft: -40,
    marginTop: -40,
    backgroundColor: "currentColor", // 親から継承した色を使用
  },
});

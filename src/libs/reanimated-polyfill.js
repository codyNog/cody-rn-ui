// react-native-reanimatedのpolyfill
// Storybookのブラウザ環境でReanimatedの関数をモックします

import { useRef } from "react";

// グローバルオブジェクトにReanimated関数を追加
if (typeof window !== "undefined") {
  // ブラウザ環境でのみ実行
  window.requestAnimationFrame =
    window.requestAnimationFrame || ((fn) => setTimeout(fn, 0));

  // グローバルオブジェクトに関数を追加
  global.useAnimatedNumber = (initialValue) => {
    const ref = { current: initialValue };
    return {
      get value() {
        return ref.current;
      },
      setValue: (newValue) => {
        ref.current = newValue;
      },
    };
  };

  global.G = () => {};
}

// モック用のダミー関数
const noop = () => {};

// Animated
const Animated = {
  createAnimatedComponent: (Component) => Component,
  View: "View",
  Text: "Text",
  Image: "Image",
  ScrollView: "ScrollView",
  FlatList: "FlatList",
  event: () => noop,
};

// useSharedValueのモック
export const useSharedValue = (initialValue) => {
  const ref = useRef(initialValue);
  return {
    get value() {
      return ref.current;
    },
    set value(newValue) {
      ref.current = newValue;
    },
  };
};

// useAnimatedStyleのモック
export const useAnimatedStyle = (styleCallback) => {
  return styleCallback();
};

// withRepeatのモック
export const withRepeat = (animation) => {
  return animation;
};

// withTimingのモック
export const withTiming = (toValue) => {
  return toValue;
};

// interpolateColorのモック
export const interpolateColor = (_value, _inputRange, outputColorRange) => {
  // 単純化のため、最初の色を返す
  return outputColorRange[0];
};

// Easingのモック
export const Easing = {
  inOut: () => (x) => x,
  ease: (x) => x,
};

// useAnimatedNumberのモック
export const useAnimatedNumber = (initialValue) => {
  const ref = useRef(initialValue);

  return {
    get value() {
      return ref.current;
    },
    setValue: (newValue) => {
      ref.current = newValue;
    },
  };
};

// G関数のモック（エラーメッセージに基づく）
export const G = () => {};

// その他のReanimated関数のモック
export const useAnimatedGestureHandler = () => ({});
export const useAnimatedScrollHandler = () => ({});
export const useAnimatedRef = () => ({ current: null });
export const useDerivedValue = (derivation) => ({ value: derivation() });
export const useAnimatedReaction = () => {};
export const useAnimatedProps = () => ({});
export const withSpring = (toValue) => toValue;
export const withDecay = (config) => config.velocity;
export const cancelAnimation = () => {};
export const measure = () => ({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  pageX: 0,
  pageY: 0,
});
export const runOnJS = (fn) => fn;
export const runOnUI = (fn) => fn;

// デフォルトエクスポート
export default {
  Animated,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  Easing,
  useAnimatedNumber,
  G,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useDerivedValue,
  useAnimatedReaction,
  useAnimatedProps,
  withSpring,
  withDecay,
  cancelAnimation,
  measure,
  runOnJS,
  runOnUI,
};

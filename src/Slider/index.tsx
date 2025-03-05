"use client";
import { forwardRef } from "react";
import type { Ref } from "react";
import type { TamaguiElement } from "tamagui";
import { Slider as TamaguiSlider, Text, XStack, styled } from "tamagui";
import { stateLayerOpacity } from "../theme";

// Material Design 3のスタイルを適用したスライダートラック
const StyledTrack = styled(TamaguiSlider.Track, {
  height: 4,
  backgroundColor: "$surfaceContainerHighest",
  borderRadius: 2,

  // サイズバリエーション
  variants: {
    size: {
      $2: { height: 2 },
      $3: { height: 4 },
      $4: { height: 6 },
      $5: { height: 8 },
    },
  },
  defaultVariants: {
    size: "$3",
  },
});

// Material Design 3のスタイルを適用したアクティブトラック
const StyledTrackActive = styled(TamaguiSlider.TrackActive, {
  backgroundColor: "$primary",
  borderRadius: 2,
});

// Material Design 3のスタイルを適用したスライダーサム（つまみ）
const StyledThumb = styled(TamaguiSlider.Thumb, {
  // Material Design 3では、スライダーのつまみは円形
  backgroundColor: "$primary",
  borderRadius: 100, // 円形にするために大きな値を設定

  // ホバー状態のスタイル
  hoverStyle: {
    backgroundColor: "$primary",
    opacity: 1 - stateLayerOpacity.hover,
  },

  // フォーカス状態のスタイル
  focusStyle: {
    backgroundColor: "$primary",
    opacity: 1 - stateLayerOpacity.focus,
    outlineWidth: 2,
    outlineColor: "$primary",
    outlineStyle: "solid",
  },

  // プレス状態のスタイル
  pressStyle: {
    backgroundColor: "$primary",
    opacity: 1 - stateLayerOpacity.press,
    // transform: [{ scale: 1.1 }], // スケール変更を削除（位置ずれの原因）
  },

  // ドラッグ状態のスタイル - pressStyleで代用
  // TamaguiではdragStyleがサポートされていないため

  // サイズバリエーション - Material Design 3のガイドラインに合わせて調整
  variants: {
    size: {
      $2: { width: 16, height: 16 }, // 小サイズ
      $3: { width: 20, height: 20 }, // 標準サイズ
      $4: { width: 24, height: 24 }, // 大サイズ
      $5: { width: 28, height: 28 }, // 特大サイズ
    },
  },
  defaultVariants: {
    size: "$3",
  },

  // つまみの影を追加 - Material Design 3のエレベーションレベル2に相当
  shadowColor: "rgba(0, 0, 0, 0.3)",
  shadowOffset: { width: 0, height: 1 }, // 影の位置を調整（下方向への移動を軽減）
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 3,
});

// スライダー値を表示するカウンター
const StyledCounter = styled(Text, {
  fontSize: 12,
  fontWeight: "500",
  color: "$onSurface",
  marginTop: 4,
});

// スライダー全体のコンテナ
const StyledSlider = styled(TamaguiSlider, {
  // サイズバリエーションに応じたコンテナの高さ調整
  variants: {
    size: {
      $2: { height: 24 },
      $3: { height: 32 },
      $4: { height: 40 },
      $5: { height: 48 },
    },
  },
  defaultVariants: {
    size: "$3",
  },
});

// サイズの型定義
type SliderSize = "$2" | "$3" | "$4" | "$5";

// Tamaguiのコンポーネントに渡すpropsの型
type SliderCompProps = {
  ref?: Ref<TamaguiElement>;
  size?: SliderSize;
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
};

// 外部に公開するコンポーネントのprops
type Props = Omit<SliderCompProps, "ref"> & {
  showCounter?: boolean;
};

/**
 * Material Design 3のガイドラインに従ったSliderコンポーネント
 */
export const Slider = forwardRef<TamaguiElement, Props>(
  ({ size = "$3", showCounter, ...props }, ref) => {
    // スライダーの現在値を取得
    const value = Array.isArray(props.value)
      ? props.value[0]
      : Array.isArray(props.defaultValue)
        ? props.defaultValue[0]
        : 0;

    // Tamaguiコンポーネントに渡すprops
    const sliderProps = {
      ref,
      size,
      ...props,
    };

    return (
      <XStack flexDirection="column" width="100%">
        <StyledSlider
          {...sliderProps}
          aria-valuemin={props.min || 0}
          aria-valuemax={props.max || 100}
          aria-valuenow={value}
          aria-valuetext={`${value}`}
        >
          <StyledTrack size={size}>
            <StyledTrackActive />
          </StyledTrack>
          <StyledThumb size={size} index={0} aria-label="スライダーつまみ" />
        </StyledSlider>

        {/* カウンター表示（オプション） */}
        {showCounter && <StyledCounter>{value}</StyledCounter>}
      </XStack>
    );
  },
);

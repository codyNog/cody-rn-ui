import { Anchor as A, type AnchorProps, styled, useTheme } from "tamagui";
import { Ripple } from "../Ripple";
import { hexToRgba } from "../libs/color";
import { useCallback } from "react";
import { stateLayerOpacity } from "../theme";

// Material Design 3のリンクスタイルを適用したAnchorコンポーネント
const StyledAnchor = styled(A, {
  name: "MaterialAnchor",
  color: "$primary",
  textDecorationLine: "underline",
  textDecorationColor: "$primary",

  // フォントスタイル（Material Design 3のタイポグラフィに基づく）
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.5,
  fontWeight: "400",

  // インタラクション状態
  hoverStyle: {
    opacity: 0.8,
    cursor: "pointer",
  },
  pressStyle: {
    opacity: 0.6,
  },
  focusStyle: {
    borderWidth: 2,
    borderColor: "$primary",
  },
});

// ボタンスタイルのリンク
const ButtonAnchor = styled(A, {
  name: "ButtonAnchor",
  color: "$primary",
  textDecorationLine: "none",
  paddingVertical: "$2",
  paddingHorizontal: "$3",
  borderRadius: "$small",
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: "$primary",

  // フォントスタイル
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.5,
  fontWeight: "400",

  // インタラクション状態
  hoverStyle: {
    backgroundColor: "$primary",
    color: "$onPrimary",
    cursor: "pointer",
  },
  pressStyle: {
    opacity: 0.6,
  },
  focusStyle: {
    borderWidth: 2,
    borderColor: "$primary",
  },
});

type Props = AnchorProps & {
  /**
   * リンクの種類
   * @default "text"
   */
  variant?: "text" | "button";
};

/**
 * Material Design 3のRippleエフェクトを適用したアンカーコンポーネント
 *
 * タッチ時に波紋エフェクトが表示され、より良い視覚的フィードバックを提供します。
 */
export const Anchor = ({ variant = "text", ...props }: Props) => {
  const theme = useTheme();

  // バリアントに基づいてRippleの色を決定
  const getRippleColor = useCallback(() => {
    return hexToRgba(theme.primary?.val, stateLayerOpacity.press);
  }, [theme]);

  // onPressハンドラをラップして型の不一致を解決
  const handlePress = useCallback(() => {
    if (props.onPress && typeof props.onPress === "function") {
      // @ts-ignore - Rippleコンポーネントとの型の不一致を無視
      props.onPress();
    }
  }, [props.onPress]);

  // アンカーコンテンツ
  const anchorContent =
    variant === "button" ? (
      <ButtonAnchor {...props} onPress={undefined} />
    ) : (
      <StyledAnchor {...props} onPress={undefined} />
    );

  // Rippleを親要素として、その中にアンカーコンテンツを配置
  return (
    <Ripple
      color={getRippleColor()}
      disabled={props.disabled}
      onPress={props.onPress ? handlePress : undefined}
      style={{
        borderRadius: variant === "button" ? 4 : 0, // ボタンスタイルの場合は角丸を適用
        overflow: "hidden",
        alignSelf: "flex-start", // テキストの幅に合わせる
      }}
    >
      {anchorContent}
    </Ripple>
  );
};

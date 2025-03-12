import { Anchor as A, type AnchorProps, styled } from "tamagui";

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

export const Anchor = ({ variant = "text", ...props }: Props) => {
  // variantに基づいて適切なコンポーネントを返す
  if (variant === "button") {
    return <ButtonAnchor {...props} />;
  }

  return <StyledAnchor {...props} />;
};

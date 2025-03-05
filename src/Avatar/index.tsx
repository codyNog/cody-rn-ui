"use client";
import { forwardRef } from "react";
import {
  Avatar as TamaguiAvatar,
  type TamaguiElement,
  Text,
  styled,
} from "tamagui";
import { elevationSystem } from "../theme";

// Material Design 3のアバターサイズ
const AVATAR_SIZES = {
  small: 24, // 小サイズ
  medium: 40, // 中サイズ（デフォルト）
  large: 56, // 大サイズ
  xlarge: 80, // 特大サイズ
};

// スタイル付きアバターコンポーネント
const StyledAvatar = styled(TamaguiAvatar, {
  overflow: "hidden",

  // バリアント定義
  variants: {
    elevated: {
      true: {
        ...elevationSystem.shadows.level1,
      },
    },
  } as const,
});

type Props = {
  src: string;
  alt?: string; // アクセシビリティのための代替テキスト
  size?: keyof typeof AVATAR_SIZES;
  elevated?: boolean; // エレベーション（影）を適用するかどうか
  fallbackInitials?: string; // フォールバック用のイニシャル
  customSize?: number;
};

export const Avatar = forwardRef<TamaguiElement, Props>(
  (
    {
      src,
      alt = "アバター画像",
      size = "medium",
      elevated = false,
      fallbackInitials,
      customSize,
    },
    ref,
  ) => {
    const sizeValue =
      customSize || (typeof size === "string" ? AVATAR_SIZES[size] : undefined);

    // フォールバックテキストのフォントサイズを計算
    const getFontSize = () => {
      if (typeof size === "number") {
        return Math.max(size / 3, 10); // カスタムサイズの場合は比率で計算
      }

      switch (size) {
        case "small":
          return 10;
        case "medium":
          return 14;
        case "large":
          return 20;
        case "xlarge":
          return 28;
        default:
          return 14;
      }
    };

    return (
      <StyledAvatar ref={ref} elevated={elevated} circular size={sizeValue}>
        <TamaguiAvatar.Image accessibilityLabel={alt} src={src} />
        <TamaguiAvatar.Fallback backgroundColor="$primary" delayMs={600}>
          {fallbackInitials ? (
            <Text
              color="$onPrimary"
              fontSize={getFontSize()}
              fontWeight="500"
              textAlign="center"
              paddingTop={sizeValue ? sizeValue / 4 : 0}
            >
              {fallbackInitials}
            </Text>
          ) : null}
        </TamaguiAvatar.Fallback>
      </StyledAvatar>
    );
  },
);

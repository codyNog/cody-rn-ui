"use client";
import { Text as TamaguiText, styled } from "tamagui";
import { typographyScale, type ColorScheme } from "../theme";
import type { ElementRef, ReactNode } from "react";
import { forwardRef } from "react";

// ColorSchemeのプロパティの頭に$をつけた型
type ColorToken = `$${keyof ColorScheme}`;

// 明示的に定義されたプロパティのみを受け付ける型定義
type Props = {
  variant: keyof typeof typographyScale;
  children: ReactNode;
  color?: ColorToken;
};

// Material Design 3のタイポグラフィスタイルを適用したテキストコンポーネント
const StyledText = styled(TamaguiText, {
  color: "$onSurface",

  // バリアント定義
  variants: {
    variant: {
      displayLarge: typographyScale.displayLarge,
      displayMedium: typographyScale.displayMedium,
      displaySmall: typographyScale.displaySmall,

      headlineLarge: typographyScale.headlineLarge,
      headlineMedium: typographyScale.headlineMedium,
      headlineSmall: typographyScale.headlineSmall,

      titleLarge: typographyScale.titleLarge,
      titleMedium: typographyScale.titleMedium,
      titleSmall: typographyScale.titleSmall,

      bodyLarge: typographyScale.bodyLarge,
      bodyMedium: typographyScale.bodyMedium,
      bodySmall: typographyScale.bodySmall,

      labelLarge: typographyScale.labelLarge,
      labelMedium: typographyScale.labelMedium,
      labelSmall: typographyScale.labelSmall,
    },
  } as const,

  // デフォルトバリアント
  defaultVariants: {
    variant: "bodyMedium",
  },
});

// Propsで定義されたプロパティのみを受け付けるようにエクスポート
// forwardRefを使用してrefを適切に扱う
export const Text = forwardRef<ElementRef<typeof TamaguiText>, Props>(
  (props, ref) => {
    return <StyledText {...props} ref={ref} />;
  },
);

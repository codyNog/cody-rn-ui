"use client";
import { Text as TamaguiText, styled } from "tamagui";
import { typographyScale } from "../theme";

// Material Design 3のタイポグラフィスタイルを適用したテキストコンポーネント
export const Text = styled(TamaguiText, {
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

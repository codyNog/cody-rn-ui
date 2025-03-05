"use client";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { Separator, type TamaguiElement } from "tamagui";

type Props = {
  /**
   * Dividerのバリアント
   * - fullWidth: 画面の端から端まで広がるDivider
   * - inset: 左右に余白を持つDivider
   * @default "fullWidth"
   */
  variant?: "fullWidth" | "inset";
} & Omit<ComponentProps<typeof Separator>, "vertical">;

/**
 * コンテンツを視覚的に分離するための水平区切り線コンポーネント
 */
export const Divider = forwardRef<TamaguiElement, Props>(
  ({ variant = "fullWidth", ...props }, ref) => {
    // insetバリアントの場合、左右に余白を追加
    const insetMargin = variant === "inset" ? "$4" : 0;

    return (
      <Separator
        ref={ref}
        vertical={false}
        borderColor="$outline"
        margin={0}
        marginLeft={insetMargin}
        marginRight={insetMargin}
        {...props}
      />
    );
  },
);

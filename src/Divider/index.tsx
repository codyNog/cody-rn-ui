"use client";
import type { ComponentProps, Ref } from "react";
import { Separator, type TamaguiElement } from "tamagui";

type Props = {
  /**
   * 参照オブジェクト
   */
  ref?: Ref<TamaguiElement>;
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
export const Divider = ({ ref, variant = "fullWidth", ...props }: Props) => {
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
};

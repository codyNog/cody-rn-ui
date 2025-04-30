"use client";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { type TamaguiElement, Text, YStack } from "tamagui";

export type BadgeVariant = "standard" | "small" | "large" | "dot";
export type BadgeDirection =
  | "topRight"
  | "topLeft"
  | "bottomRight"
  | "bottomLeft";

type BadgeProps = {
  variant?: BadgeVariant;
  direction?: BadgeDirection;
  content?: ReactNode;
  max?: number;
  showZero?: boolean;
  visible?: boolean;
};

/**
 * Material Design 3のスタイルを適用したバッジコンポーネント
 *
 * Material Design 3のデザイン仕様に基づいたバッジコンポーネントです。
 * 以下のバリアントをサポートしています：
 * - standard: 標準サイズのバッジ（デフォルト）
 * - small: 小さいサイズのバッジ
 * - large: 大きいサイズのバッジ
 * - dot: ドット形式のバッジ（テキストなし）
 */
export const Badge = forwardRef<TamaguiElement, BadgeProps>(
  (
    {
      variant = "standard",
      direction = "topRight",
      content,
      max = 99,
      showZero = false,
      visible = true,
    },
    ref,
  ) => {
    // コンテンツの処理
    let displayContent: ReactNode = content;

    // コンテンツが数値の場合、maxを超えたら「max+」と表示
    if (typeof content === "number") {
      if (content === 0 && !showZero) {
        visible = false;
      } else if (content > max) {
        displayContent = `${max}+`;
      }
    }

    // バッジの位置スタイルを設定
    const positionStyle = {
      topRight: { top: -8, right: -8 },
      topLeft: { top: -8, left: -8 },
      bottomRight: { bottom: -8, right: -8 },
      bottomLeft: { bottom: -8, left: -8 },
    }[direction];

    // バリアントに基づくサイズスタイルを設定
    const sizeStyleDefinition = {
      standard: {
        height: 20,
        minWidth: 20,
        paddingHorizontal: 4,
        fontSize: 10,
        lineHeight: 16,
      },
      small: {
        height: 16,
        minWidth: 16,
        paddingHorizontal: 3,
        fontSize: 9,
        lineHeight: 14,
      },
      large: {
        height: 24,
        minWidth: 24,
        paddingHorizontal: 5,
        fontSize: 11,
        lineHeight: 18,
      },
      dot: {
        width: 8,
        height: 8,
        paddingHorizontal: 0,
        // Add dummy fontSize and lineHeight for type consistency, though not used
        fontSize: 0,
        lineHeight: 0,
      },
    };

    const currentSizeStyle = sizeStyleDefinition[variant];
    // Destructure to separate lineHeight from other styles
    const { lineHeight, ...stackSizeStyle } = currentSizeStyle;

    return (
      <YStack
        ref={ref}
        alignItems="center"
        justifyContent="center"
        borderRadius={9999}
        position="absolute"
        zIndex={1}
        overflow="hidden"
        backgroundColor="$error"
        {...positionStyle}
        {...stackSizeStyle} // Apply styles intended for the stack (without lineHeight)
        {...(visible === false ? { display: "none" } : {})}
      >
        {variant !== "dot" && (
          <Text
            color="$onError"
            textAlign="center"
            fontSize={currentSizeStyle.fontSize} // Pass fontSize from original style object
            lineHeight={lineHeight} // Pass the destructured lineHeight
          >
            {displayContent}
          </Text>
        )}
      </YStack>
    );
  },
);

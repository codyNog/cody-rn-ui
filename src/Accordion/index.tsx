"use client";
import { ChevronDown } from "@tamagui/lucide-icons";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import {
  Paragraph,
  Square,
  Accordion as TamaguiAccordion,
  type TamaguiElement,
  styled,
} from "tamagui";
import { stateLayerOpacity } from "../theme";

type Props = {
  items: {
    title: string;
    content: ReactNode;
  }[];
  // 開いているアイテムの値の配列
  value?: string[];
  // 値が変更されたときのコールバック
  onChange?: (value: string[]) => void;
  // デフォルトで開いているアイテム
  defaultValue?: string[];
};

// Material Design 3のスタイルを適用したアコーディオントリガー
const StyledTrigger = styled(TamaguiAccordion.Trigger, {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 16,
  paddingHorizontal: 16,
  backgroundColor: "$surfaceContainerLow",
  borderWidth: 0,
  borderColor: "$outline",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,

  // ホバー状態のスタイル
  hoverStyle: {
    backgroundColor: "$surfaceVariant",
    opacity: stateLayerOpacity.hover,
  },

  // プレス状態のスタイル
  pressStyle: {
    backgroundColor: "$surfaceVariant",
    opacity: stateLayerOpacity.press,
  },

  // バリアント
  variants: {
    open: {
      true: {
        borderBottomWidth: 0,
      },
      false: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  } as const,
});

// Material Design 3のスタイルを適用したアコーディオンコンテンツ
const StyledContent = styled(TamaguiAccordion.Content, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: "$surfaceContainerLowest",
  borderWidth: 0,
  borderColor: "$outline",
  borderTopWidth: 0,
});

export const Accordion = forwardRef<TamaguiElement, Props>(
  ({ items, value, onChange, defaultValue }, ref) => (
    <TamaguiAccordion
      ref={ref}
      overflow="hidden"
      width="100%"
      type={"multiple"}
      value={value}
      onValueChange={onChange}
      defaultValue={defaultValue}
    >
      {items.map(({ title, content }) => (
        <TamaguiAccordion.Item key={title} value={title}>
          <StyledTrigger>
            {({ open }: { open: boolean }) => (
              <>
                <Paragraph color="$onSurface">{title}</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size={20} color="$onSurfaceVariant" />
                </Square>
              </>
            )}
          </StyledTrigger>
          <TamaguiAccordion.Content
            animation="medium"
            enterStyle={{ opacity: 0, height: 0 }}
            exitStyle={{ opacity: 0, height: 0 }}
          >
            <StyledContent>
              {typeof content === "string" ? (
                <Paragraph>{content}</Paragraph>
              ) : (
                content
              )}
            </StyledContent>
          </TamaguiAccordion.Content>
        </TamaguiAccordion.Item>
      ))}
    </TamaguiAccordion>
  ),
);

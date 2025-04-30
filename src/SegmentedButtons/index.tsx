"use client";
import { Check } from "@tamagui/lucide-icons";
import { type Ref, forwardRef, useCallback } from "react";
import {
  Button,
  type ColorTokens,
  type TamaguiElement,
  Text,
  XStack,
} from "tamagui";
import { stateLayerOpacity } from "../theme";

// セグメントボタンのオプション型
export type SegmentedButtonOption = {
  value: string;
  label: string;
};

// セグメントボタンの選択タイプ
export type SegmentedButtonType = "single" | "multiple";

// 選択タイプに応じた値の型
export type SegmentedButtonValue<T extends SegmentedButtonType> =
  T extends "single" ? string : string[];

// 単一選択用のプロパティ型
export interface SingleSegmentedButtonProps {
  options: SegmentedButtonOption[];
  value?: string;
  onChange: (value: string) => void;
  size?: "small" | "medium" | "large";
  color?: ColorTokens;
  disabled?: boolean;
  type?: "single";
}

// 複数選択用のプロパティ型
export interface MultipleSegmentedButtonProps {
  options: SegmentedButtonOption[];
  value?: string[];
  onChange: (value: string[]) => void;
  size?: "small" | "medium" | "large";
  color?: ColorTokens;
  disabled?: boolean;
  type: "multiple";
}

// セグメントボタンのプロパティ型（単一選択または複数選択）
export type SegmentedButtonProps =
  | SingleSegmentedButtonProps
  | MultipleSegmentedButtonProps;

/**
 * Material Design 3のスタイルを適用したSegmented Buttonコンポーネント
 *
 * 複数の選択肢から一つまたは複数を選ぶことができるボタングループのUIコンポーネントです。
 * タイプ：
 * - single: 単一選択（デフォルト）
 * - multiple: 複数選択
 *
 * サイズバリアント：
 * - small: 小サイズ
 * - medium: 中サイズ（デフォルト）
 * - large: 大サイズ
 */
export const SegmentedButtons = forwardRef(
  (
    {
      options,
      value,
      onChange,
      size = "medium",
      disabled = false,
      type = "single",
    }: SegmentedButtonProps,
    ref: Ref<TamaguiElement>,
  ) => {
    // 値が選択されているかチェックする関数
    const isValueSelected = (optionValue: string): boolean => {
      if (type === "multiple") {
        // 複数選択の場合、配列内に値が存在するかチェック
        return Array.isArray(value) && value.includes(optionValue);
      }
      // 単一選択の場合、値が一致するかチェック
      return value === optionValue;
    };

    // ボタンクリック時のハンドラー
    const handlePress = useCallback(
      (selectedValue: string) => {
        if (type === "multiple") {
          // 複数選択の場合
          const multipleOnChange = onChange as (value: string[]) => void;
          const currentValues = Array.isArray(value) ? [...value] : [];

          if (currentValues.includes(selectedValue)) {
            // すでに選択されている場合は削除
            const newValues = currentValues.filter((v) => v !== selectedValue);
            multipleOnChange(newValues);
          } else {
            // 選択されていない場合は追加
            multipleOnChange([...currentValues, selectedValue]);
          }
        } else {
          // 単一選択の場合
          const singleOnChange = onChange as (value: string) => void;
          singleOnChange(selectedValue);
        }
      },
      [onChange, value, type],
    );

    // サイズに応じた高さとパディングを取得
    const getSizeProps = (size: string) => {
      switch (size) {
        case "small":
          return {
            height: 32,
            paddingHorizontal: "$2",
            fontSize: 12,
            iconSize: 12,
          };
        case "large":
          return {
            height: 48,
            paddingHorizontal: "$4",
            fontSize: 16,
            iconSize: 18,
          };
        default:
          return {
            height: 40,
            paddingHorizontal: "$3",
            fontSize: 14,
            iconSize: 16,
          };
      }
    };

    const { iconSize, ...buttonSizeProps } = getSizeProps(size);

    // オプションが1つの場合の位置
    if (options.length === 1) {
      const option = options[0];
      const isSelected = isValueSelected(option.value);

      return (
        <XStack ref={ref} width="100%">
          <Button
            flex={1}
            justifyContent="center"
            alignItems="center"
            borderRadius={100}
            backgroundColor={isSelected ? "$secondaryContainer" : "transparent"}
            color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
            borderColor={isSelected ? "$secondaryContainer" : "$outline"}
            borderWidth={1}
            {...buttonSizeProps}
            disabled={disabled}
            opacity={disabled ? 0.38 : 1}
            onPress={() => handlePress(option.value)}
            hoverStyle={{
              backgroundColor: isSelected
                ? "$secondaryContainer"
                : "$surfaceVariant",
              opacity: 1 - stateLayerOpacity.hover,
              cursor: "pointer",
            }}
            pressStyle={{
              backgroundColor: isSelected
                ? "$secondaryContainer"
                : "$surfaceVariant",
              opacity: 1 - stateLayerOpacity.press,
            }}
          >
            <XStack alignItems="center" gap="$1">
              <Check
                size={iconSize}
                color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
                opacity={isSelected ? 1 : 0}
              />
              <Text color={isSelected ? "$onSecondaryContainer" : "$onSurface"}>
                {option.label}
              </Text>
            </XStack>
          </Button>
        </XStack>
      );
    }

    return (
      <XStack ref={ref} width="100%" gap={0}>
        {options.map((option, index) => {
          const isSelected = isValueSelected(option.value);
          const isFirst = index === 0;
          const isLast = index === options.length - 1;

          // 位置に応じたborderRadiusを設定
          let borderRadiusStyle = {};
          if (isFirst) {
            borderRadiusStyle = {
              borderTopLeftRadius: 100,
              borderBottomLeftRadius: 100,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            };
          } else if (isLast) {
            borderRadiusStyle = {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 100,
              borderBottomRightRadius: 100,
            };
          } else {
            borderRadiusStyle = {
              borderRadius: 0,
            };
          }

          return (
            <Button
              key={option.value}
              flex={1}
              justifyContent="center"
              alignItems="center"
              backgroundColor={
                isSelected ? "$secondaryContainer" : "transparent"
              }
              color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
              borderColor={isSelected ? "$secondaryContainer" : "$outline"}
              borderWidth={1}
              {...borderRadiusStyle}
              {...buttonSizeProps}
              marginLeft={isFirst ? 0 : -1}
              zIndex={isSelected ? 1 : 0}
              disabled={disabled}
              opacity={disabled ? 0.38 : 1}
              onPress={() => handlePress(option.value)}
              hoverStyle={{
                backgroundColor: isSelected
                  ? "$secondaryContainer"
                  : "$surfaceVariant",
                opacity: 1 - stateLayerOpacity.hover,
                cursor: "pointer",
              }}
              pressStyle={{
                backgroundColor: isSelected
                  ? "$secondaryContainer"
                  : "$surfaceVariant",
                opacity: 1 - stateLayerOpacity.press,
              }}
            >
              <XStack alignItems="center" gap="$1">
                <Check
                  size={iconSize}
                  color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
                  opacity={isSelected ? 1 : 0}
                />
                <Text
                  color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
                >
                  {option.label}
                </Text>
              </XStack>
            </Button>
          );
        })}
      </XStack>
    );
  },
);

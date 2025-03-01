"use client";
import { useCallback, type Ref } from "react";
import {
  XStack,
  type TamaguiElement,
  type ColorTokens,
  Button,
  Text,
} from "tamagui";
import { Check } from "@tamagui/lucide-icons";
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

// セグメントボタンのプロパティ型
export type SegmentedButtonProps<T extends SegmentedButtonType = "single"> = {
  ref?: Ref<TamaguiElement>;
  options: SegmentedButtonOption[];
  value?: SegmentedButtonValue<T>;
  onChange: (value: SegmentedButtonValue<T>) => void;
  size?: "small" | "medium" | "large";
  color?: ColorTokens;
  disabled?: boolean;
  type?: T;
};

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
export const SegmentedButtons = <T extends SegmentedButtonType = "single">({
  ref,
  options,
  value,
  onChange,
  size = "medium",
  disabled = false,
  type = "single" as T,
}: SegmentedButtonProps<T>) => {
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
        const currentValues = Array.isArray(value) ? [...value] : [];

        if (currentValues.includes(selectedValue)) {
          // すでに選択されている場合は削除
          const newValues = currentValues.filter((v) => v !== selectedValue);
          onChange(newValues as SegmentedButtonValue<T>);
        } else {
          // 選択されていない場合は追加
          onChange([
            ...currentValues,
            selectedValue,
          ] as SegmentedButtonValue<T>);
        }
      } else {
        // 単一選択の場合
        onChange(selectedValue as SegmentedButtonValue<T>);
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

  const sizeProps = getSizeProps(size);

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
          {...sizeProps}
          disabled={disabled}
          opacity={disabled ? 0.38 : 1}
          onPress={() => handlePress(option.value)}
          hoverStyle={{
            backgroundColor: isSelected
              ? "$secondaryContainer"
              : "$surfaceVariant",
            opacity: 1 - stateLayerOpacity.hover,
          }}
          pressStyle={{
            backgroundColor: isSelected
              ? "$secondaryContainer"
              : "$surfaceVariant",
            opacity: 1 - stateLayerOpacity.press,
          }}
        >
          <XStack alignItems="center" gap="$1">
            {isSelected && (
              <Check
                size={sizeProps.iconSize}
                color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
              />
            )}
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
            backgroundColor={isSelected ? "$secondaryContainer" : "transparent"}
            color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
            borderColor={isSelected ? "$secondaryContainer" : "$outline"}
            borderWidth={1}
            {...borderRadiusStyle}
            {...sizeProps}
            disabled={disabled}
            opacity={disabled ? 0.38 : 1}
            onPress={() => handlePress(option.value)}
            hoverStyle={{
              backgroundColor: isSelected
                ? "$secondaryContainer"
                : "$surfaceVariant",
              opacity: 1 - stateLayerOpacity.hover,
            }}
            pressStyle={{
              backgroundColor: isSelected
                ? "$secondaryContainer"
                : "$surfaceVariant",
              opacity: 1 - stateLayerOpacity.press,
            }}
          >
            <XStack alignItems="center" gap="$1">
              {isSelected && (
                <Check
                  size={sizeProps.iconSize}
                  color={isSelected ? "$onSecondaryContainer" : "$onSurface"}
                />
              )}
              <Text color={isSelected ? "$onSecondaryContainer" : "$onSurface"}>
                {option.label}
              </Text>
            </XStack>
          </Button>
        );
      })}
    </XStack>
  );
};

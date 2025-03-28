"use client";
import { forwardRef, useCallback, useId } from "react";
import {
  Label,
  RadioGroup as RG,
  type TamaguiElement,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { stateLayerOpacity } from "../theme";

// Material Design 3のスタイルを適用したRadioボタン
const StyledRadioItem = styled(RG.Item, {
  borderRadius: 9999,
  borderWidth: 2,
  borderColor: "$outline",
  backgroundColor: "transparent",
  // タッチターゲットサイズを確保（もう少し小さく）
  minWidth: 20,
  minHeight: 20,
  justifyContent: "center",
  alignItems: "center",
  // アニメーション設定
  animation: "quick",
  hoverStyle: {
    cursor: "pointer",
  },

  // バリアント
  variants: {
    checked: {
      true: {
        borderColor: "$primary",
        // チェック状態のホバー
        hoverStyle: {
          backgroundColor: "$primaryContainer",
          opacity: 1 - stateLayerOpacity.hover,
          cursor: "pointer",
        },
        // チェック状態のプレス
        pressStyle: {
          backgroundColor: "$primaryContainer",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      false: {
        borderColor: "$outline",
        backgroundColor: "transparent",
        // 未チェック状態のホバー
        hoverStyle: {
          backgroundColor: "$surfaceVariant",
          opacity: 1 - stateLayerOpacity.hover,
          cursor: "pointer",
        },
        // 未チェック状態のプレス
        pressStyle: {
          backgroundColor: "$surfaceVariant",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
    },
    // サイズバリエーション
    size: {
      $2: {
        width: 16,
        height: 16,
      },
      $3: {
        width: 20,
        height: 20,
      },
      $4: {
        width: 24,
        height: 24,
      },
      $5: {
        width: 28,
        height: 28,
      },
    },
    // 無効状態
    disabled: {
      true: {
        opacity: 0.38,
        pointerEvents: "none",
        borderColor: "$outlineVariant",
        hoverStyle: {
          backgroundColor: "transparent",
          cursor: "default",
        },
        pressStyle: {
          backgroundColor: "transparent",
        },
      },
    },
  } as const,
  defaultVariants: {
    size: "$3",
    disabled: false,
  },
});

// Material Design 3のスタイルを適用したRadioインジケーター
const StyledRadioIndicator = styled(RG.Indicator, {
  backgroundColor: "$primary",
  borderRadius: 9999,
  // アニメーション設定
  animation: "quick",
  enterStyle: {
    scale: 0,
    opacity: 0,
  },
  exitStyle: {
    scale: 0,
    opacity: 0,
  },
  // サイズバリエーション
  variants: {
    size: {
      $2: {
        width: 8,
        height: 8,
      },
      $3: {
        width: 10,
        height: 10,
      },
      $4: {
        width: 12,
        height: 12,
      },
      $5: {
        width: 14,
        height: 14,
      },
    },
  },
  defaultVariants: {
    size: "$3",
  },
});

type Option = {
  value: string;
  label: string;
};

type ItemProps = Option & {
  size: "$2" | "$3" | "$4" | "$5";
  onPress: (value: string) => void;
  disabled?: boolean;
};

const Item = ({ size, value, label, onPress, disabled }: ItemProps) => {
  const id = useId();
  return (
    <XStack width="100%" alignItems="center" gap="$4">
      <StyledRadioItem
        value={value}
        id={id}
        size={size}
        disabled={disabled}
        onPress={() => onPress(value)}
      >
        <StyledRadioIndicator size={size} />
      </StyledRadioItem>
      <Label
        size={size}
        htmlFor={id}
        cursor={disabled ? "default" : "pointer"}
        onPress={disabled ? undefined : () => onPress(value)}
        color="$onSurface"
        opacity={disabled ? 0.38 : 1}
        flex={1}
      >
        {label}
      </Label>
    </XStack>
  );
};

type Props = {
  options: Option[];
  onChange: (value: string) => void;
  value?: string;
  size?: "$2" | "$3" | "$4" | "$5";
  disabled?: boolean;
};

export const RadioGroup = forwardRef<TamaguiElement, Props>(
  ({ options, onChange, value, size = "$3", disabled }, ref) => {
    const onPressItem = useCallback(
      (selectedValue: string) => {
        onChange(selectedValue);
      },
      [onChange],
    );

    return (
      <RG value={value} onValueChange={onChange} ref={ref}>
        <YStack gap="$4" width="100%">
          {options.map((option) => (
            <Item
              {...option}
              key={option.value}
              size={size}
              disabled={disabled}
              onPress={onPressItem}
            />
          ))}
        </YStack>
      </RG>
    );
  },
);

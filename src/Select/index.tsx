"use client";
import { ChevronDown } from "@tamagui/lucide-icons";
import { forwardRef, useState } from "react";
import type { TextInput } from "react-native";
import {
  Input,
  Select as TamaguiSelect,
  Text,
  VisuallyHidden,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { elevationSystem, stateLayerOpacity } from "../theme";

// 選択肢の型定義
export type SelectOption = {
  label: string;
  value: string;
};

// ヘルパーテキスト
const HelperText = styled(Text, {
  fontSize: 12,
  color: "$onSurfaceVariant",
  marginTop: 4,
  marginLeft: 16,

  // バリアント
  variants: {
    error: {
      true: {
        color: "$error",
      },
    },
  },
});

// ラベルコンポーネント
const Label = styled(Text, {
  position: "absolute",
  left: 16,
  top: 16,
  fontSize: 16,
  color: "$onSurfaceVariant",
  transition: "all 0.2s ease",
  transformOrigin: "left top",
  zIndex: 1,
  paddingHorizontal: 4,
  backgroundColor: "transparent",

  // バリアント
  variants: {
    variant: {
      filled: {
        // filledバリアントのデフォルトスタイル
      },
      outlined: {
        // outlinedバリアントのデフォルトスタイル
      },
    },
    focused: {
      true: {
        top: 4,
        fontSize: 12,
        color: "$primary",
        transform: [{ translateY: 0 }],
      },
    },
    selected: {
      true: {
        top: 4,
        fontSize: 12,
        transform: [{ translateY: 0 }],
      },
    },
    error: {
      true: {
        color: "$error",
      },
    },
    disabled: {
      true: {
        color: "$onSurfaceVariant",
        opacity: 0.38,
      },
    },
  },

  // デフォルトバリアント
  defaultVariants: {
    variant: "filled",
  },
});

// スタイル付きのSelectトリガー
const StyledTrigger = styled(TamaguiSelect.Trigger, {
  height: 56,
  borderRadius: 4,
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: "$surfaceContainerHighest",
  color: "$onSurface",
  fontSize: 16,
  justifyContent: "space-between",
  alignItems: "center",

  // ホバー状態
  hoverStyle: {
    cursor: "pointer",
  },

  // バリアント
  variants: {
    variant: {
      filled: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "$outline",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: "$surfaceContainerHighest",

        // ホバー状態
        hoverStyle: {
          backgroundColor: `$onSurface${stateLayerOpacity.hover}`,
        },

        // フォーカス状態
        focusStyle: {
          borderWidth: 0,
          borderBottomWidth: 2,
          borderColor: "$primary",
          outlineWidth: 0,
        },
      },
      outlined: {
        borderWidth: 1,
        borderColor: "$outline",
        backgroundColor: "$surface",

        // ホバー状態
        hoverStyle: {
          backgroundColor: `$onSurface${stateLayerOpacity.hover}`,
        },

        // フォーカス状態
        focusStyle: {
          borderWidth: 2,
          borderColor: "$primary",
          outlineWidth: 0,
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.38,
        borderColor: "$outlineVariant",
        backgroundColor: "$surfaceContainerLowest",
      },
    },
    error: {
      true: {
        borderColor: "$error",
        focusStyle: {
          borderColor: "$error",
        },
      },
    },
  } as const,
});

// スタイル付きのSelectコンテンツ
const StyledContent = styled(TamaguiSelect.Content, {
  backgroundColor: "$surfaceContainerHigh",
  borderRadius: 4,
  overflow: "hidden",
  ...elevationSystem.shadows.level3,
});

// スタイル付きのSelectアイテム
const StyledItem = styled(TamaguiSelect.Item, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: "transparent",
  cursor: "pointer",

  // ホバー状態
  hoverStyle: {
    backgroundColor: `$onSurface${stateLayerOpacity.hover}`,
  },

  // 選択状態
  pressStyle: {
    backgroundColor: `$primary${stateLayerOpacity.hover}`,
  },
});

// スタイル付きのSelectアイテムテキスト
const StyledItemText = styled(TamaguiSelect.ItemText, {
  fontSize: 16,
  color: "$onSurface",
});

type Props = {
  label: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  variant?: "filled" | "outlined";
  disabled?: boolean;
};

export const Select = forwardRef<TextInput, Props>(
  (
    {
      label,
      helperText,
      error,
      options,
      value,
      onChange,
      variant = "outlined",
      disabled,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const hasError = !!error;
    const selectedOption = options.find((option) => option.value === value);
    // 空文字の値を持つオプションが選択されている場合も考慮
    const isSelected =
      !!selectedOption ||
      (value !== undefined && value !== null && value === "");

    return (
      <YStack width="100%">
        <XStack position="relative" width="100%">
          <VisuallyHidden>
            <Input
              ref={ref}
              value={value}
              onChangeText={onChange}
              accessibilityLabel={label}
            />
          </VisuallyHidden>
          <TamaguiSelect
            id={label}
            value={value}
            onValueChange={onChange}
            open={open}
            onOpenChange={setOpen}
            disablePreventBodyScroll
          >
            <StyledTrigger
              variant={variant}
              error={hasError}
              disabled={disabled}
              iconAfter={<ChevronDown size={24} color="$onSurfaceVariant" />}
            >
              <TamaguiSelect.Value />
            </StyledTrigger>

            <TamaguiSelect.Adapt platform="touch">
              <TamaguiSelect.Sheet
                modal
                dismissOnSnapToBottom
                snapPointsMode="fit"
                animationConfig={{
                  type: "spring",
                  damping: 20,
                  stiffness: 250,
                }}
              >
                <TamaguiSelect.Sheet.Frame>
                  <TamaguiSelect.Sheet.ScrollView>
                    <TamaguiSelect.Adapt.Contents />
                  </TamaguiSelect.Sheet.ScrollView>
                </TamaguiSelect.Sheet.Frame>
                <TamaguiSelect.Sheet.Overlay
                  animation="lazy"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </TamaguiSelect.Sheet>
            </TamaguiSelect.Adapt>
            <StyledContent>
              <TamaguiSelect.ScrollUpButton />
              <TamaguiSelect.Viewport>
                <TamaguiSelect.Group>
                  {options.map((option, index) => (
                    <StyledItem
                      key={option.value}
                      index={index}
                      value={option.value}
                    >
                      <StyledItemText>{option.label}</StyledItemText>
                    </StyledItem>
                  ))}
                </TamaguiSelect.Group>
              </TamaguiSelect.Viewport>
              <TamaguiSelect.ScrollDownButton />
            </StyledContent>
          </TamaguiSelect>

          <Label
            variant={variant}
            focused={open}
            selected={isSelected}
            error={hasError}
            disabled={disabled}
            marginTop={variant === "outlined" && (open || isSelected) ? -10 : 0}
            backgroundColor={
              variant === "outlined" && (open || isSelected)
                ? "$surface"
                : variant === "filled"
                  ? "$surfaceContainerHighest"
                  : "transparent"
            }
          >
            {label}
          </Label>
        </XStack>

        {/* ヘルパーテキスト */}
        {(helperText || error) && (
          <HelperText error={hasError}>{error || helperText}</HelperText>
        )}
      </YStack>
    );
  },
);

// displayNameを設定
Select.displayName = "Select";

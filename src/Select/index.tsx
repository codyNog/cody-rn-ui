"use client";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useState } from "react";
import {
  Adapt,
  Sheet,
  Select as TamaguiSelect,
  Text,
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
  backgroundColor: "transparent",
  paddingHorizontal: 4,

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
    backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
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
        backgroundColor: "transparent",

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
    backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
  },

  // 選択状態
  pressStyle: {
    backgroundColor: `$primary, ${stateLayerOpacity.hover})`,
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

export const Select = ({
  label,
  helperText,
  error,
  options,
  value,
  onChange,
  variant = "outlined",
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);
  const hasError = !!error;
  const selectedOption = options.find((option) => option.value === value);
  const isSelected = !!selectedOption;

  return (
    <YStack width="100%">
      <XStack position="relative" width="100%">
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

          <Adapt platform="touch">
            <Sheet
              modal
              dismissOnSnapToBottom
              snapPointsMode="fit"
              animationConfig={{
                type: "spring",
                damping: 20,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

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
          backgroundColor={
            variant === "filled" ? "$surfaceContainerHighest" : "$background"
          }
          marginTop={variant === "outlined" && (open || isSelected) ? -10 : 0}
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
};

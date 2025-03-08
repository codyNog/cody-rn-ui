"use client";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { forwardRef, useState, useRef, useEffect, type RefObject } from "react";
import type { TextInput } from "react-native";
import {
  type InputProps,
  Input as TamaguiInput,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { stateLayerOpacity } from "../theme";

// スタイル付きのInputコンポーネント
const StyledInput = styled(TamaguiInput, {
  minHeight: 56,
  fontSize: 16,
  lineHeight: 24,
  color: "$onSurface",
  outlineWidth: 0,
  outlineStyle: "none",

  // 共通のフォーカス状態のスタイル
  focusStyle: {
    outlineWidth: 0,
  },

  // ホバー状態のスタイル
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
        borderRadius: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
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
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: "$surface",

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
          // filledバリアントの場合は下部のみボーダーを表示
          borderWidth: undefined,
          borderBottomWidth: 2,
          outlineWidth: 0,
        },
      },
    },
  },

  // デフォルトバリアント
  defaultVariants: {
    variant: "filled",
  },
});

// ラベルコンテナ
const LabelContainer = styled(XStack, {
  position: "absolute",
  left: 12,
  top: 16,
  paddingHorizontal: 4,
  zIndex: 1,

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
      },
    },
    filled: {
      true: {
        top: 4,
      },
    },
  },
});

// ラベルコンポーネント
const Label = styled(Text, {
  fontSize: 16,
  color: "$onSurfaceVariant",
  transition: "all 0.2s ease",
  transformOrigin: "left top",
  paddingHorizontal: 1,

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
        fontSize: 12,
        lineHeight: 16,
        color: "$primary",
        transform: [{ translateY: 0 }],
      },
    },
    filled: {
      true: {
        fontSize: 12,
        lineHeight: 16,
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

// ヘルパーテキスト
const HelperText = styled(Text, {
  fontSize: 12,
  lineHeight: 16,
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

// カウンターテキスト
const CounterText = styled(Text, {
  fontSize: 12,
  lineHeight: 16,
  color: "$onSurfaceVariant",
  marginTop: 4,
  marginRight: 16,
});

type Props = Omit<
  InputProps,
  "ref" | "onChangeText" | "onChange" | "placeholder"
> & {
  label: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  value?: string;
  onChange: (value: string) => void;
  variant?: "filled" | "outlined";
  multiline?: boolean;
  numberOfLines?: number;
};

export const TextField = forwardRef<TextInput, Props>(
  (
    {
      label,
      helperText,
      error,
      value,
      maxLength,
      secureTextEntry,
      disabled,
      onChange,
      variant = "outlined",
      multiline = false,
      numberOfLines = 3,
      ...props
    },
    forwardedRef,
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const internalRef = useRef<TextInput>(null);

    // 内部refと外部refを連携
    useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(internalRef.current);
      } else if (forwardedRef) {
        forwardedRef.current = internalRef.current;
      }
    }, [forwardedRef]);

    const hasError = !!error;
    const isFilled = !!value && value.length > 0;
    const showSecureToggle = secureTextEntry && isFilled;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleLabelPress = () => {
      if (!disabled && internalRef.current) {
        internalRef.current.focus();
      }
    };

    return (
      <YStack width="100%">
        <XStack position="relative" width="100%">
          <StyledInput
            ref={internalRef}
            value={value}
            variant={variant}
            error={hasError}
            disabled={disabled}
            secureTextEntry={secureTextEntry && !showPassword}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={maxLength}
            onChangeText={onChange}
            width="100%"
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            textAlignVertical={multiline ? "top" : "center"}
            height={multiline ? undefined : 56}
            minHeight={multiline ? 24 * numberOfLines + 40 : 56}
            paddingTop={multiline ? 24 : 16}
            {...props}
          />
          <LabelContainer
            focused={focused || isFilled}
            filled={isFilled}
            variant={variant}
            marginTop={variant === "outlined" && (focused || isFilled) ? -9 : 0}
            paddingHorizontal={
              variant === "outlined" && (focused || isFilled) ? 0 : 2
            }
            onPress={handleLabelPress}
            cursor="pointer"
            backgroundColor="transparent"
          >
            <Label
              variant={variant}
              focused={focused}
              filled={isFilled}
              error={hasError}
              disabled={disabled}
              backgroundColor={
                variant === "outlined" && (focused || isFilled)
                  ? "$surface"
                  : variant === "filled"
                    ? "$surfaceContainerHighest"
                    : "transparent"
              }
            >
              {label}
            </Label>
          </LabelContainer>

          {showSecureToggle && (
            <XStack
              position="absolute"
              right={12}
              top={16}
              onPress={togglePasswordVisibility}
              cursor="pointer"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </XStack>
          )}
        </XStack>

        <XStack width="100%" justifyContent="flex-end">
          {(helperText || error) && (
            <HelperText error={hasError}>{error || helperText}</HelperText>
          )}
          {maxLength && (
            <CounterText marginLeft={8}>
              {value?.length || 0}/{maxLength}
            </CounterText>
          )}
        </XStack>
      </YStack>
    );
  },
);

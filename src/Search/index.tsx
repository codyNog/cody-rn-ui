"use client";
import { Search as SearchIcon, X } from "@tamagui/lucide-icons";
import { type ReactNode, type Ref, forwardRef, useState } from "react";
import {
  type NativeSyntheticEvent,
  type TextInput,
  type TextInputKeyPressEventData,
  TouchableOpacity,
} from "react-native";
import {
  type InputProps,
  Input as TamaguiInput,
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
  paddingLeft: 56, // 検索アイコン用のスペース
  paddingRight: 40, // クリアボタン用のスペース
  borderWidth: 0,
  borderRadius: 28, // 丸みを帯びた形状
  backgroundColor: "$surfaceContainerHigh",

  // 共通のフォーカス状態のスタイル
  focusStyle: {
    outlineWidth: 0,
    borderWidth: 0,
  },

  // ホバー状態のスタイル
  hoverStyle: {
    backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
  },

  // バリアント
  variants: {
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
          outlineWidth: 0,
        },
      },
    },
  },
});

// 先頭アイコンコンテナ
const LeadingIconContainer = styled(XStack, {
  position: "absolute",
  left: 16,
  top: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
});

// 末尾アイコンコンテナ
const TrailingIconContainer = styled(XStack, {
  position: "absolute",
  right: 16,
  top: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
});

// クリアボタン
const ClearButton = styled(XStack, {
  position: "absolute",
  right: 16,
  top: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  cursor: "pointer",
});

type Props = Omit<InputProps, "ref" | "onChangeText" | "onChange"> & {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  error?: boolean;
  leadingIcon?: ReactNode;
  onClickLeadingIcon?: () => void;
  trailingIcon?: ReactNode;
  onClickTrailingIcon?: () => void;
};

export const Search = forwardRef<TextInput, Props>(
  (
    {
      placeholder = "検索",
      value = "",
      onChange,
      onSearch,
      error = false,
      disabled = false,
      leadingIcon,
      onClickLeadingIcon,
      trailingIcon,
      onClickTrailingIcon,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const isFilled = !!value && value.length > 0;

    const handleChange = (text: string) => {
      onChange?.(text);
    };

    const handleClear = () => {
      onChange?.("");
    };

    const handleKeyPress = (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (e.nativeEvent.key === "Enter" && onSearch) {
        onSearch(value);
      }
    };

    return (
      <YStack width="100%">
        <XStack position="relative" width="100%">
          <StyledInput
            ref={ref}
            value={value}
            error={error}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            width="100%"
            height={56}
            {...props}
          />
          <LeadingIconContainer>
            {leadingIcon ? (
              <TouchableOpacity onPress={onClickLeadingIcon}>
                {leadingIcon}
              </TouchableOpacity>
            ) : (
              <SearchIcon
                size={24}
                color={focused ? "$primary" : "$onSurfaceVariant"}
              />
            )}
          </LeadingIconContainer>

          {trailingIcon ? (
            <TrailingIconContainer>
              <TouchableOpacity onPress={onClickTrailingIcon}>
                {trailingIcon}
              </TouchableOpacity>
            </TrailingIconContainer>
          ) : isFilled ? (
            <ClearButton onPress={handleClear}>
              <X size={20} color="$onSurfaceVariant" />
            </ClearButton>
          ) : null}
        </XStack>
      </YStack>
    );
  },
);

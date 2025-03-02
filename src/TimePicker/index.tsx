"use client";
import { Clock } from "@tamagui/lucide-icons";
import { type Ref, useEffect, useState } from "react";
import type { TextInput } from "react-native";
import {
  Adapt,
  type InputProps,
  Input as TamaguiInput,
  Sheet,
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

// ラベルコンポーネント
const Label = styled(Text, {
  position: "absolute",
  left: 16,
  top: 16,
  fontSize: 16,
  color: "$onSurfaceVariant",
  transition: "all 0.2s ease",
  transformOrigin: "left top",

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
    filled: {
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

// 時間選択ボタン
const TimeButton = styled(XStack, {
  padding: 12,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  // ホバー状態
  hoverStyle: {
    backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
  },

  // 選択状態
  variants: {
    selected: {
      true: {
        backgroundColor: "$primaryContainer",
      },
    },
  },
});

// 時間選択テキスト
const TimeText = styled(Text, {
  fontSize: 16,
  color: "$onSurface",

  // 選択状態
  variants: {
    selected: {
      true: {
        color: "$onPrimaryContainer",
        fontWeight: "500",
      },
    },
  },
});

// 区切り線
const Divider = styled(YStack, {
  height: 1,
  backgroundColor: "$outlineVariant",
  marginVertical: 8,
});

// 時間フォーマット関数
const formatTime = (
  hours: number,
  minutes: number,
  use24Hour: boolean,
): string => {
  if (use24Hour) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// 時間文字列をパースする関数
const parseTimeString = (
  timeString: string,
  use24Hour: boolean,
): { hours: number; minutes: number } | null => {
  // 24時間形式: "HH:MM"
  if (use24Hour) {
    const match = timeString.match(/^(\d{1,2}):(\d{1,2})$/);
    if (match) {
      const hours = Number.parseInt(match[1], 10);
      const minutes = Number.parseInt(match[2], 10);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return { hours, minutes };
      }
    }
    return null;
  }

  // 12時間形式: "H:MM AM/PM" または "HH:MM AM/PM"
  const match = timeString.match(/^(\d{1,2}):(\d{1,2})\s*(AM|PM)$/i);
  if (match) {
    let hours = Number.parseInt(match[1], 10);
    const minutes = Number.parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
      if (period === "PM" && hours < 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    }
  }
  return null;
};

// 時間が有効かチェックする関数
const isValidTime = (hours: number, minutes: number): boolean => {
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

type Props = Omit<InputProps, "ref" | "onChangeText" | "onChange" | "value"> & {
  ref?: Ref<TextInput>;
  label: string;
  helperText?: string;
  error?: string;
  value?: { hours: number; minutes: number } | null;
  onChange: (value: { hours: number; minutes: number } | null) => void;
  variant?: "filled" | "outlined";
  use24Hour?: boolean;
  disabled?: boolean;
};

// 時間選択コンテンツコンポーネント
const TimePickerContent = ({
  hourOptions,
  minuteOptions,
  selectedHours,
  setSelectedHours,
  selectedMinutes,
  setSelectedMinutes,
  selectedPeriod,
  setSelectedPeriod,
  use24Hour,
  onCancel,
  onConfirm,
}: {
  hourOptions: number[];
  minuteOptions: number[];
  selectedHours: number;
  setSelectedHours: (hours: number) => void;
  selectedMinutes: number;
  setSelectedMinutes: (minutes: number) => void;
  selectedPeriod: "AM" | "PM";
  setSelectedPeriod: (period: "AM" | "PM") => void;
  use24Hour: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <YStack space={16} padding={16}>
      <Text fontSize={18} fontWeight="500" textAlign="center">
        時間を選択
      </Text>

      {/* 時間選択 */}
      <YStack>
        <Text fontSize={14} color="$onSurfaceVariant" marginBottom={8}>
          時間
        </Text>
        <XStack flexWrap="wrap" gap={8} justifyContent="center">
          {hourOptions.map((hour) => (
            <TimeButton
              key={`hour-${hour}`}
              selected={hour === selectedHours}
              onPress={() => setSelectedHours(hour)}
            >
              <TimeText selected={hour === selectedHours}>
                {hour.toString().padStart(2, "0")}
              </TimeText>
            </TimeButton>
          ))}
        </XStack>
      </YStack>

      {/* 分選択 */}
      <YStack>
        <Text fontSize={14} color="$onSurfaceVariant" marginBottom={8}>
          分
        </Text>
        <XStack flexWrap="wrap" gap={8} justifyContent="center">
          {minuteOptions.map((minute) => (
            <TimeButton
              key={`minute-${minute}`}
              selected={minute === selectedMinutes}
              onPress={() => setSelectedMinutes(minute)}
            >
              <TimeText selected={minute === selectedMinutes}>
                {minute.toString().padStart(2, "0")}
              </TimeText>
            </TimeButton>
          ))}
        </XStack>
      </YStack>

      {/* AM/PM選択（12時間制の場合のみ表示） */}
      {!use24Hour && (
        <YStack>
          <Text fontSize={14} color="$onSurfaceVariant" marginBottom={8}>
            AM/PM
          </Text>
          <XStack gap={16} justifyContent="center">
            <TimeButton
              selected={selectedPeriod === "AM"}
              onPress={() => setSelectedPeriod("AM")}
              paddingHorizontal={24}
            >
              <TimeText selected={selectedPeriod === "AM"}>AM</TimeText>
            </TimeButton>
            <TimeButton
              selected={selectedPeriod === "PM"}
              onPress={() => setSelectedPeriod("PM")}
              paddingHorizontal={24}
            >
              <TimeText selected={selectedPeriod === "PM"}>PM</TimeText>
            </TimeButton>
          </XStack>
        </YStack>
      )}

      <Divider />

      {/* 確定ボタン */}
      <XStack justifyContent="flex-end" gap={16}>
        <Text
          color="$primary"
          fontWeight="500"
          onPress={onCancel}
          cursor="pointer"
          padding={8}
        >
          キャンセル
        </Text>
        <Text
          color="$primary"
          fontWeight="500"
          onPress={onConfirm}
          cursor="pointer"
          padding={8}
        >
          OK
        </Text>
      </XStack>
    </YStack>
  );
};

export const TimePicker = ({
  ref,
  label,
  helperText,
  error,
  value,
  onChange,
  variant = "outlined",
  use24Hour = false,
  disabled,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedHours, setSelectedHours] = useState(value?.hours || 12);
  const [selectedMinutes, setSelectedMinutes] = useState(value?.minutes || 0);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">(
    value?.hours && value.hours >= 12 ? "PM" : "AM",
  );

  // 値が変更されたときに入力値を更新
  useEffect(() => {
    if (value) {
      setSelectedHours(value.hours);
      setSelectedMinutes(value.minutes);
      setSelectedPeriod(value.hours >= 12 ? "PM" : "AM");
      setInputValue(formatTime(value.hours, value.minutes, use24Hour));
    } else {
      setInputValue("");
    }
  }, [value, use24Hour]);

  const hasError = !!error;
  const isFilled = !!inputValue && inputValue.length > 0;

  // 時間選択を確定する関数
  const confirmTimeSelection = () => {
    const newHours =
      selectedPeriod === "PM" && selectedHours < 12
        ? selectedHours + 12
        : selectedPeriod === "AM" && selectedHours === 12
          ? 0
          : selectedHours;

    if (isValidTime(newHours, selectedMinutes)) {
      onChange({ hours: newHours, minutes: selectedMinutes });
      setInputValue(formatTime(newHours, selectedMinutes, use24Hour));
    }
    setOpen(false);
  };

  // 入力値が変更されたときの処理
  const handleInputChange = (text: string) => {
    setInputValue(text);

    const parsedTime = parseTimeString(text, use24Hour);
    if (parsedTime) {
      setSelectedHours(parsedTime.hours);
      setSelectedMinutes(parsedTime.minutes);
      setSelectedPeriod(parsedTime.hours >= 12 ? "PM" : "AM");
      onChange(parsedTime);
    } else if (text === "") {
      onChange(null);
    }
  };

  // 時間選択ダイアログを開く
  const openTimePicker = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  // 時間の選択肢を生成
  const hourOptions = use24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1);

  // 分の選択肢を生成（5分間隔）
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <YStack width="100%">
      <XStack position="relative" width="100%">
        <StyledInput
          ref={ref}
          value={inputValue}
          variant={variant}
          error={hasError}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={handleInputChange}
          width="100%"
          placeholder={use24Hour ? "HH:MM" : "HH:MM AM/PM"}
          onPressIn={openTimePicker}
          {...props}
        />
        <Label
          variant={variant}
          focused={focused || open}
          filled={isFilled}
          error={hasError}
          disabled={disabled}
          backgroundColor={
            variant === "filled" ? "$surfaceContainerHighest" : "$background"
          }
          paddingHorizontal={4}
          zIndex={1}
          marginTop={
            variant === "outlined" && (focused || isFilled || open) ? -8 : 0
          }
        >
          {label}
        </Label>

        <XStack
          position="absolute"
          right={12}
          top={16}
          onPress={openTimePicker}
          cursor="pointer"
        >
          <Clock size={24} color="$onSurfaceVariant" />
        </XStack>
      </XStack>

      {/* ヘルパーテキスト */}
      {(helperText || error) && (
        <HelperText error={hasError}>{error || helperText}</HelperText>
      )}

      {/* 時間選択シート */}
      <Adapt platform={"touch"}>
        <Sheet
          modal
          open={open}
          onOpenChange={setOpen}
          snapPointsMode="fit"
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
              <TimePickerContent
                hourOptions={hourOptions}
                minuteOptions={minuteOptions}
                selectedHours={selectedHours}
                setSelectedHours={setSelectedHours}
                selectedMinutes={selectedMinutes}
                setSelectedMinutes={setSelectedMinutes}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                use24Hour={use24Hour}
                onCancel={() => setOpen(false)}
                onConfirm={confirmTimeSelection}
              />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
    </YStack>
  );
};

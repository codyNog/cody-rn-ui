"use client";
import { Calendar } from "@tamagui/lucide-icons";
import { forwardRef, useEffect, useState } from "react";
import type { TextInput } from "react-native";
import {
  type InputProps,
  Input as TamaguiInput,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Dialog } from "../Dialog";
import { stateLayerOpacity } from "../theme";

// スタイル付きのInputコンポーネント
const StyledInput = styled(TamaguiInput, {
  minHeight: 56,
  fontSize: 16,
  lineHeight: 24,
  color: "$onSurface",
  outlineWidth: 0,
  outlineStyle: "none",
  pointerEvents: "auto", // pointer-eventsを明示的に設定

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

// 日付選択ボタン
const DateButton = styled(XStack, {
  width: 40,
  height: 40,
  borderRadius: 20,
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
        backgroundColor: "$primary",
      },
    },
    today: {
      true: {
        borderWidth: 1,
        borderColor: "$primary",
      },
    },
    disabled: {
      true: {
        opacity: 0.38,
        cursor: "not-allowed",
      },
    },
    otherMonth: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

// 日付テキスト
const DateText = styled(Text, {
  fontSize: 14,
  color: "$onSurface",

  // 選択状態
  variants: {
    selected: {
      true: {
        color: "$onPrimary",
        fontWeight: "500",
      },
    },
    today: {
      true: {
        color: "$primary",
        fontWeight: "500",
      },
    },
    disabled: {
      true: {
        color: "$onSurfaceVariant",
      },
    },
  },
});

// 月選択ボタン
const MonthYearButton = styled(XStack, {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  // ホバー状態
  hoverStyle: {
    backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
  },
});

// 曜日ヘッダー
const WeekdayHeader = styled(XStack, {
  justifyContent: "space-around",
  paddingVertical: 8,
});

// 曜日テキスト
const WeekdayText = styled(Text, {
  fontSize: 12,
  color: "$onSurfaceVariant",
  width: 40,
  textAlign: "center",
});

// 日付フォーマット関数
const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return format
    .replace(/YYYY/g, year.toString())
    .replace(/MM/g, month.toString().padStart(2, "0"))
    .replace(/DD/g, day.toString().padStart(2, "0"))
    .replace(/M/g, month.toString())
    .replace(/D/g, day.toString());
};

// 日付文字列をパースする関数
const parseDate = (dateString: string, format: string): Date | null => {
  // 正規表現パターンを作成
  const yearPattern = "(?<year>\\d{4})";
  const monthPattern = "(?<month>\\d{1,2})";
  const dayPattern = "(?<day>\\d{1,2})";

  // フォーマットを正規表現パターンに変換
  const regexPattern = format
    .replace(/YYYY/g, yearPattern)
    .replace(/MM/g, "(?<month>\\d{2})")
    .replace(/DD/g, "(?<day>\\d{2})")
    .replace(/M/g, monthPattern)
    .replace(/D/g, dayPattern);

  const regex = new RegExp(`^${regexPattern}$`);
  const match = dateString.match(regex);

  if (match?.groups) {
    const { year, month, day } = match.groups;
    const parsedDate = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10),
    );

    // 有効な日付かチェック
    if (
      parsedDate.getFullYear() === Number.parseInt(year, 10) &&
      parsedDate.getMonth() === Number.parseInt(month, 10) - 1 &&
      parsedDate.getDate() === Number.parseInt(day, 10)
    ) {
      return parsedDate;
    }
  }

  return null;
};

// 月の最初の日の曜日を取得
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// 月の日数を取得
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// 日付が範囲内かチェック
const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;
  return true;
};

// 日付が同じかチェック
const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 日付が今日かチェック
const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDate(date, today);
};

type Props = Omit<InputProps, "ref" | "onChangeText" | "onChange" | "value"> & {
  label: string;
  helperText?: string;
  error?: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
  variant?: "filled" | "outlined";
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  firstDayOfWeek?: 0 | 1; // 0: 日曜始まり, 1: 月曜始まり
  disabled?: boolean;
};

// 月名の配列
const MONTH_NAMES = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

// 曜日の配列（日曜始まり）
const WEEKDAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

// 日付選択コンテンツコンポーネント
const DatePickerContent = ({
  selectedDate,
  setSelectedDate,
  minDate,
  maxDate,
  firstDayOfWeek = 0,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  firstDayOfWeek?: 0 | 1;
}) => {
  const [viewDate, setViewDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date(),
  );
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

  // 月を変更
  const changeMonth = (delta: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setViewDate(newDate);
  };

  // 年を変更
  const changeYear = (delta: number) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newDate.getFullYear() + delta);
    setViewDate(newDate);
  };

  // 日付を選択
  const selectDate = (year: number, month: number, day: number) => {
    const newDate = new Date(year, month, day);
    if (isDateInRange(newDate, minDate, maxDate)) {
      setSelectedDate(newDate);
    }
  };

  // 月を選択
  const selectMonth = (month: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(month);
    setViewDate(newDate);
    setViewMode("days");
  };

  // 年を選択
  const selectYear = (year: number) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year);
    setViewDate(newDate);
    setViewMode("months");
  };

  // 曜日の配列を取得（firstDayOfWeekに基づいて）
  const getWeekdays = () => {
    if (firstDayOfWeek === 1) {
      // 月曜始まり
      return [...WEEKDAY_NAMES.slice(1), WEEKDAY_NAMES[0]];
    }
    return WEEKDAY_NAMES;
  };

  // 日付グリッドを生成
  const renderDaysGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = (getFirstDayOfMonth(year, month) - firstDayOfWeek + 7) % 7;

    // 前月の日数
    const daysInPrevMonth = getDaysInMonth(
      year,
      month - 1 < 0 ? 11 : month - 1,
    );

    // 日付グリッドの行を生成
    const rows = [];
    let cells = [];
    let prevMonthDay = daysInPrevMonth - firstDay + 1;
    let nextMonthDay = 1;

    // 前月の日付を追加
    for (let i = 0; i < firstDay; i++) {
      const prevYear = month === 0 ? year - 1 : year;
      const prevMonth = month === 0 ? 11 : month - 1;
      const date = new Date(prevYear, prevMonth, prevMonthDay);
      const isDisabled = !isDateInRange(date, minDate, maxDate);

      cells.push(
        <DateButton
          key={`prev-${prevMonthDay}`}
          otherMonth
          disabled={isDisabled}
          onPress={() => selectDate(prevYear, prevMonth, prevMonthDay)}
        >
          <DateText disabled={isDisabled}>{prevMonthDay}</DateText>
        </DateButton>,
      );
      prevMonthDay++;
    }

    // 当月の日付を追加
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = selectedDate && isSameDate(date, selectedDate);
      const isTodayDate = isToday(date);
      const isDisabled = !isDateInRange(date, minDate, maxDate);

      cells.push(
        <DateButton
          key={`current-${i}`}
          selected={isSelected}
          today={isTodayDate && !isSelected}
          disabled={isDisabled}
          onPress={() => selectDate(year, month, i)}
        >
          <DateText
            selected={isSelected}
            today={isTodayDate && !isSelected}
            disabled={isDisabled}
          >
            {i}
          </DateText>
        </DateButton>,
      );

      if (cells.length === 7 || i === daysInMonth) {
        // 最後の行の場合、次月の日付を追加
        if (i === daysInMonth) {
          const remainingCells = 7 - cells.length;
          for (let j = 0; j < remainingCells; j++) {
            const nextYear = month === 11 ? year + 1 : year;
            const nextMonth = month === 11 ? 0 : month + 1;
            const date = new Date(nextYear, nextMonth, nextMonthDay);
            const isDisabled = !isDateInRange(date, minDate, maxDate);

            cells.push(
              <DateButton
                key={`next-${nextMonthDay}`}
                otherMonth
                disabled={isDisabled}
                onPress={() => selectDate(nextYear, nextMonth, nextMonthDay)}
              >
                <DateText disabled={isDisabled}>{nextMonthDay}</DateText>
              </DateButton>,
            );
            nextMonthDay++;
          }
        }

        rows.push(
          <XStack key={`row-${rows.length}`} justifyContent="space-around">
            {cells}
          </XStack>,
        );
        cells = [];
      }
    }

    return rows;
  };

  // 月選択グリッドを生成
  const renderMonthsGrid = () => {
    const rows = [];
    let cells = [];

    for (let i = 0; i < 12; i++) {
      const isCurrentMonth =
        viewDate.getMonth() === i &&
        viewDate.getFullYear() === new Date().getFullYear();

      cells.push(
        <XStack
          key={`month-${i}`}
          padding={8}
          borderRadius={4}
          backgroundColor={isCurrentMonth ? "$primaryContainer" : "transparent"}
          onPress={() => selectMonth(i)}
          cursor="pointer"
        >
          <Text
            color={isCurrentMonth ? "$onPrimaryContainer" : "$onSurface"}
            fontWeight={isCurrentMonth ? "500" : "normal"}
          >
            {MONTH_NAMES[i]}
          </Text>
        </XStack>,
      );

      if (cells.length === 3 || i === 11) {
        rows.push(
          <XStack key={`row-${rows.length}`} justifyContent="space-around">
            {cells}
          </XStack>,
        );
        cells = [];
      }
    }

    return rows;
  };

  // 年選択グリッドを生成
  const renderYearsGrid = () => {
    const currentYear = viewDate.getFullYear();
    const startYear = currentYear - 6;
    const rows = [];
    let cells = [];

    for (let i = 0; i < 12; i++) {
      const year = startYear + i;
      const isCurrentYear = year === new Date().getFullYear();

      cells.push(
        <XStack
          key={`year-${year}`}
          padding={8}
          borderRadius={4}
          backgroundColor={isCurrentYear ? "$primaryContainer" : "transparent"}
          onPress={() => selectYear(year)}
          cursor="pointer"
        >
          <Text
            color={isCurrentYear ? "$onPrimaryContainer" : "$onSurface"}
            fontWeight={isCurrentYear ? "500" : "normal"}
          >
            {year}
          </Text>
        </XStack>,
      );

      if (cells.length === 3 || i === 11) {
        rows.push(
          <XStack key={`row-${rows.length}`} justifyContent="space-around">
            {cells}
          </XStack>,
        );
        cells = [];
      }
    }

    return rows;
  };

  return (
    <YStack space={16}>
      {/* 月・年選択ヘッダー */}
      <XStack justifyContent="space-between" alignItems="center">
        {viewMode === "days" && (
          <>
            <Text
              fontSize={16}
              fontWeight="500"
              onPress={() => setViewMode("months")}
              cursor="pointer"
            >
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </Text>
            <XStack gap={8}>
              <MonthYearButton onPress={() => changeMonth(-1)}>
                <Text>←</Text>
              </MonthYearButton>
              <MonthYearButton onPress={() => changeMonth(1)}>
                <Text>→</Text>
              </MonthYearButton>
            </XStack>
          </>
        )}

        {viewMode === "months" && (
          <>
            <Text
              fontSize={16}
              fontWeight="500"
              onPress={() => setViewMode("years")}
              cursor="pointer"
            >
              {viewDate.getFullYear()}
            </Text>
            <XStack gap={8}>
              <MonthYearButton onPress={() => changeYear(-1)}>
                <Text>←</Text>
              </MonthYearButton>
              <MonthYearButton onPress={() => changeYear(1)}>
                <Text>→</Text>
              </MonthYearButton>
            </XStack>
          </>
        )}

        {viewMode === "years" && (
          <>
            <Text fontSize={16} fontWeight="500">
              {viewDate.getFullYear() - 6} - {viewDate.getFullYear() + 5}
            </Text>
            <XStack gap={8}>
              <MonthYearButton onPress={() => changeYear(-12)}>
                <Text>←</Text>
              </MonthYearButton>
              <MonthYearButton onPress={() => changeYear(12)}>
                <Text>→</Text>
              </MonthYearButton>
            </XStack>
          </>
        )}
      </XStack>

      {/* 曜日ヘッダー（日モードのみ表示） */}
      {viewMode === "days" && (
        <WeekdayHeader>
          {getWeekdays().map((weekday) => (
            <WeekdayText key={weekday}>{weekday}</WeekdayText>
          ))}
        </WeekdayHeader>
      )}

      {/* 日付/月/年グリッド */}
      <YStack space={8}>
        {viewMode === "days" && renderDaysGrid()}
        {viewMode === "months" && renderMonthsGrid()}
        {viewMode === "years" && renderYearsGrid()}
      </YStack>
    </YStack>
  );
};

export const DatePicker = forwardRef<TextInput, Props>(
  (
    {
      label,
      helperText,
      error,
      value,
      onChange,
      variant = "outlined",
      format = "YYYY/MM/DD",
      minDate,
      maxDate,
      firstDayOfWeek = 0,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value || null,
    );

    // 値が変更されたときに入力値を更新
    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setInputValue(formatDate(value, format));
      } else {
        setInputValue("");
        setSelectedDate(null);
      }
    }, [value, format]);

    const hasError = !!error;
    const isFilled = !!inputValue && inputValue.length > 0;

    // 日付選択を確定する関数
    const confirmDateSelection = () => {
      if (selectedDate) {
        onChange(selectedDate);
        setInputValue(formatDate(selectedDate, format));
      }
      setOpen(false);
    };

    // 入力値が変更されたときの処理
    const handleInputChange = (text: string) => {
      setInputValue(text);

      const parsedDate = parseDate(text, format);
      if (parsedDate) {
        if (isDateInRange(parsedDate, minDate, maxDate)) {
          setSelectedDate(parsedDate);
          onChange(parsedDate);
        }
      } else if (text === "") {
        setSelectedDate(null);
        onChange(null);
      }
    };

    // 日付選択ダイアログを開く
    const openDatePicker = () => {
      if (!disabled) {
        // 選択日付がない場合は今日の日付を設定
        if (!selectedDate) {
          setSelectedDate(new Date());
        }
        setOpen(true);
      }
    };

    // 日付を選択
    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
    };

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
            placeholder={format}
            onPressIn={openDatePicker}
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
            onPress={openDatePicker}
            cursor="pointer"
          >
            <Calendar size={24} color="$onSurfaceVariant" />
          </XStack>
        </XStack>

        {/* ヘルパーテキスト */}
        {(helperText || error) && (
          <HelperText error={hasError}>{error || helperText}</HelperText>
        )}

        {/* 日付選択ダイアログ */}
        <Dialog
          open={open}
          onOpenChange={setOpen}
          content={
            selectedDate && (
              <DatePickerContent
                selectedDate={selectedDate}
                setSelectedDate={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                firstDayOfWeek={firstDayOfWeek}
              />
            )
          }
          actions={[
            {
              label: "キャンセル",
              onClick: () => setOpen(false),
              variant: "text",
            },
            {
              label: "OK",
              onClick: confirmDateSelection,
              variant: "filled",
            },
          ]}
        />
      </YStack>
    );
  },
);

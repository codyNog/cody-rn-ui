"use client";
import { Send } from "@tamagui/lucide-icons";
import {
  Children,
  type ReactNode,
  type Ref,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useRef,
} from "react";
import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from "react-native";
import {
  ScrollView,
  Button as TamaguiButton,
  type TamaguiElement,
  TextArea,
  View,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Button } from "../Button";
import { Text } from "../Text";

type WrapperProps = {
  children: ReactNode;
  onSubmit?: () => void | Promise<void>; // オプションのonSubmitコールバック
};

const Wrapper = ({ children, onSubmit }: WrapperProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // スクロールを最下部に移動させる関数
  const scrollToBottom = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  // 子要素を走査してChat.InputとChat.Contentを見つけ、必要なpropsを注入
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    // 子要素のpropsを確認して、InputとContentを識別
    const isInput =
      child.props && "onChange" in child.props && "onSubmit" in child.props;
    const isContent = child.props?.children && !isInput;

    // Chat.Inputの場合、onSubmitをラップしてスクロール処理を追加
    if (isInput) {
      return cloneElement(child, {
        onSubmit: async () => {
          // 元のonSubmitを呼び出し、Promiseを返す場合は完了を待つ
          if (typeof child.props.onSubmit === "function") {
            const result = child.props.onSubmit();
            // Promiseが返された場合は完了を待つ
            if (result instanceof Promise) {
              await result;
            }
          }
          // submitイベント完了後の処理
          // スクロールを最下部に移動
          scrollToBottom();
          // 外部のonSubmitコールバックを呼び出し、Promiseを返す場合は完了を待つ
          if (onSubmit) {
            const result = onSubmit();
            if (result instanceof Promise) {
              await result;
            }
          }
        },
      } as Partial<InputProps>);
    }

    // Chat.Contentの場合、refを追加
    if (isContent) {
      return cloneElement(child, {
        ref: scrollViewRef,
      } as { ref: Ref<ScrollView> });
    }

    return child;
  });

  return <YStack flex={1}>{enhancedChildren}</YStack>;
};

type ContentProps = {
  children: ReactNode;
};

const Content = forwardRef<ScrollView, ContentProps>(({ children }, ref) => {
  return (
    <ScrollView
      ref={ref}
      flex={1}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <YStack gap="$4" padding="$3" flex={1}>
        {children}
      </YStack>
    </ScrollView>
  );
});

type MessageProps = {
  children: ReactNode;
  type: "sent" | "received";
  timestamp?: string; // 日付情報（文字列として）
  isRead?: boolean; // 既読状態
  metadata?: ReactNode; // その他のメタデータを柔軟に表示するためのプロパティ
};

const MessageStyled = styled(View, {
  padding: "$3",
  width: "fit-content",
  maxWidth: "80%",
  borderWidth: 1,
  borderRadius: 12, // Material Design 3のカードと同じ角丸を適用
  // Material Design 3のエレベーションを適用
  shadowColor: "$shadow",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.18,
  shadowRadius: 1,
  variants: {
    type: {
      sent: {
        alignSelf: "flex-end",
        backgroundColor: "$primaryContainer",
        borderColor: "$primaryContainer",
      },
      received: {
        alignSelf: "flex-start",
        backgroundColor: "$surfaceContainer",
        borderColor: "$surfaceContainer",
      },
    },
  } as const,
});

const Message = forwardRef<TamaguiElement, MessageProps>(
  ({ children, type, timestamp, isRead, metadata }, ref) => {
    // typeに応じてTextの色を決定
    const textColor = type === "sent" ? "$onPrimaryContainer" : "$onSurface";

    return (
      <YStack>
        <MessageStyled ref={ref} type={type}>
          {/* childrenを適切な色のTextでラップ */}
          <Text color={textColor}>{children}</Text>
        </MessageStyled>

        {/* メタデータ表示エリア */}
        {(timestamp || isRead || metadata) && (
          <XStack
            marginTop="$1"
            gap="$2"
            alignSelf={type === "sent" ? "flex-end" : "flex-start"}
            paddingHorizontal="$1"
          >
            {/* タイムスタンプ */}
            {timestamp && (
              <Text variant="labelSmall" color="$onSurfaceVariant">
                {timestamp}
              </Text>
            )}

            {/* 既読状態（送信メッセージの場合のみ） */}
            {type === "sent" && isRead && (
              <Text variant="labelSmall" color="$primary">
                既読
              </Text>
            )}

            {/* その他のメタデータ */}
            {metadata &&
              (typeof metadata === "string" || typeof metadata === "number" ? (
                <Text>{metadata}</Text>
              ) : (
                metadata // 文字列か数値じゃなければそのまま出す
              ))}
          </XStack>
        )}
      </YStack>
    );
  },
);

const StyledInput = styled(TextArea, {
  height: 56,
  borderRadius: "$medium",
  backgroundColor: "$surfaceContainerLow",
  borderColor: "$outline",
  borderWidth: 1,
  paddingRight: 40, // 送信ボタン用のスペース
  color: "$onSurface", // 入力文字のカラーを設定
});

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  disabled?: boolean;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ value, onChange, onSubmit, disabled }, ref) => {
    const onKeyPress = useCallback(
      (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        // @ts-ignore
        if (e.key === "Enter" && e.metaKey) {
          onSubmit();
        }
      },
      [onSubmit],
    );

    return (
      <View
        backgroundColor="$surfaceContainer"
        padding="$3"
        borderRadius="$medium"
      >
        <View justifyContent="center">
          <StyledInput
            ref={ref}
            value={value}
            onChangeText={(e) => onChange(e)}
            onKeyPress={onKeyPress}
            disabled={disabled}
          />
          <TamaguiButton
            onPress={onSubmit}
            position="absolute"
            right={8}
            top={8}
            size="$3"
            circular
            icon={<Send size="$1" color="$primary" />}
            backgroundColor="$primaryContainer"
            disabled={disabled}
          />
        </View>
      </View>
    );
  },
);

type Action = {
  children: ReactNode;
  label: string;
  onPress: () => void | Promise<void>;
};

type ActionsProps = {
  actions: Action[];
};

const Actions = ({ actions }: ActionsProps) => {
  return (
    <XStack
      gap="$2"
      alignItems="flex-end"
      marginLeft={"auto"}
      paddingHorizontal="$2"
    >
      {actions.map(({ onPress, label }) => (
        <Button
          key={label}
          onPress={onPress}
          size="$3"
          backgroundColor="$surfaceContainerHigh"
          color="$primary"
          borderRadius="$medium"
        >
          {label}
        </Button>
      ))}
    </XStack>
  );
};

export const Chat = {
  Wrapper,
  Content,
  Message,
  Input,
  Actions,
};

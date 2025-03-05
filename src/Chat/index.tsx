"use client";
import { Send } from "@tamagui/lucide-icons";
import { type ReactNode, forwardRef, useCallback } from "react";
import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from "react-native";
import {
  ScrollView,
  Button as TamaguiButton,
  type TamaguiElement,
  Text,
  TextArea,
  View,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Button } from "../Button";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <YStack gap="$4" flex={1}>
      {children}
    </YStack>
  );
};

type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <ScrollView
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
};

type MessageProps = {
  children: ReactNode;
  type: "sent" | "received";
};

const MessageStyled = styled(Text, {
  padding: "$3",
  borderRadius: "$medium",
  width: "fit-content",
  maxWidth: "80%",
  // Material Design 3のエレベーションを適用
  shadowColor: "$shadow",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.18,
  shadowRadius: 1,
  elevation: 1,
  variants: {
    type: {
      sent: {
        alignSelf: "flex-end",
        backgroundColor: "$primaryContainer",
        color: "$onPrimaryContainer",
        borderBottomRightRadius: "$1",
      },
      received: {
        alignSelf: "flex-start",
        backgroundColor: "$surfaceContainer",
        color: "$onSurface",
        borderBottomLeftRadius: "$1",
      },
    },
  } as const,
});

const Message = forwardRef<TamaguiElement, MessageProps>(
  ({ children, type }, ref) => {
    return (
      <MessageStyled ref={ref} type={type}>
        {children}
      </MessageStyled>
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
});

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
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
    );
  },
);

type Action = {
  children: ReactNode;
  label: string;
  onPress: () => void;
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

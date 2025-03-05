"use client";
import { Send } from "@tamagui/lucide-icons";
import { forwardRef, type ReactNode, useCallback } from "react";
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
    <ScrollView flex={1}>
      <YStack gap="$4" padding="$2" flex={1}>
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
  padding: "$2",
  borderRadius: "$2",
  borderColor: "$gray200",
  borderWidth: 1,
  width: "fit-content",
  variants: {
    type: {
      sent: {
        alignSelf: "flex-end",
        backgroundColor: "$gray200",
      },
      received: {
        alignSelf: "flex-start",
        backgroundColor: "$gray100",
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
          right={0}
          top={6}
          icon={<Send />}
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
    <XStack gap="$2" alignItems="flex-end" marginLeft={"auto"}>
      {actions.map(({ onPress, label }) => (
        <Button key={label} onPress={onPress}>
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

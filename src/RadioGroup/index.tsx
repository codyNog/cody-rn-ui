"use client";
import { useId } from "react";
import {
  Label,
  RadioGroup as RG,
  type SizeTokens,
  XStack,
  YStack,
} from "tamagui";

type Option = {
  value: string;
  label: string;
};

type ItemProps = Option & {
  size: SizeTokens;
  onPress: (value: string) => void;
};

const Item = ({ size, value, label }: ItemProps) => {
  const id = useId();
  return (
    <XStack width={300} alignItems="center" gap="$4">
      <RG.Item value={value} id={id} size={size} onPress={() => {}}>
        <RG.Indicator />
      </RG.Item>
      <Label size={size} htmlFor={id}>
        {label}
      </Label>
    </XStack>
  );
};

type Props = {
  options: Option[];
  onChange: (value: string) => void;
};

export const RadioGroup = ({ options, onChange }: Props) => {
  const onPressItem = (value: string) => {
    onChange(value);
  };

  return (
    <YStack gap="$4">
      {options.map((option) => (
        <Item {...option} key={option.value} size="md" onPress={onPressItem} />
      ))}
    </YStack>
  );
};

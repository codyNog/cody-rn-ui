import type { Ref } from "react";
import type { TextInput } from "react-native";
import { Input as I, type InputProps, Text } from "tamagui";

type Props = InputProps & {
  ref?: Ref<TextInput>;
  error?: string;
};

export const Input = ({ ref, error, ...props }: Props) => {
  return (
    <>
      <I {...props} ref={ref} />
      {error && <Text color={"red"}>{error}</Text>}
    </>
  );
};

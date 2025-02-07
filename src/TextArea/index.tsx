import type { Ref } from "react";
import type { TextInput } from "react-native";
import { TextArea as TA, Text, type TextAreaProps } from "tamagui";

type Props = TextAreaProps & {
  error?: string;
  ref?: Ref<TextInput>;
};

export const TextArea = ({ error, ref, ...props }: Props) => {
  return (
    <>
      <TA ref={ref} {...props} />
      {error && <Text color="red">{error}</Text>}
    </>
  );
};

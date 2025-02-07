import type { Ref } from "react";
import {
  Label,
  Switch as S,
  Separator,
  type SwitchProps,
  type TamaguiElement,
  XStack,
} from "tamagui";

type Props = SwitchProps & {
  label?: string;
  ref?: Ref<TamaguiElement>;
};

export const Switch = ({
  size,
  defaultChecked,
  label,
  id,
  ref,
  ...rest
}: Props) => {
  return (
    <XStack alignItems="center" gap="$4">
      {label && (
        <>
          <Label
            paddingRight="$0"
            justifyContent="flex-end"
            size={size}
            htmlFor={id}
          >
            {label}
          </Label>
          <Separator minHeight={20} vertical />
        </>
      )}
      <S {...rest} id={id} size={size} ref={ref} inset="auto">
        <S.Thumb animation="quicker" />
      </S>
    </XStack>
  );
};

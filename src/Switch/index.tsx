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
  checked: boolean;
  id: string;
};

export const Switch = ({
  size = "$3",
  defaultChecked,
  label,
  id,
  ref,
  checked,
  ...rest
}: Props) => {
  return (
    <XStack width={200} alignItems="center" gap="$4">
      {label && (
        <>
          <Label
            paddingRight="$0"
            justifyContent="flex-end"
            size={size}
            htmlFor={id}
            minWidth={90}
          >
            {label}
          </Label>
          <Separator minHeight={20} vertical />
        </>
      )}
      <S {...rest} id={id} size={size} ref={ref} checked={checked}>
        <S.Thumb animation="quicker" />
      </S>
    </XStack>
  );
};

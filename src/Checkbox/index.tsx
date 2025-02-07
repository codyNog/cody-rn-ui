import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { useId, type Ref } from "react";
import {
  Checkbox as Cb,
  type CheckboxProps,
  Label,
  type TamaguiElement,
  XStack,
} from "tamagui";

type Props = CheckboxProps & {
  label?: string;
  ref?: Ref<TamaguiElement>;
};

export const Checkbox = ({
  size,
  label,
  id = useId(),
  ref,
  ...checkboxProps
}: Props) => {
  return (
    <XStack width={300} alignItems="center" gap="$4">
      <Cb {...checkboxProps} id={id} size={size} inset={"auto"} ref={ref}>
        <Cb.Indicator>
          <CheckIcon />
        </Cb.Indicator>
      </Cb>
      {label && (
        <Label size={size} htmlFor={id}>
          {label}
        </Label>
      )}
    </XStack>
  );
};

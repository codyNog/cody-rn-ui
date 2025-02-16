import { Check as CheckIcon, Minus } from "@tamagui/lucide-icons";
import { type Ref, useId } from "react";
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
  checked,
  ...checkboxProps
}: Props) => {
  return (
    <XStack width={300} alignItems="center" gap="$4">
      <Cb
        {...checkboxProps}
        checked={checked}
        id={id}
        size={size}
        inset={"auto"}
        ref={ref}
      >
        <Cb.Indicator>
          {checked === true && <CheckIcon />}
          {checked === "indeterminate" && <Minus />}
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

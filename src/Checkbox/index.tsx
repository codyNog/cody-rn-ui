import { Check as CheckIcon, Minus } from "@tamagui/lucide-icons";
import { type Ref, useId } from "react";
import {
  Checkbox as Cb,
  type CheckboxProps,
  Label,
  type TamaguiElement,
  XStack,
  styled,
} from "tamagui";
import { stateLayerOpacity } from "../theme";

// Material Design 3のスタイルを適用したCheckbox
const StyledCheckbox = styled(Cb, {
  // MD3のチェックボックスのスタイル
  borderRadius: 2,
  borderWidth: 2,
  borderColor: "$outline",
  backgroundColor: "transparent",

  // バリアント
  variants: {
    checked: {
      true: {
        borderColor: "$primary",
        backgroundColor: "$primary",
        // チェック状態のホバー
        hoverStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // チェック状態のプレス
        pressStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
      false: {
        borderColor: "$outline",
        backgroundColor: "transparent",
        // 未チェック状態のホバー
        hoverStyle: {
          backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
        },
        // 未チェック状態のプレス
        pressStyle: {
          backgroundColor: `$onSurface, ${stateLayerOpacity.press})`,
        },
      },
      indeterminate: {
        borderColor: "$primary",
        backgroundColor: "$primary",
        // 不確定状態のホバー
        hoverStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.hover,
        },
        // 不確定状態のプレス
        pressStyle: {
          backgroundColor: "$primary",
          opacity: 1 - stateLayerOpacity.press,
        },
      },
    },
  } as const,
});

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
  onCheckedChange,
  ...checkboxProps
}: Props) => {
  // ラベルクリック時のハンドラー
  const handleLabelClick = () => {
    onCheckedChange?.(!checked);
  };

  return (
    <XStack width={300} alignItems="center" gap="$4">
      <StyledCheckbox
        {...checkboxProps}
        checked={checked}
        id={id}
        size={size}
        inset={"auto"}
        ref={ref}
        onCheckedChange={onCheckedChange}
      >
        <Cb.Indicator forceMount>
          {checked === true && <CheckIcon color="$onPrimary" />}
          {checked === "indeterminate" && <Minus color="$onPrimary" />}
        </Cb.Indicator>
      </StyledCheckbox>
      {label && (
        <Label
          size={size}
          htmlFor={id}
          onPress={handleLabelClick}
          cursor="pointer"
        >
          {label}
        </Label>
      )}
    </XStack>
  );
};

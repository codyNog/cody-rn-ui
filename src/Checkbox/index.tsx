import { Check as CheckIcon, Minus } from "@tamagui/lucide-icons";
import { forwardRef, useId } from "react";
import { Ripple } from "../Ripple"; // Import Ripple
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
          cursor: "pointer",
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
          cursor: "pointer",
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
          cursor: "pointer",
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

const StyledLabel = styled(Label, {
  // MD3のラベルのスタイル (label large)
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  fontWeight: "500",
  color: "$onSurface", // Add onSurface color
});

type Props = Omit<CheckboxProps, "AnimatedNode" | "inset"> & {
  label?: string;
};

export const Checkbox = forwardRef<TamaguiElement, Props>(
  ({ size, label, id = useId(), checked, onCheckedChange }, ref) => {
    // ラベルがある場合はXStackでラップ、ない場合は直接StyledCheckboxを返す
    if (label) {
      return (
        <XStack width={300} alignItems="center" gap="$4">
          <Ripple>
            <StyledCheckbox
              checked={checked}
              id={id}
              size={size}
              ref={ref}
              onCheckedChange={onCheckedChange}
            >
              <Cb.Indicator forceMount>
                {checked === true && <CheckIcon color="$onPrimary" />}
                {checked === "indeterminate" && <Minus color="$onPrimary" />}
              </Cb.Indicator>
            </StyledCheckbox>
          </Ripple>
          <StyledLabel size={size} htmlFor={id} cursor="pointer">
            {label}
          </StyledLabel>
        </XStack>
      );
    }

    // ラベルがない場合は直接StyledCheckboxを返す
    return (
      <Ripple>
        <StyledCheckbox
          checked={checked}
          id={id}
          size={size}
          ref={ref}
          onCheckedChange={onCheckedChange}
        >
          <Cb.Indicator forceMount>
            {checked === true && <CheckIcon color="$onPrimary" />}
            {checked === "indeterminate" && <Minus color="$onPrimary" />}
          </Cb.Indicator>
        </StyledCheckbox>
      </Ripple>
    );
  },
);

import { forwardRef } from "react";
import {
  Label,
  Switch as S,
  type SwitchProps,
  type TamaguiElement,
  XStack,
  styled,
} from "tamagui";
import { stateLayerOpacity } from "../theme";

// Material Design 3のスタイルを適用したSwitch
const StyledSwitch = styled(S, {
  // MD3のスイッチのスタイル
  backgroundColor: "$surfaceContainerHighest",
  borderColor: "$outline",

  // バリアント
  variants: {
    checked: {
      true: {
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
        backgroundColor: "$surfaceContainerHighest",
        // 未チェック状態のホバー
        hoverStyle: {
          backgroundColor: `$onSurface, ${stateLayerOpacity.hover})`,
        },
        // 未チェック状態のプレス
        pressStyle: {
          backgroundColor: `$onSurface, ${stateLayerOpacity.press})`,
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.38,
        pointerEvents: "none",
      },
    },
  } as const,
});

// スタイル付きのThumb
const StyledThumb = styled(S.Thumb, {
  backgroundColor: "$onSurfaceVariant",

  // Material Design 3のスイッチのつまみスタイル
  transform: [{ translateX: -4 }],

  variants: {
    checked: {
      true: {
        backgroundColor: "$onPrimary",
        transform: [{ translateX: 4 }],
      },
      false: {
        backgroundColor: "$onSurfaceVariant",
        transform: [{ translateX: -4 }],
      },
    },
  } as const,
});

type Props = SwitchProps & {
  label?: string;
  checked: boolean;
  id: string;
  disabled?: boolean;
};

export const Switch = forwardRef<TamaguiElement, Props>(
  (
    {
      size = "$3",
      defaultChecked,
      label,
      id,
      checked,
      disabled = false,
      onCheckedChange,
    },
    ref,
  ) => {
    // ラベルクリック時のハンドラー
    const handleLabelClick = () => {
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    // ラベルがある場合はXStackでラップ、ない場合は直接StyledSwitchを返す
    if (label) {
      return (
        <XStack width={300} alignItems="center" gap="$4">
          <StyledSwitch
            id={id}
            size={size}
            ref={ref}
            checked={checked}
            disabled={disabled}
            onCheckedChange={onCheckedChange}
            defaultChecked={defaultChecked}
          >
            <StyledThumb animation="quick" checked={checked} />
          </StyledSwitch>
          <Label
            size={size}
            htmlFor={id}
            onPress={handleLabelClick}
            cursor={disabled ? "not-allowed" : "pointer"}
            opacity={disabled ? 0.38 : 1}
          >
            {label}
          </Label>
        </XStack>
      );
    }

    // ラベルがない場合は直接StyledSwitchを返す
    return (
      <StyledSwitch
        id={id}
        size={size}
        ref={ref}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        defaultChecked={defaultChecked}
      >
        <StyledThumb animation="quick" checked={checked} />
      </StyledSwitch>
    );
  },
);

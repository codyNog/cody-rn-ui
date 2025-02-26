import type { Ref } from "react";
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
          backgroundColor: `rgba(var(--color-on-surface), ${stateLayerOpacity.hover})`,
        },
        // 未チェック状態のプレス
        pressStyle: {
          backgroundColor: `rgba(var(--color-on-surface), ${stateLayerOpacity.press})`,
        },
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
  onCheckedChange,
  ...rest
}: Props) => {
  // ラベルクリック時のハンドラー
  const handleLabelClick = () => {
    onCheckedChange?.(!checked);
  };

  return (
    <XStack width={300} alignItems="center" gap="$4">
      <StyledSwitch
        {...rest}
        id={id}
        size={size}
        ref={ref}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <StyledThumb animation="quick" checked={checked} />
      </StyledSwitch>
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

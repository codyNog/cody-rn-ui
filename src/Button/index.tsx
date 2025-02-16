"use client";
import type { ReactNode, Ref } from "react";
import { Button as TamaguiButton, type TamaguiElement } from "tamagui";

type Variant = "outlined";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  ref?: Ref<TamaguiElement>;
  variant?: Variant;
};

export const Button = ({ children, onPress, ref, variant }: Props) => {
  return (
    <TamaguiButton ref={ref} onPress={onPress} variant={variant}>
      {children}
    </TamaguiButton>
  );
};

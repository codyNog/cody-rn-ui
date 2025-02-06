"use client";
import type { ReactNode, Ref } from "react";
import { Button as TamaguiButton, type TamaguiElement } from "tamagui";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  ref?: Ref<TamaguiElement>;
};

export const Button = ({ children, onPress, ref }: Props) => {
  return (
    <TamaguiButton ref={ref} onPress={onPress}>
      {children}
    </TamaguiButton>
  );
};

"use client";
import type { ReactNode, Ref } from "react";
import type { View } from "react-native";
import { Label as TamaguiLabel } from "tamagui";

type Props = {
  ref?: Ref<View | HTMLButtonElement>;
  children: ReactNode;
  htmlFor: string;
};

export const Label = ({ ref, children, htmlFor }: Props) => {
  return (
    <TamaguiLabel ref={ref} htmlFor={htmlFor}>
      {children}
    </TamaguiLabel>
  );
};

"use client";
import type { ReactNode, Ref } from "react";
import { Text as TamaguiText, type TamaguiTextElement } from "tamagui";

type Props = {
  children: ReactNode;
  ref?: Ref<TamaguiTextElement>;
};

export const Text = ({ children, ref }: Props) => {
  return <TamaguiText ref={ref}>{children}</TamaguiText>;
};

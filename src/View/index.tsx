"use client";
import type { ReactNode, Ref } from "react";
import { type TamaguiElement, View as TamaguiView } from "tamagui";

type Props = {
  ref?: Ref<TamaguiElement>;
  children: ReactNode;
};

export const View = ({ ref, children }: Props) => {
  return <TamaguiView ref={ref}>{children}</TamaguiView>;
};

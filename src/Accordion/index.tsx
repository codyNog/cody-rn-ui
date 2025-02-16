"use client";
import type { Ref } from "react";
import { type TamaguiElement, Text } from "tamagui";

type Props = {
  ref?: Ref<TamaguiElement>;
};

export const Accordion = ({ ref }: Props) => {
  return <Text ref={ref}>Accordion</Text>;
};

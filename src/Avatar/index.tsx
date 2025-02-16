"use client";
import type { Ref } from "react";
import { Avatar as TamaguiAvatar, type TamaguiElement } from "tamagui";

type Props = {
  ref?: Ref<TamaguiElement>;
  src: string;
  size: number;
};

export const Avatar = ({ ref, src, size = 10 }: Props) => {
  return (
    <TamaguiAvatar ref={ref} circular size={`$${size}`}>
      <TamaguiAvatar.Image accessibilityLabel="Cam" src={src} />
      <TamaguiAvatar.Fallback backgroundColor="$blue10" />
    </TamaguiAvatar>
  );
};

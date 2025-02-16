"use client";
import type { Ref } from "react";
import type { SliderProps, TamaguiElement } from "tamagui";
import { Slider as TamaguiSlider } from "tamagui";

type Props = SliderProps & {
  ref?: Ref<TamaguiElement>;
};

export const Slider = ({ ref, children, ...props }: Props) => {
  return (
    <TamaguiSlider ref={ref} {...props}>
      <TamaguiSlider.Track>
        <TamaguiSlider.TrackActive />
      </TamaguiSlider.Track>
      <TamaguiSlider.Thumb size="$2" index={0} circular />
      {children}
    </TamaguiSlider>
  );
};

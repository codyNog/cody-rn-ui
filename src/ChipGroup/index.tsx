"use client";
import { type ComponentProps, forwardRef } from "react";
import type { TamaguiElement } from "tamagui";
import { Chip } from "../Chip";
import { Grid } from "../Grid";

type Props = {
  chips: ComponentProps<typeof Chip>[];
};

export const ChipGroup = forwardRef<TamaguiElement, Props>(({ chips }, ref) => {
  return (
    <Grid.Row ref={ref}>
      {chips.map((chip) => (
        <Chip key={JSON.stringify(chip)} {...chip} />
      ))}
    </Grid.Row>
  );
});

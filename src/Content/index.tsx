"use client";
import { forwardRef, type ReactNode } from "react";
import type { TamaguiElement } from "tamagui";
import { Background } from "../Background";
import { Grid } from "../Grid";

type Props = {
  children: ReactNode;
};

export const Content = forwardRef<TamaguiElement, Props>(
  ({ children }, ref) => {
    return (
      <Background ref={ref}>
        <Grid.Container>{children}</Grid.Container>
      </Background>
    );
  },
);

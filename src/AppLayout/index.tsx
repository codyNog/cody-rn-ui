"use client";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../Background";
import { Grid } from "../Grid";
import { NavigationBar } from "../NavigationBar";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  navigationBar?: ComponentProps<typeof NavigationBar>;
};

export const AppLayout = ({ children, navigationBar }: Props) => {
  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <Grid.Container>{children}</Grid.Container>
        {navigationBar && <NavigationBar {...navigationBar} />}
      </SafeAreaView>
    </Background>
  );
};

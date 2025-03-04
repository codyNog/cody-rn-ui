"use client";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../Background";
import { Grid } from "../Grid";
import { NavigationBar } from "../NavigationBar";
import type { ComponentProps, ReactNode } from "react";
import { TopAppBar } from "../TopAppBar";

type Props = {
  children: ReactNode;
  topAppBar?: ComponentProps<typeof TopAppBar>;
  navigationBar?: ComponentProps<typeof NavigationBar>;
};

export const AppLayout = ({ children, topAppBar, navigationBar }: Props) => {
  return (
    <Background>
      {topAppBar && <TopAppBar {...topAppBar} />}
      <SafeAreaView style={{ flex: 1 }}>
        <Grid.Container>{children}</Grid.Container>
      </SafeAreaView>
      {navigationBar && <NavigationBar {...navigationBar} />}
    </Background>
  );
};

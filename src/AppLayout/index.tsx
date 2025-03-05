"use client";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../Background";
import { Grid } from "../Grid";
import { NavigationBar } from "../NavigationBar";
import type { ComponentProps, ReactNode } from "react";
import { TopAppBar } from "../TopAppBar";
import { Tabs } from "../Tabs";
import { ScrollView, YStack } from "tamagui";

type Props = {
  children?: ReactNode;
  topAppBar?: ComponentProps<typeof TopAppBar>;
  navigationBar?: ComponentProps<typeof NavigationBar>;
  tabs?: ComponentProps<typeof Tabs>;
};

export const AppLayout = ({
  children,
  topAppBar,
  navigationBar,
  tabs,
}: Props) => {
  return (
    <YStack flex={1} height="100vh" maxHeight="100vh">
      <Background>
        {topAppBar && <TopAppBar {...topAppBar} />}
        <SafeAreaView style={{ flex: 1 }}>
          {tabs ? (
            <Tabs {...tabs} />
          ) : (
            <Grid.Container>{children}</Grid.Container>
          )}
        </SafeAreaView>
        {navigationBar && <NavigationBar {...navigationBar} />}
      </Background>
    </YStack>
  );
};

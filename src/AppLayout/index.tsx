import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled, View } from "tamagui";

const Wrapper = styled(View, {
  flex: 1,
  backgroundColor: "$surfaceContainer",
});

const Background = styled(View, {
  backgroundColor: "$background",
  flexDirection: "column",
  flex: 1,
  maxHeight: "100%",
  height: "100%",
});

type Props = {
  children: ReactNode;
  navigationBar?: ReactNode;
  topAppBar?: ReactNode;
};

export const AppLayout = ({ children, navigationBar, topAppBar }: Props) => {
  return (
    <Wrapper>
      {topAppBar && topAppBar}
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
        <Background>{children}</Background>
      </SafeAreaView>
      {navigationBar && navigationBar}
    </Wrapper>
  );
};

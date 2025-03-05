import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../Background";
import { styled, View } from "tamagui";

const Wrapper = styled(View, {
  flex: 1,
  backgroundColor: "$surfaceContainer",
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
      <Background>
        <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
          {children}
        </SafeAreaView>
      </Background>
      {navigationBar && navigationBar}
    </Wrapper>
  );
};

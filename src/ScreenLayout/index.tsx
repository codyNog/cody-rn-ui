import type { ReactNode } from "react";
import { View, styled } from "tamagui";
import { SafeAreaView } from "../SafeAreaView";

const Wrapper = styled(View, {
  flex: 1,
  backgroundColor: "$surfaceContainer",
});
type Props = {
  children: ReactNode;
  navigationBar?: ReactNode;
  topAppBar?: ReactNode;
  navigationDrawer?: ReactNode;
};

export const ScreenLayout = ({
  children,
  navigationBar,
  topAppBar,
  navigationDrawer,
}: Props) => {
  return (
    <Wrapper>
      {navigationDrawer && navigationDrawer}
      <SafeAreaView>
        {topAppBar && topAppBar}
        <View flex={1} backgroundColor="$background">
          {children}
        </View>
        {navigationBar && <View height={80} />}
      </SafeAreaView>
      <View
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor="$surfaceContainer"
      >
        {navigationBar && navigationBar}
      </View>
    </Wrapper>
  );
};

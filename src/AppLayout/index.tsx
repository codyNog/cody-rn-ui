import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../Background";

type Props = {
  children: ReactNode;
  navigationBar?: ReactNode;
  topAppBar?: ReactNode;
};

export const AppLayout = ({ children, navigationBar, topAppBar }: Props) => {
  return (
    <Background>
      {topAppBar && topAppBar}
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
      {navigationBar && navigationBar}
    </Background>
  );
};

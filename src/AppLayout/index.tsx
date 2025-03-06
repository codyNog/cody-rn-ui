import type { ReactNode } from "react";
import { View, styled } from "tamagui";
import { Background } from "../Background";

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
      <Background>{children}</Background>
      {navigationBar && navigationBar}
    </Wrapper>
  );
};

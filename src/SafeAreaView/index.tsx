"use client";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled, View } from "tamagui";
import type { ReactNode } from "react";

const StyledSafeAreaView = styled(RNSafeAreaView, {
  backgroundColor: "$surfaceContainer",
});

type CustomSafeAreaViewProps = {
  children: ReactNode;
};

/**
 * カスタムSafeAreaViewコンポーネント
 * 上部のエッジにのみ$onSurface背景色を適用します
 */
export const SafeAreaView = ({ children }: CustomSafeAreaViewProps) => {
  return (
    <View flex={1}>
      {/* 上部のみSafeAreaを適用し、背景色を設定 */}
      <StyledSafeAreaView edges={["top"]} />
      <RNSafeAreaView edges={["right", "left"]} style={{ flex: 1 }}>
        {children}
      </RNSafeAreaView>
    </View>
  );
};

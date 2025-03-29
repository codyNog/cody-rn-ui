"use client";
import { forwardRef, useState } from "react";
import type { ReactNode } from "react";
import type { View } from "react-native";
import { Sheet, XStack, YStack, styled } from "tamagui";
import { elevationSystem } from "../theme";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  snapPoints?: number[];
  children?: ReactNode; // シートを開くトリガーとして使用
  content?: ReactNode; // シートのコンテンツとして使用
  dismissOnSnapToBottom?: boolean;
  position?: number;
  onPositionChange?: (position: number) => void;
  modal?: boolean;
  zIndex?: number;
  handleComponent?: ReactNode;
  disableDrag?: boolean;
};

// スタイル付きのシートオーバーレイ
const StyledSheetOverlay = styled(Sheet.Overlay, {
  backgroundColor: "$scrim",
  opacity: 0.3,
});

// スタイル付きのシートフレーム
const StyledSheetFrame = styled(Sheet.Frame, {
  backgroundColor: "$surfaceContainerHigh",
  borderTopLeftRadius: "$extraLarge",
  borderTopRightRadius: "$extraLarge",
  borderWidth: 0,
  ...elevationSystem.shadows.level3,
});

// デフォルトのハンドルコンポーネント
const DefaultHandle = styled(XStack, {
  width: 32,
  height: 4,
  backgroundColor: "$outlineVariant",
  alignSelf: "center",
  marginVertical: "$3",
  borderRadius: "$full",
});

// シートのコンテンツコンテナ
const SheetContent = styled(YStack, {
  padding: "$4",
  paddingTop: 0,
});

export const BottomSheet = forwardRef<View, Props>(
  (
    {
      open,
      onOpenChange,
      snapPoints = [25, 50, 80],
      children,
      content,
      dismissOnSnapToBottom = true,
      position,
      onPositionChange,
      modal = true,
      zIndex = 100,
      handleComponent,
      disableDrag = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(open || false);

    // 外部からのopen状態の制御と内部状態の同期
    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    return (
      <>
        {children && (
          <YStack onPress={() => handleOpenChange(true)}>{children}</YStack>
        )}
        <Sheet
          ref={ref}
          modal={modal}
          open={open !== undefined ? open : isOpen}
          onOpenChange={handleOpenChange}
          snapPoints={snapPoints}
          position={position}
          onPositionChange={onPositionChange}
          dismissOnSnapToBottom={dismissOnSnapToBottom}
          zIndex={zIndex}
          disableDrag={disableDrag}
        >
          <StyledSheetOverlay animation="quick" />
          <Sheet.Handle>{handleComponent || <DefaultHandle />}</Sheet.Handle>
          <StyledSheetFrame animation="quick">
            <SheetContent>{content}</SheetContent>
          </StyledSheetFrame>
        </Sheet>
      </>
    );
  },
);

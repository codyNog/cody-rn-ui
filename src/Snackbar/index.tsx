"use client";
import { X } from "@tamagui/lucide-icons";
import { ToastViewport, useToastController } from "@tamagui/toast";
import { useCallback, useState } from "react";
import { Text, XStack, styled } from "tamagui";
import { Button } from "../Button";
import { elevationSystem } from "../theme";

export type SnackbarProps = {
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  onClose?: () => void;
  duration?: number;
  hasCloseButton?: boolean;
  isNative?: boolean;
};

const SnackbarContainer = styled(XStack, {
  backgroundColor: "$surfaceContainer",
  borderRadius: "$2",
  padding: "$3",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 48,
  maxWidth: 640,
  width: "100%",
  marginHorizontal: "auto",
  ...elevationSystem.shadows.level3,
});

const ActionButton = styled(Button, {
  backgroundColor: "transparent",
  color: "$primary",
  fontWeight: "500",
  paddingHorizontal: "$2",
  height: 36,
});

const CloseButton = styled(Button, {
  backgroundColor: "transparent",
  color: "$onSurfaceVariant",
  size: "$3",
  padding: 0,
});

// カスタムToastViewportを作成
export const SnackbarViewport = () => (
  <ToastViewport
    multipleToasts
    flexDirection="column-reverse"
    justifyContent="flex-start"
    alignItems="center"
    width="100%"
    padding="$4"
    paddingBottom="$6"
    position="absolute"
    bottom={0}
    left={0}
    right={0}
    zIndex={100000}
  />
);

export const Snackbar = ({
  message,
  action,
  onClose,
  hasCloseButton = false,
}: SnackbarProps) => (
  <SnackbarContainer>
    <Text color="$onSurface" flex={1}>
      {message}
    </Text>
    <XStack space="$2" alignItems="center">
      {action && (
        <ActionButton variant="text" onPress={action.onPress}>
          {action.label}
        </ActionButton>
      )}
      {hasCloseButton && (
        <CloseButton variant="text" onPress={onClose} aria-label="閉じる">
          <X size={18} />
        </CloseButton>
      )}
    </XStack>
  </SnackbarContainer>
);

export const useSnackbar = ({ isNative }: { isNative: boolean }) => {
  const toast = useToastController();
  toast.options = {
    native: isNative,
  };
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(
    (options: SnackbarProps) => {
      setIsVisible(true);

      const handleClose = () => {
        setIsVisible(false);
        options.onClose?.();
      };

      const handleAction = () => {
        options.action?.onPress();
        setIsVisible(false);
      };

      toast.show(options.message, {
        duration: options.duration || 4000,
        // 画面下部に表示するための設定
        bottomOffset: 0,
        placement: "bottom",
        customContent: (
          <Snackbar
            message={options.message}
            action={
              options.action
                ? {
                    label: options.action.label,
                    onPress: handleAction,
                  }
                : undefined
            }
            hasCloseButton={options.hasCloseButton}
            onClose={handleClose}
          />
        ),
      });
    },
    [toast],
  );

  const hide = useCallback(() => {
    setIsVisible(false);
    toast.hide();
  }, [toast]);

  return {
    show,
    hide,
    isVisible,
  };
};

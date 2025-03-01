"use client";
import { X } from "@tamagui/lucide-icons";
import { useState } from "react";
import {
  Dialog as TamaguiDialog,
  XStack,
  YStack,
  type TamaguiElement,
  Text,
  styled,
} from "tamagui";
import { Button, type ButtonVariant } from "../Button";
import { typographyScale } from "../theme";
import type { ReactNode, Ref } from "react";

type Action = {
  label: string;
  onClick: () => void;
  href?: string;
  variant?: ButtonVariant;
};

type Props = {
  ref?: Ref<TamaguiElement>;
  variant?: "basic" | "fullScreen";
  icon?: ReactNode;
  headline?: string;
  supportingText?: string;
  actions: Action[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode; // トリガーとして使用
  content: ReactNode; // ダイアログのコンテンツとして使用
};

// スタイル付きのダイアログコンテナ
const StyledDialogContent = styled(TamaguiDialog.Content, {
  backgroundColor: "$surfaceContainerHigh",
  borderRadius: 28,
  padding: "$5",
  maxWidth: 560,
  width: "90%", // level3からlevel1に変更して軽量化
  borderWidth: 0, // 明示的にボーダーを削除

  // バリアント
  variants: {
    variant: {
      basic: {
        // 基本的なダイアログのスタイル
      },
      fullScreen: {
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        borderRadius: 0,
        padding: 0,
      },
    },
  },
  defaultVariants: {
    variant: "basic",
  },
});

// ダイアログのヘッダー
const DialogHeader = styled(YStack, {
  gap: "$2",
  marginBottom: "$4",
  alignItems: "center",
});

// ダイアログのアイコンコンテナ
const IconContainer = styled(YStack, {
  marginBottom: "$2",
});

// ダイアログのタイトル
const DialogTitle = styled(Text, {
  ...typographyScale.headlineSmall,
  color: "$onSurface",
  textAlign: "center",
});

// ダイアログのサポートテキスト
const DialogSupportingText = styled(Text, {
  ...typographyScale.bodyMedium,
  color: "$onSurfaceVariant",
  textAlign: "center",
});

// ダイアログのコンテンツ
const DialogContent = styled(YStack, {
  gap: "$3",
  marginBottom: "$4",
});

// ダイアログのアクション
const DialogActions = styled(XStack, {
  gap: "$3",
  justifyContent: "flex-end",
});

// フルスクリーンダイアログのヘッダー
const FullScreenHeader = styled(XStack, {
  height: 56,
  paddingHorizontal: "$4",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: "$outlineVariant",
});

// フルスクリーンダイアログのコンテンツコンテナ
const FullScreenContainer = styled(YStack, {
  flex: 1,
  padding: "$5",
});

export const Dialog = ({
  ref,
  variant = "basic",
  icon,
  headline,
  supportingText,
  actions,
  open,
  onOpenChange,
  children,
  content,
}: Props) => {
  const [isOpen, setIsOpen] = useState(open || false);

  // 外部からのopen状態の制御と内部状態の同期
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <TamaguiDialog
      modal
      open={open !== undefined ? open : isOpen}
      onOpenChange={handleOpenChange}
    >
      <TamaguiDialog.Trigger asChild>{children}</TamaguiDialog.Trigger>

      <TamaguiDialog.Portal>
        <TamaguiDialog.Overlay
          key="overlay"
          animation="quick"
          backgroundColor="$scrim"
          opacity={0.3} // 0.5から0.3に変更して軽量化
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <StyledDialogContent
          ref={ref}
          variant={variant}
          key="content"
          animation="quick"
          enterStyle={{ opacity: 0, scale: 0.95 }}
          exitStyle={{ opacity: 0, scale: 0.95 }}
          elevate
        >
          {variant === "fullScreen" ? (
            <>
              <FullScreenHeader>
                <Button variant="text" onPress={() => handleOpenChange(false)}>
                  <X size={24} />
                </Button>
                {headline && (
                  <Text {...typographyScale.titleLarge} color="$onSurface">
                    {headline}
                  </Text>
                )}
                <Button
                  variant="text"
                  onPress={actions[0]?.onClick}
                  disabled={!actions[0]}
                >
                  {actions[0]?.label || ""}
                </Button>
              </FullScreenHeader>
              <FullScreenContainer>
                {content}
                {supportingText && (
                  <DialogSupportingText>{supportingText}</DialogSupportingText>
                )}
              </FullScreenContainer>
            </>
          ) : (
            <>
              <TamaguiDialog.Close
                asChild
                position="absolute"
                top="$3"
                right="$3"
              >
                <Button variant="text" size="small" aria-label="閉じる">
                  <X size={18} />
                </Button>
              </TamaguiDialog.Close>

              <DialogHeader>
                {icon && <IconContainer>{icon}</IconContainer>}
                {headline && <DialogTitle>{headline}</DialogTitle>}
                {supportingText && (
                  <DialogSupportingText>{supportingText}</DialogSupportingText>
                )}
              </DialogHeader>

              {content && <DialogContent>{content}</DialogContent>}

              <DialogActions>
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant || "text"}
                    onPress={action.onClick}
                    href={action.href}
                  >
                    {action.label}
                  </Button>
                ))}
              </DialogActions>
            </>
          )}
        </StyledDialogContent>
      </TamaguiDialog.Portal>
    </TamaguiDialog>
  );
};

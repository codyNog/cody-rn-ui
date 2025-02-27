"use client";
import { X } from "@tamagui/lucide-icons";
import { type ReactNode, type Ref, useCallback, useState } from "react";
import {
  type TamaguiElement,
  Tooltip as TamaguiTooltip,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { Button } from "../Button";
import { elevationSystem, stateLayerOpacity, typographyScale } from "../theme";

// Material Design 3のスタイルを適用したTooltipコンテナ
const TooltipContainer = styled(YStack, {
  // バリアント
  variants: {
    rich: {
      false: {
        // プレーンバリアント（MD3ガイドラインに準拠）
        backgroundColor: "$inverseSurface",
        color: "$inverseOnSurface",
        borderRadius: "$2",
        paddingVertical: "$2",
        paddingHorizontal: "$3",
        alignSelf: "flex-start", // コンテンツに合わせて幅を調整
        ...elevationSystem.shadows.level1,
      },
      true: {
        // リッチバリアント
        backgroundColor: "$surfaceContainerHigh",
        borderRadius: "$4",
        padding: "$4",
        maxWidth: 320,
        ...elevationSystem.shadows.level3,
      },
    },
  } as const,
});

// Tooltipのテキスト
const TooltipText = styled(Text, {
  ...typographyScale.bodyMedium,

  variants: {
    rich: {
      false: {
        color: "$inverseOnSurface",
        ...typographyScale.labelLarge,
      },
      true: {
        color: "$onSurface",
      },
    },
  } as const,
});

// Tooltipのタイトル
const TooltipTitle = styled(Text, {
  ...typographyScale.titleSmall,
  color: "$onSurface",
  marginBottom: "$2",
});

// アクションコンテナ
const ActionContainer = styled(XStack, {
  marginTop: "$2",
  justifyContent: "flex-start",
});

// 閉じるボタン
const CloseButton = styled(XStack, {
  backgroundColor: "transparent",
  padding: "$1",
  borderRadius: "$full",
  cursor: "pointer",

  // ホバー状態のスタイル
  hoverStyle: {
    backgroundColor: `rgba($onSurface, ${stateLayerOpacity.hover})`,
  },

  // プレス状態のスタイル
  pressStyle: {
    backgroundColor: `rgba($onSurface, ${stateLayerOpacity.press})`,
  },
});

type Props = {
  ref?: Ref<TamaguiElement>;
  children: ReactNode;
  content: ReactNode;
  title?: string;
  onClose?: () => void;
  variant?: "plain" | "rich";
  action?: {
    onClick: () => void;
    label: string;
  };
};

export const Tooltip = ({
  ref,
  children,
  title,
  onClose,
  variant = "plain",
  action,
  content,
}: Props) => {
  const rich = variant === "rich";
  const [isOpen, setOpen] = useState(false);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isHoveringContent, setIsHoveringContent] = useState(false);

  // トリガーのマウスイベント
  const onTriggerMouseEnter = useCallback(() => {
    console.log("トリガーにマウスが入りました");
    setIsHoveringTrigger(true);
    setOpen(true);
  }, []);

  const onTriggerMouseLeave = useCallback(() => {
    setIsHoveringTrigger(false);

    // トリガーからマウスが離れても、コンテンツにマウスがある場合は閉じない
    if (!isHoveringContent) {
      setOpen(false);
    }
  }, [isHoveringContent]);

  // コンテンツのマウスイベント - ポインターイベントを使用
  const onContentPointerEnter = useCallback(() => {
    setIsHoveringContent(true);
  }, []);

  const onContentPointerLeave = useCallback(() => {
    setIsHoveringContent(false);

    // コンテンツからマウスが離れても、トリガーにマウスがある場合は閉じない
    if (!isHoveringTrigger) {
      setOpen(false);
    }
  }, [isHoveringTrigger]);

  return (
    <TamaguiTooltip
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          setOpen(true);
        }
      }}
      delay={{ open: 0, close: 500 }}
    >
      <TamaguiTooltip.Trigger asChild>
        <YStack
          onMouseEnter={onTriggerMouseEnter}
          onMouseLeave={onTriggerMouseLeave}
          padding="$1"
          margin="-$1"
        >
          {children}
        </YStack>
      </TamaguiTooltip.Trigger>
      <TamaguiTooltip.Content
        padding={0}
        enterStyle={{ opacity: 1 }}
        exitStyle={{ opacity: 0 }}
        pointerEvents="auto" // これが重要！
      >
        <TooltipContainer
          ref={ref}
          rich={rich}
          onPointerEnter={onContentPointerEnter}
          onPointerLeave={onContentPointerLeave}
          // タッチデバイス用
          onTouchStart={onContentPointerEnter}
          onTouchEnd={onContentPointerLeave}
        >
          {rich && (
            <>
              {title && (
                <XStack justifyContent="space-between" alignItems="center">
                  <TooltipTitle>{title}</TooltipTitle>
                  {onClose && (
                    <CloseButton
                      onPress={() => {
                        setOpen(false);
                        onClose?.();
                      }}
                    >
                      <X size={18} color="$onSurfaceVariant" />
                    </CloseButton>
                  )}
                </XStack>
              )}
              <TooltipText rich={rich}>{content}</TooltipText>
              {action && (
                <ActionContainer>
                  <Button variant="text" onPress={action.onClick}>
                    {action.label}
                  </Button>
                </ActionContainer>
              )}
            </>
          )}

          {!rich && <TooltipText rich={rich}>{content}</TooltipText>}
        </TooltipContainer>
      </TamaguiTooltip.Content>
    </TamaguiTooltip>
  );
};

"use client";
import { ChevronRight } from "@tamagui/lucide-icons";
import { useState, type ReactNode, type Ref } from "react";
import {
  type TamaguiElement,
  Text,
  XStack,
  YStack,
  styled,
  Stack,
} from "tamagui";
import { Divider } from "../Divider";
import { elevationSystem, stateLayerOpacity } from "../theme";

/**
 * メニュー項目のプロパティ
 */
type MenuItemProps = {
  /**
   * 参照オブジェクト
   */
  ref?: Ref<TamaguiElement>;
  /**
   * メニュー項目のラベル
   */
  label: string;
  /**
   * メニュー項目がクリックされたときに実行されるコールバック
   */
  onPress: () => void;
  /**
   * メニュー項目の先頭に表示されるアイコン
   */
  leadingIcon?: ReactNode;
  /**
   * メニュー項目の末尾に表示されるアイコン
   */
  trailingIcon?: ReactNode;
  /**
   * メニュー項目の末尾に表示されるテキスト
   */
  trailingText?: string;
  /**
   * サブメニュー項目（ネストされたメニュー）
   */
  items?: MenuItemProps[];
  /**
   * メニュー項目が無効かどうか
   */
  disabled?: boolean;
};

// スタイル付きのメニュー項目コンテナ
const StyledMenuItem = styled(XStack, {
  height: 48,
  paddingHorizontal: 12,
  alignItems: "center",
  backgroundColor: "$surfaceContainerLow",
  cursor: "pointer",
  gap: 12,

  // ホバー状態
  hoverStyle: {
    backgroundColor: `$onSurface${stateLayerOpacity.hover}`,
  },

  // プレス状態
  pressStyle: {
    backgroundColor: `$onSurface${stateLayerOpacity.press}`,
  },

  // バリアント
  variants: {
    disabled: {
      true: {
        opacity: 0.38,
        cursor: "default",
        hoverStyle: {
          backgroundColor: "$surfaceContainerLow",
        },
        pressStyle: {
          backgroundColor: "$surfaceContainerLow",
        },
      },
    },
  },
});

// メニュー項目のラベルテキスト
const MenuItemLabel = styled(Text, {
  flex: 1,
  fontSize: 14,
  color: "$onSurface",
  lineHeight: 20,
  letterSpacing: 0.25,

  // バリアント
  variants: {
    disabled: {
      true: {
        color: "$onSurfaceVariant",
      },
    },
  },
});

// メニュー項目の末尾テキスト
const MenuItemTrailingText = styled(Text, {
  fontSize: 14,
  color: "$onSurfaceVariant",
  lineHeight: 20,
  letterSpacing: 0.25,
  marginRight: 8,

  // バリアント
  variants: {
    disabled: {
      true: {
        color: "$onSurfaceVariant",
        opacity: 0.38,
      },
    },
  },
});

/**
 * メニュー項目コンポーネント
 */
const MenuItem = ({
  ref,
  label,
  onPress,
  leadingIcon,
  trailingIcon,
  trailingText,
  items,
  disabled = false,
}: MenuItemProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const hasSubMenu = items && items.length > 0;

  // サブメニューを持つ場合、クリック時にサブメニューの表示/非表示を切り替える
  const handlePress = () => {
    if (disabled) return;

    if (hasSubMenu) {
      setShowSubMenu(!showSubMenu);
    } else {
      onPress();
    }
  };

  return (
    <YStack>
      <StyledMenuItem
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        role="menuitem"
        aria-disabled={disabled}
      >
        {/* 先頭アイコン */}
        {leadingIcon && (
          <Stack marginLeft={4} opacity={disabled ? 0.38 : 1}>
            {leadingIcon}
          </Stack>
        )}

        {/* ラベル */}
        <MenuItemLabel disabled={disabled}>{label}</MenuItemLabel>

        {/* 末尾テキスト（存在する場合） */}
        {trailingText && (
          <MenuItemTrailingText disabled={disabled}>
            {trailingText}
          </MenuItemTrailingText>
        )}

        {/* 末尾アイコン（存在する場合）またはサブメニューを示す矢印 */}
        {trailingIcon ? (
          <Stack marginRight={4} opacity={disabled ? 0.38 : 1}>
            {trailingIcon}
          </Stack>
        ) : hasSubMenu ? (
          <ChevronRight
            size={20}
            color="$onSurfaceVariant"
            opacity={disabled ? 0.38 : 1}
          />
        ) : null}
      </StyledMenuItem>

      {/* サブメニュー（表示されている場合） */}
      {hasSubMenu && showSubMenu && (
        <YStack
          position="absolute"
          left="calc(100% - 20px)"
          top={-8}
          backgroundColor="$surfaceContainerLow"
          borderRadius={4}
          overflow="hidden"
          minWidth={112}
          maxWidth={280}
          paddingVertical={8}
          zIndex={1000}
          {...elevationSystem.shadows.level2}
        >
          {items.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </YStack>
      )}
    </YStack>
  );
};

/**
 * メニューセクションのプロパティ
 */
type MenuItemSectionProps = {
  /**
   * 参照オブジェクト
   */
  ref?: Ref<TamaguiElement>;
  /**
   * セクションの一意のキー
   */
  key: string;
  /**
   * セクション内のメニュー項目
   */
  items: MenuItemProps[];
};

/**
 * メニューセクションコンポーネント
 */
const MenuItemSection = ({ ref, items }: MenuItemSectionProps) => {
  return (
    <YStack ref={ref} role="group">
      {items.map((item) => (
        <MenuItem key={item.label} {...item} />
      ))}
    </YStack>
  );
};

/**
 * メニューコンポーネントのプロパティ
 */
type Props = {
  /**
   * 参照オブジェクト
   */
  ref?: Ref<TamaguiElement>;
} & (
  | {
      /**
       * メニューセクションの配列
       */
      sections: MenuItemSectionProps[];
      items?: never;
    }
  | {
      /**
       * メニュー項目の配列
       */
      items: MenuItemProps[];
      sections?: never;
    }
);

/**
 * Material Design 3のガイドラインに基づいたメニューコンポーネント
 *
 * メニューは、一時的なサーフェス上に表示される項目のリストです。
 * ユーザーがボタン、アクション、その他のコントロールを操作すると表示されます。
 */
export const Menu = ({ ref, sections = [], items = [] }: Props) => {
  return (
    <YStack
      ref={ref}
      backgroundColor="$surfaceContainerLow"
      borderRadius={4}
      overflow="hidden"
      minWidth={112}
      maxWidth={280}
      paddingVertical={8}
      {...elevationSystem.shadows.level1}
      role="menu"
    >
      {items?.map((item) => (
        <MenuItem key={item.label} {...item} />
      ))}
      {sections?.map((section, i) => (
        <Stack key={section.key}>
          <MenuItemSection {...section} />
          {i !== sections.length - 1 && <Divider />}
        </Stack>
      ))}
    </YStack>
  );
};

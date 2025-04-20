"use client";
import { forwardRef, useMemo, useState } from "react";
// useWindowDimensions は削除
import {
  Image,
  ScrollView,
  styled,
  type TamaguiElement,
  View,
  XStack,
  getTokens,
} from "tamagui";

type Item = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
  onPress?: () => void;
};

type Variant = "unContained" | "hero" | "center-aligned-hero";

type Props = {
  items: Item[];
  variant?: Variant;
  height?: number;
};

const Wrapper = styled(View, {
  flex: 1,
  height: "auto",
  // Wrapper自体に overflow: 'hidden' を追加して、中の要素がはみ出さないようにする
  overflow: "hidden",
});

const Container = styled(XStack, {
  // flex: 1 を削除し、width: '100%' に変更して親要素に追従させる
  width: "100%",
  height: "auto",
  paddingHorizontal: "$4",
  paddingVertical: "$2",
  gap: "$2",
  display: "flex",
});

const CarouselItem = styled(View, {
  borderRadius: "$8",
  borderColor: "$outline",
  borderWidth: 1,
  overflow: "hidden",
  // アイテムのクリックを可能にする
  cursor: "pointer",
});

// UnContained: シンプルに height のみ受け取る
const UnContained = ({ items, height = 200 }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap="$2">
        {items.map((item) => (
          <CarouselItem key={item.id}>
            {/* UnContained では固定幅のままとする (必要ならこれも動的に) */}
            <Image src={item.src} alt={item.alt} width={300} height={height} />
          </CarouselItem>
        ))}
      </XStack>
    </ScrollView>
  );
};

// Hero: 幅計算ロジックを削除し、props で幅を受け取る
const Hero = ({
  items,
  target,
  onPress,
  height = 200,
  targetWidth, // propsで受け取る
  nonTargetWidth, // propsで受け取る
}: Props & {
  target: string;
  onPress: (id: string) => void;
  targetWidth: number;
  nonTargetWidth: number;
}) => {
  return (
    // Container から onLayout を削除
    <Container>
      {items.map((item) => {
        const isTarget = item.id === target;
        const imageProps = isTarget
          ? { width: targetWidth, height }
          : { height, width: nonTargetWidth };

        return (
          <CarouselItem key={item.id} onPress={() => onPress(item.id)}>
            <Image src={item.src} alt={item.alt} {...imageProps} />
          </CarouselItem>
        );
      })}
    </Container>
  );
};

// CenterAlignedHero: 幅計算ロジックを削除し、props で幅を受け取る
const CenterAlignedHero = ({
  items,
  target,
  onPress,
  height = 200,
  targetWidth, // propsで受け取る
  nonTargetWidth, // propsで受け取る
}: Props & {
  target: string;
  onPress: (id: string) => void;
  targetWidth: number;
  nonTargetWidth: number;
}) => {
  return (
    // Container から onLayout を削除
    <Container>
      {items.map((item) => {
        const isTarget = item.id === target;
        const imageProps = isTarget
          ? { width: targetWidth, height }
          : { height, width: nonTargetWidth };

        return (
          <CarouselItem key={item.id} onPress={() => onPress(item.id)}>
            <Image src={item.src} alt={item.alt} {...imageProps} />
          </CarouselItem>
        );
      })}
    </Container>
  );
};

// Carousel: 幅計算ロジックと state を集約
export const Carousel = forwardRef<TamaguiElement, Props>(
  ({ items, variant = "hero", height = 200 }, ref) => {
    const [target, setTarget] = useState(items[0].id);
    const [containerWidth, setContainerWidth] = useState(0); // コンテナ幅をstateで管理
    const tokens = getTokens(); // Tamaguiのトークン取得

    const handleLayout = (event: {
      nativeEvent: { layout: { width: number } };
    }) => {
      setContainerWidth(event.nativeEvent.layout.width);
    };

    // アイテムの幅とかを計算するロジック
    const { nonTargetWidth, targetWidth } = useMemo(() => {
      const defaultWidths = { nonTargetWidth: 40, targetWidth: 300 };
      // トークンが読み込まれているか、containerWidthが0でないか、itemsがあるかを確認
      if (
        containerWidth <= 0 ||
        items.length === 0 ||
        !tokens?.space?.$4 ||
        !tokens?.space?.$2
      ) {
        // console.log("Carousel: Returning default widths due to missing data", { containerWidth, itemsLength: items.length, hasTokens: !!tokens });
        return defaultWidths;
      }

      // トークン値を安全に取得（数値でなければデフォルト値を使用）
      const space4 = Number(tokens.space.$4) || 16; // Default to 16 if token is invalid
      const space2 = Number(tokens.space.$2) || 8; // Default to 8 if token is invalid
      const containerPaddingHorizontalValue = space4 * 2;
      const gapValue = space2;
      const nonTargetWidthValue = 40; // 固定値

      // コンテナ幅からパディングを除いた、コンテンツ表示領域の幅を計算
      const contentWidth = containerWidth - containerPaddingHorizontalValue;
      // コンテンツ幅が計算可能か確認
      if (contentWidth <= 0) {
        // console.log("Carousel: Content width is zero or negative, returning default widths", { containerWidth, containerPaddingHorizontalValue });
        return defaultWidths;
      }

      // ギャップが占める合計幅を計算 (これは新しいロジックでも使う)
      const gapsTotalWidth = (items.length - 1) * gapValue;

      // --- 新しい計算ロジック ---
      const minTargetWidth = nonTargetWidthValue * 2; // ターゲットの最小幅 (80)
      const minNonTargetWidth = nonTargetWidthValue; // 非ターゲットの最小幅 (40)
      const maxNonTargetWidth = 56; // 非ターゲットの最大幅
      const nonTargetItemCount = items.length - 1;

      // 全アイテムが最小幅だった場合の合計幅
      const totalMinWidth =
        minTargetWidth +
        nonTargetItemCount * minNonTargetWidth +
        gapsTotalWidth;

      // 自由に使えるスペース
      const flexibleSpace = Math.max(0, contentWidth - totalMinWidth);

      let finalTargetWidth = minTargetWidth;
      let finalNonTargetWidth = minNonTargetWidth;

      if (flexibleSpace > 0 && nonTargetItemCount > 0) {
        // 非ターゲットアイテムが最大まで広がるのに必要な合計スペース
        const maxNonTargetExpansionTotal =
          nonTargetItemCount * (maxNonTargetWidth - minNonTargetWidth);

        // 非ターゲットアイテムに実際に割り当てる拡張スペース
        const nonTargetExpansionActual = Math.min(
          flexibleSpace,
          maxNonTargetExpansionTotal,
        );

        // 最終的な非ターゲットアイテムの幅
        finalNonTargetWidth =
          minNonTargetWidth + nonTargetExpansionActual / nonTargetItemCount;

        // ターゲットアイテムに割り当てる残りの拡張スペース
        const targetExpansion = flexibleSpace - nonTargetExpansionActual;
        finalTargetWidth = minTargetWidth + targetExpansion;
      } else if (flexibleSpace > 0 && nonTargetItemCount === 0) {
        // アイテムが1つしかない場合は、残りのスペースを全てターゲットに
        finalTargetWidth = minTargetWidth + flexibleSpace;
      }
      // --- 新しい計算ロジック ここまで ---

      // 念のため最終チェック（計算結果が負にならないように）
      finalTargetWidth = Math.max(minTargetWidth, finalTargetWidth);
      finalNonTargetWidth = Math.max(minNonTargetWidth, finalNonTargetWidth);

      return {
        nonTargetWidth: finalNonTargetWidth,
        targetWidth: finalTargetWidth,
      };
      // 依存配列に containerWidth, items.length, tokens を含める
    }, [containerWidth, items.length, tokens]);
    const onPress = (id: string) => {
      console.log("onPress", id);
      setTarget(id);
    };

    return (
      // Wrapper に onLayout を設定
      <Wrapper ref={ref} onLayout={handleLayout}>
        {variant === "unContained" && (
          // UnContained には計算した幅は渡さない (固定幅のため)
          <UnContained items={items} height={height} />
        )}
        {variant === "hero" && (
          <Hero
            items={items}
            target={target}
            onPress={onPress}
            height={height}
            // 計算した幅を props で渡す
            targetWidth={targetWidth}
            nonTargetWidth={nonTargetWidth}
          />
        )}
        {variant === "center-aligned-hero" && (
          <CenterAlignedHero
            items={items}
            target={target}
            onPress={onPress}
            height={height}
            // 計算した幅を props で渡す
            targetWidth={targetWidth}
            nonTargetWidth={nonTargetWidth}
          />
        )}
      </Wrapper>
    );
  },
);

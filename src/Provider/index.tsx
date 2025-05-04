import { ToastProvider } from "@tamagui/toast";
import type { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";
// bodyFont, headingFont は theme 内部で定義されるようになったのでインポート不要
import { DEFAULT_KEY_COLOR, useTheme } from "../theme";

/**
 * Material Design 3のデザイントークンシステム
 *
 * Material Design 3の思想に基づいたデザイントークンを提供します。
 * 以下の要素を含みます：
 * - カラーシステム: 動的カラーパレットとトーナルパレット
 * - タイポグラフィシステム: MD3のタイポグラフィスケール
 * - エレベーションシステム: サーフェスエレベーションとシャドウ
 * - 状態レイヤー: インタラクション状態に対応するオーバーレイ
 * - スペーシングシステム: 一貫したスペーシング
 * - シェイプシステム: 角丸と形状
 */

type UIProviderProps = {
  children: ReactNode;
  keyColor?: string;
  theme?: "light" | "dark";
};

/**
 * Material Design 3のデザイントークンを使用したUIプロバイダー
 *
 * キーカラーを指定することで、Material Design 3の動的カラーシステムに基づいた
 * テーマが自動的に生成されます。
 *
 * 注: Material Design 3のカラーシステムは、各コンポーネントで直接使用する形に変更しています。
 * Tamaguiの設定は元のままで、Material Design 3のトークンはコンテキストを通じて提供します。
 */
export const UIProvider = (props: UIProviderProps) => {
  // キーカラーを取得（指定がなければデフォルト値を使用）
  const keyColor = props.keyColor || DEFAULT_KEY_COLOR;
  // useTheme は keyColor のみ受け取るように変更された
  const { config } = useTheme({
    keyColor,
  });
  const name = `custom_${props.theme || "light"}`;

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <TamaguiProvider config={config}>
          <Theme name={name}>{props.children}</Theme>
        </TamaguiProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

import { createAnimations } from "@tamagui/animations-moti";
import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

// フォントの設定
const headingFont = createInterFont();
const bodyFont = createInterFont();

// react-native-reanimatedのモックは src/libs/reanimated-polyfill.js に移動しました

// Tamaguiの設定
const config = createTamagui({
  defaultTheme: "light",
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens,
  // Webブラウザ環境での設定
  settings: {
    allowedStyleValues: "somewhat-strict",
    autocompleteSpecificTokens: true,
    // Webブラウザ環境でのアニメーション設定
    disableSSR: true,
    disableRootThemeClass: true,
  },
  animations: createAnimations({
    bouncy: {
      type: "spring",
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      type: "spring",
      damping: 20,
      stiffness: 60,
    },
    quick: {
      type: "spring",
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
  }),
});

export type AppConfig = typeof config;
export default config;

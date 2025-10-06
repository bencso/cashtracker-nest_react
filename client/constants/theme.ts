/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const primaryColor = '#5e81ac';
const secondaryColor = "#81a1c1";
const accent = "#88c0d0";
const neutral = "#4c566a";
const text = "#eceff4";
const base = "#d8dee9";
const success = "#a3be8d";
const error = "#bf616a";
const warning = "#ebcb8b";
const info = "#b48ead";

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    neutral: neutral,
    primary: primaryColor,
    secondary: secondaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryColor,
    correct: success,
    uncorrect: error,
    button: accent,
    base: base
  },
  dark: {
    text: text,
    background: '#151718',
    neutral: neutral,
    primary: primaryColor,
    secondary: secondaryColor,
    icon: base,
    tabIconDefault: base,
    tabIconSelected: primaryColor,
    correct: success,
    uncorrect: error,
    button: accent,
    base: base
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

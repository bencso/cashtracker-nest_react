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
    regular: 'Regular',
    bold: 'Bold',
    sans: 'Regular',
    serif: 'Regular',
    rounded: 'Regular',
    mono: 'Regular'
  },
  default: {
    regular: 'Regular',
    bold: 'Bold',
    sans: 'Regular',
    serif: 'Regular',
    rounded: 'Regular',
    mono: 'Regular'
  },
  web: {
    regular: 'Regular',
    bold: 'Bold',
    sans: 'Regular',
    serif: 'Regular',
    rounded: 'Regular',
    mono: 'Regular'
  },
});

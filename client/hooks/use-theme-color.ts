/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { scheme } = useTheme();
  
  const colorFromProps = props[scheme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[scheme][colorName];
  }
}

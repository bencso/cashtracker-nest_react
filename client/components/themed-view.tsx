import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { scheme } = useTheme();
  
  const backgroundColor = lightColor && scheme === 'light' 
    ? lightColor 
    : darkColor && scheme === 'dark' 
    ? darkColor 
    : Colors[scheme].background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

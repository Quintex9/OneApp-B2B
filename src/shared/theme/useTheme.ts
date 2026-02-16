import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from './colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
}

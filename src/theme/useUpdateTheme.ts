import { useColorScheme } from 'react-native';

import type { ColorScheme, UpdateTheme, UpdateThemeColors } from '../types';
import { defaultTheme } from './defaults';
import { darkPalette, lightPalette } from './palettes';

const resolveScheme = (
  colorScheme: ColorScheme | undefined,
  systemScheme: string | null | undefined
): 'light' | 'dark' => {
  if (colorScheme === 'light' || colorScheme === 'dark') {
    return colorScheme;
  }

  return systemScheme === 'dark' ? 'dark' : 'light';
};

const mergeColors = (
  base: UpdateThemeColors,
  overrides?: Partial<UpdateThemeColors>
): UpdateThemeColors => ({
  ...base,
  ...overrides,
});

export const useUpdateTheme = (
  colorScheme: ColorScheme = 'auto',
  colorOverrides?: Partial<UpdateThemeColors>
): UpdateTheme & { colors: UpdateThemeColors; scheme: 'light' | 'dark' } => {
  const systemScheme = useColorScheme();
  const scheme = resolveScheme(colorScheme, systemScheme);
  const basePalette = scheme === 'dark' ? darkPalette : lightPalette;

  return {
    ...defaultTheme,
    colors: mergeColors(basePalette, colorOverrides),
    scheme,
  };
};

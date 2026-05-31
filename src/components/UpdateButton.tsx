import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useUpdateCheck } from '../hooks/useUpdateCheck';
import { useUpdateTheme } from '../theme/useUpdateTheme';
import type { UpdateButtonProps } from '../types';
import { openStoreUrl } from '../utils/openStoreUrl';
import { UpdateIconSlot } from './shared/UpdateIconSlot';

export const UpdateButton = ({
  currentVersion,
  latestVersion,
  storeUrl,
  title = 'Update App',
  colorScheme = 'auto',
  colors,
  icon,
  style,
  buttonStyle,
  textStyle,
}: UpdateButtonProps) => {
  const { hasUpdate } = useUpdateCheck({ currentVersion, latestVersion });
  const theme = useUpdateTheme(colorScheme, colors);

  if (!hasUpdate) {
    return null;
  }

  const handlePress = () => {
    openStoreUrl(storeUrl);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          gap: theme.spacing.sm,
        },
        style,
        buttonStyle,
      ]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {icon ? <UpdateIconSlot icon={icon} theme={theme} size={24} /> : null}
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.primaryText,
            fontSize: theme.typography.buttonSize,
            lineHeight: theme.typography.buttonLineHeight,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  text: {
    fontWeight: '600',
  },
});

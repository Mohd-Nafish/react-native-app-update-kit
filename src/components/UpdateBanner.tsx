import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useUpdateCheck } from '../hooks/useUpdateCheck';
import { useUpdateTheme } from '../theme/useUpdateTheme';
import type { UpdateBannerProps } from '../types';
import { openStoreUrl } from '../utils/openStoreUrl';
import { UpdateIconSlot } from './shared/UpdateIconSlot';

export const UpdateBanner = ({
  currentVersion,
  latestVersion,
  storeUrl,
  message = 'A new version is available.',
  buttonTitle = 'Update',
  colorScheme = 'auto',
  colors,
  icon,
  style,
  messageStyle,
  buttonStyle,
  buttonTextStyle,
}: UpdateBannerProps) => {
  const { hasUpdate } = useUpdateCheck({ currentVersion, latestVersion });
  const theme = useUpdateTheme(colorScheme, colors);

  if (!hasUpdate) {
    return null;
  }

  const handlePress = () => {
    openStoreUrl(storeUrl);
  };

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: theme.colors.bannerBackground,
          borderBottomColor: theme.colors.border,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      <UpdateIconSlot icon={icon} theme={theme} size={32} />

      <Text
        style={[
          styles.message,
          {
            color: theme.colors.bannerText,
            fontSize: theme.typography.bodySize,
            lineHeight: theme.typography.bodyLineHeight,
          },
          messageStyle,
        ]}
      >
        {message}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius - 4,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          },
          buttonStyle,
        ]}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: theme.colors.primaryText,
              fontSize: theme.typography.captionSize,
              lineHeight: theme.typography.captionLineHeight,
            },
            buttonTextStyle,
          ]}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  message: {
    flex: 1,
    fontWeight: '500',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
  },
});

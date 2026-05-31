import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { UpdateTheme } from '../../types';

interface UpdateIconSlotProps {
  icon?: ReactNode;
  theme: UpdateTheme;
  size?: number;
}

export const UpdateIconSlot = ({
  icon,
  theme,
  size = 40,
}: UpdateIconSlotProps) => {
  if (icon) {
    return <View style={styles.wrapper}>{icon}</View>;
  }

  return (
    <View
      style={[
        styles.defaultIcon,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primary,
        },
      ]}
    >
      <Text
        style={[styles.defaultIconText, { color: theme.colors.primaryText }]}
      >
        ↑
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIconText: {
    fontSize: 20,
    fontWeight: '700',
  },
});

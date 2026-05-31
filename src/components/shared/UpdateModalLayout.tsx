import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { UpdateTheme } from '../../types';
import { UpdateIconSlot } from './UpdateIconSlot';

interface UpdateModalLayoutProps {
  visible: boolean;
  theme: UpdateTheme;
  title: string;
  message: string;
  updateLabel: string;
  dismissLabel?: string;
  icon?: ReactNode;
  onUpdate: () => void;
  onDismiss?: () => void;
  onRequestClose: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export const UpdateModalLayout = ({
  visible,
  theme,
  title,
  message,
  updateLabel,
  dismissLabel,
  icon,
  onUpdate,
  onDismiss,
  onRequestClose,
  contentStyle,
  titleStyle,
  messageStyle,
}: UpdateModalLayoutProps) => {
  const { colors, spacing, typography, borderRadius } = theme;
  const showDismiss = Boolean(dismissLabel && onDismiss);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: colors.surface,
              borderRadius,
              padding: spacing.lg,
            },
            contentStyle,
          ]}
        >
          <UpdateIconSlot icon={icon} theme={theme} />

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: typography.titleSize,
                lineHeight: typography.titleLineHeight,
                marginTop: spacing.md,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.message,
              {
                color: colors.textSecondary,
                fontSize: typography.bodySize,
                lineHeight: typography.bodyLineHeight,
                marginTop: spacing.sm,
                marginBottom: spacing.lg,
              },
              messageStyle,
            ]}
          >
            {message}
          </Text>

          <View style={[styles.actions, { gap: spacing.sm }]}>
            {showDismiss ? (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: colors.dismissBackground,
                    borderRadius: borderRadius - 2,
                    paddingHorizontal: spacing.lg,
                    paddingVertical: spacing.md,
                  },
                ]}
                onPress={onDismiss}
              >
                <Text
                  style={[
                    styles.dismissText,
                    {
                      color: colors.dismissText,
                      fontSize: typography.buttonSize,
                      lineHeight: typography.buttonLineHeight,
                    },
                  ]}
                >
                  {dismissLabel}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[
                styles.actionButton,
                showDismiss
                  ? styles.actionButtonCompact
                  : styles.actionButtonFull,
                {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius - 2,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                },
              ]}
              onPress={onUpdate}
            >
              <Text
                style={[
                  styles.updateText,
                  {
                    color: colors.primaryText,
                    fontSize: typography.buttonSize,
                    lineHeight: typography.buttonLineHeight,
                  },
                ]}
              >
                {updateLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  message: {
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  actionButton: {
    minWidth: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonCompact: {},
  actionButtonFull: {
    flexGrow: 1,
  },
  dismissText: {
    fontWeight: '600',
  },
  updateText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

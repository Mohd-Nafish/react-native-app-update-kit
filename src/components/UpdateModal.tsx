import { useState } from 'react';

import { useUpdateCheck } from '../hooks/useUpdateCheck';
import { useUpdateTheme } from '../theme/useUpdateTheme';
import type { UpdateModalProps } from '../types';
import { openStoreUrl } from '../utils/openStoreUrl';
import { UpdateModalLayout } from './shared/UpdateModalLayout';

export const UpdateModal = ({
  currentVersion,
  latestVersion,
  storeUrl,
  title = 'Update Available',
  message,
  updateLabel = 'Update',
  dismissLabel = 'Dismiss',
  onDismiss,
  colorScheme = 'auto',
  colors,
  icon,
  contentStyle,
  titleStyle,
  messageStyle,
}: UpdateModalProps) => {
  const { hasUpdate } = useUpdateCheck({ currentVersion, latestVersion });
  const theme = useUpdateTheme(colorScheme, colors);
  const [visible, setVisible] = useState(true);

  if (!hasUpdate) {
    return null;
  }

  const resolvedMessage =
    message ??
    `Version ${latestVersion} is available. You are currently on ${currentVersion}.`;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const handleUpdate = () => {
    openStoreUrl(storeUrl);
  };

  return (
    <UpdateModalLayout
      visible={visible}
      theme={theme}
      title={title}
      message={resolvedMessage}
      updateLabel={updateLabel}
      dismissLabel={dismissLabel}
      icon={icon}
      onUpdate={handleUpdate}
      onDismiss={handleDismiss}
      onRequestClose={handleDismiss}
      contentStyle={contentStyle}
      titleStyle={titleStyle}
      messageStyle={messageStyle}
    />
  );
};

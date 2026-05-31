import { useUpdateCheck } from '../hooks/useUpdateCheck';
import { useUpdateTheme } from '../theme/useUpdateTheme';
import type { ForceUpdateModalProps } from '../types';
import { openStoreUrl } from '../utils/openStoreUrl';
import { UpdateModalLayout } from './shared/UpdateModalLayout';

export const ForceUpdateModal = ({
  currentVersion,
  latestVersion,
  storeUrl,
  title = 'Update Required',
  message,
  updateLabel = 'Update Now',
  colorScheme = 'auto',
  colors,
  icon,
  contentStyle,
  titleStyle,
  messageStyle,
}: ForceUpdateModalProps) => {
  const { hasUpdate } = useUpdateCheck({ currentVersion, latestVersion });
  const theme = useUpdateTheme(colorScheme, colors);

  if (!hasUpdate) {
    return null;
  }

  const resolvedMessage =
    message ??
    `Version ${latestVersion} is required to continue. You are currently on ${currentVersion}.`;

  const handleUpdate = () => {
    openStoreUrl(storeUrl);
  };

  return (
    <UpdateModalLayout
      visible
      theme={theme}
      title={title}
      message={resolvedMessage}
      updateLabel={updateLabel}
      icon={icon}
      onUpdate={handleUpdate}
      onRequestClose={handleUpdate}
      contentStyle={contentStyle}
      titleStyle={titleStyle}
      messageStyle={messageStyle}
    />
  );
};

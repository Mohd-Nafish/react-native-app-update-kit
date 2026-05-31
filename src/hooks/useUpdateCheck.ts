import { useMemo } from 'react';

import { compareVersions } from '../utils/compareVersions';
import type { UseUpdateCheckParams, UseUpdateCheckResult } from '../types';

export const useUpdateCheck = ({
  currentVersion,
  latestVersion,
}: UseUpdateCheckParams): UseUpdateCheckResult => {
  const hasUpdate = useMemo(
    () => compareVersions(currentVersion, latestVersion),
    [currentVersion, latestVersion]
  );

  return { hasUpdate };
};

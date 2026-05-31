export const compareVersions = (
  currentVersion: string,
  latestVersion: string
): boolean => {
  const current = currentVersion.split('.').map(Number);
  const latest = latestVersion.split('.').map(Number);

  const maxLength = Math.max(current.length, latest.length);

  for (let i = 0; i < maxLength; i++) {
    const currentPart = current[i] || 0;
    const latestPart = latest[i] || 0;

    if (latestPart > currentPart) return true;
    if (latestPart < currentPart) return false;
  }

  return false;
};

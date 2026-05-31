import { describe, expect, it } from '@jest/globals';

import { compareVersions } from '../utils/compareVersions';

describe('compareVersions', () => {
  it('returns true when latest version is greater', () => {
    expect(compareVersions('1.0.0', '1.1.0')).toBe(true);
    expect(compareVersions('1.0.0', '2.0.0')).toBe(true);
    expect(compareVersions('1.0.9', '1.0.10')).toBe(true);
  });

  it('returns false when versions are equal', () => {
    expect(compareVersions('1.0.0', '1.0.0')).toBe(false);
    expect(compareVersions('2.3.4', '2.3.4')).toBe(false);
  });

  it('returns false when current version is greater', () => {
    expect(compareVersions('2.0.0', '1.9.9')).toBe(false);
    expect(compareVersions('1.1.0', '1.0.0')).toBe(false);
  });

  it('handles versions with different segment counts', () => {
    expect(compareVersions('1.0', '1.0.1')).toBe(true);
    expect(compareVersions('1.0.0.0', '1.0.1')).toBe(true);
  });
});

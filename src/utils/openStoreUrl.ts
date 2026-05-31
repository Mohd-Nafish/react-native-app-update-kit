import { Linking } from 'react-native';

export const openStoreUrl = (storeUrl: string): void => {
  Linking.openURL(storeUrl);
};

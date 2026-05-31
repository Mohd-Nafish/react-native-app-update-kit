import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ColorScheme = 'light' | 'dark' | 'auto';

export interface UpdateThemeColors {
  primary: string;
  primaryText: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  bannerBackground: string;
  bannerText: string;
  overlay: string;
  dismissBackground: string;
  dismissText: string;
}

export interface UpdateThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface UpdateThemeTypography {
  titleSize: number;
  titleLineHeight: number;
  bodySize: number;
  bodyLineHeight: number;
  captionSize: number;
  captionLineHeight: number;
  buttonSize: number;
  buttonLineHeight: number;
}

export interface UpdateThemeMetrics {
  borderRadius: number;
  spacing: UpdateThemeSpacing;
  typography: UpdateThemeTypography;
}

export interface UpdateTheme extends UpdateThemeMetrics {
  colors: UpdateThemeColors;
}

export interface UpdateStyleProps {
  colorScheme?: ColorScheme;
  colors?: Partial<UpdateThemeColors>;
}

export interface UpdateCheckParams {
  currentVersion: string;
  latestVersion: string;
}

export interface UpdateCheckProps extends UpdateCheckParams {
  storeUrl: string;
}

export interface UpdateIconProps {
  icon?: ReactNode;
}

export interface UpdateButtonProps
  extends UpdateCheckProps, UpdateStyleProps, UpdateIconProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface UpdateBannerProps
  extends UpdateCheckProps, UpdateStyleProps, UpdateIconProps {
  message?: string;
  buttonTitle?: string;
  style?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
}

export interface UpdateModalProps
  extends UpdateCheckProps, UpdateStyleProps, UpdateIconProps {
  title?: string;
  message?: string;
  updateLabel?: string;
  dismissLabel?: string;
  onDismiss?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export interface ForceUpdateModalProps
  extends UpdateCheckProps, UpdateStyleProps, UpdateIconProps {
  title?: string;
  message?: string;
  updateLabel?: string;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export interface UseUpdateCheckParams extends UpdateCheckParams {}

export interface UseUpdateCheckResult {
  hasUpdate: boolean;
}

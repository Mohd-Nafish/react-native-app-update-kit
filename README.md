# react-native-app-update-kit

[![npm version](https://img.shields.io/npm/v/react-native-app-update-kit.svg)](https://www.npmjs.com/package/react-native-app-update-kit)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Production-ready React Native update UI — button, banner, modal, force-update modal, and a version-check hook. Built for React 19 with light/dark mode, customizable colors, and icon support.

## Features

- **UpdateButton** — standalone update action
- **UpdateBanner** — non-intrusive top banner
- **UpdateModal** — optional update with dismiss
- **ForceUpdateModal** — mandatory update (no dismiss)
- **useUpdateCheck** — `{ hasUpdate }` hook for custom UI
- **compareVersions** — semantic version utility
- **Dark mode** — `colorScheme="light" | "dark" | "auto"`
- **Customizable** — theme colors and style props
- **Icons** — pass any React Native icon via `icon` prop

## Installation

```sh
npm install react-native-app-update-kit
```

```sh
yarn add react-native-app-update-kit
```

### Peer dependencies

Ensure your app has compatible versions installed:

```sh
npm install react react-native
```

Works with Expo and bare React Native projects. No native modules required.

## Quick start

```tsx
import {
  UpdateBanner,
  UpdateButton,
  UpdateModal,
  useUpdateCheck,
} from 'react-native-app-update-kit';

const CURRENT = '1.0.0';
const LATEST = '1.1.0';
const STORE_URL = 'https://play.google.com/store/apps/details?id=com.example.app';

export default function App() {
  const { hasUpdate } = useUpdateCheck({
    currentVersion: CURRENT,
    latestVersion: LATEST,
  });

  return (
    <>
      <UpdateBanner
        currentVersion={CURRENT}
        latestVersion={LATEST}
        storeUrl={STORE_URL}
      />
      <UpdateButton
        currentVersion={CURRENT}
        latestVersion={LATEST}
        storeUrl={STORE_URL}
      />
      <UpdateModal
        currentVersion={CURRENT}
        latestVersion={LATEST}
        storeUrl={STORE_URL}
      />
    </>
  );
}
```

All UI components render **only when** `latestVersion` is greater than `currentVersion`.

## Force update

Use `ForceUpdateModal` when the user must update before continuing. There is no dismiss button — hardware back on Android opens the store.

```tsx
import { ForceUpdateModal } from 'react-native-app-update-kit';

<ForceUpdateModal
  currentVersion="1.0.0"
  latestVersion="2.0.0"
  storeUrl="https://apps.apple.com/app/id123456789"
  title="Update Required"
  message="This version is no longer supported."
/>;
```

## Dark mode

Pass `colorScheme` to any component:

```tsx
<UpdateModal
  currentVersion="1.0.0"
  latestVersion="1.1.0"
  storeUrl={STORE_URL}
  colorScheme="dark"
/>
```

Use `"auto"` (default) to follow the system appearance via `useColorScheme()`.

## Custom colors

Override individual theme tokens:

```tsx
<UpdateButton
  currentVersion="1.0.0"
  latestVersion="1.1.0"
  storeUrl={STORE_URL}
  colors={{
    primary: '#6366F1',
    primaryText: '#FFFFFF',
  }}
/>
```

Available color tokens: `primary`, `primaryText`, `background`, `surface`, `text`, `textSecondary`, `border`, `bannerBackground`, `bannerText`, `overlay`, `dismissBackground`, `dismissText`.

## Icon support

Pass any React element as the `icon` prop (e.g. from `@expo/vector-icons`):

```tsx
import { Ionicons } from '@expo/vector-icons';

<UpdateBanner
  currentVersion="1.0.0"
  latestVersion="1.1.0"
  storeUrl={STORE_URL}
  icon={<Ionicons name="cloud-download-outline" size={24} color="#007AFF" />}
/>;
```

When no `icon` is provided, banner and modals show a built-in default icon.

## Hook

### `useUpdateCheck({ currentVersion, latestVersion })`

| Return     | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| `hasUpdate`| `boolean` | `true` when a newer version is available |

## Utility

### `compareVersions(currentVersion, latestVersion)`

Returns `true` when `latestVersion` is semantically greater than `currentVersion`.

```tsx
compareVersions('1.0.0', '1.1.0'); // true
compareVersions('2.0.0', '1.9.9'); // false
```

---

## Components

### Shared props

All components accept these base props:

| Prop             | Type     | Required | Default | Description                           |
| ---------------- | -------- | -------- | ------- | ------------------------------------- |
| `currentVersion` | `string` | Yes      | —       | Installed app version (e.g. `1.0.0`) |
| `latestVersion`  | `string` | Yes      | —       | Latest store version                  |
| `storeUrl`       | `string` | Yes      | —       | App Store or Play Store URL           |
| `colorScheme`    | `string` | No       | `"auto"`| `"light"`, `"dark"`, or `"auto"`      |
| `colors`         | `object` | No       | —       | Partial theme color overrides         |
| `icon`           | `ReactNode` | No    | —       | Custom icon element                   |

---

### `UpdateButton`

| Prop          | Type        | Default        | Description              |
| ------------- | ----------- | -------------- | ------------------------ |
| `title`       | `string`    | `"Update App"` | Button label             |
| `style`       | `ViewStyle` | —              | Outer container style    |
| `buttonStyle` | `ViewStyle` | —              | Button container style   |
| `textStyle`   | `TextStyle` | —              | Button label style       |

---

### `UpdateBanner`

| Prop              | Type        | Default                         | Description           |
| ----------------- | ----------- | ------------------------------- | --------------------- |
| `message`         | `string`    | `"A new version is available."` | Banner message        |
| `buttonTitle`     | `string`    | `"Update"`                      | Action button label   |
| `style`           | `ViewStyle` | —                               | Banner container      |
| `messageStyle`    | `TextStyle` | —                               | Message text style    |
| `buttonStyle`     | `ViewStyle` | —                               | Action button style   |
| `buttonTextStyle` | `TextStyle` | —                               | Action label style    |

---

### `UpdateModal`

| Prop            | Type         | Default              | Description                    |
| --------------- | ------------ | -------------------- | ------------------------------ |
| `title`         | `string`     | `"Update Available"` | Modal title                    |
| `message`       | `string`     | auto-generated       | Modal body text                |
| `updateLabel`   | `string`     | `"Update"`           | Update action label            |
| `dismissLabel`  | `string`     | `"Dismiss"`          | Dismiss action label           |
| `onDismiss`     | `() => void` | —                    | Called when modal is dismissed |
| `contentStyle`  | `ViewStyle`  | —                    | Modal card style               |
| `titleStyle`    | `TextStyle`  | —                    | Title text style               |
| `messageStyle`  | `TextStyle`  | —                    | Body text style                |

---

### `ForceUpdateModal`

| Prop           | Type        | Default              | Description              |
| -------------- | ----------- | -------------------- | ------------------------ |
| `title`        | `string`    | `"Update Required"`  | Modal title              |
| `message`      | `string`    | auto-generated       | Modal body text          |
| `updateLabel`  | `string`    | `"Update Now"`       | Update action label      |
| `contentStyle` | `ViewStyle` | —                    | Modal card style         |
| `titleStyle`   | `TextStyle` | —                    | Title text style         |
| `messageStyle` | `TextStyle` | —                    | Body text style          |

No dismiss action. `onRequestClose` (Android back) opens the store URL.

---

## Example app

```sh
git clone https://github.com/Mohd-Nafish/react-native-app-update-kit.git
cd react-native-app-update-kit
yarn install
yarn example start
```

The demo includes dark mode toggle, all components, and modal previews.

## License

MIT © [Mohd Nafish](./LICENSE)

See [CHANGELOG.md](./CHANGELOG.md) for release history and [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) for publish steps.

## Contributing

- [Development workflow](./CONTRIBUTING.md#development-workflow)
- [Sending a pull request](./CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](./CODE_OF_CONDUCT.md)

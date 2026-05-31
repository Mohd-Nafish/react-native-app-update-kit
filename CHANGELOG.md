# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-31

### Added

- `UpdateButton` — themed update button with optional icon support
- `UpdateBanner` — top banner with message and update action
- `UpdateModal` — optional update dialog with dismiss action
- `ForceUpdateModal` — blocking modal for mandatory updates (no dismiss)
- `useUpdateCheck` — hook returning `{ hasUpdate }`
- `compareVersions` — semantic version comparison utility
- Light and dark mode support via `colorScheme` prop (`light`, `dark`, `auto`)
- Customizable theme colors via `colors` prop
- Custom styling props for containers, text, and buttons
- Built-in default update icon with optional custom `icon` slot
- Polished example app demo screen
- Comprehensive README with installation, usage, and props tables

### Changed

- Production-ready package structure and TypeScript types
- Improved spacing, typography, and visual polish across all components

[1.0.0]: https://github.com/Mohd-Nafish/react-native-app-update-kit/releases/tag/v1.0.0

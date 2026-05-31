# Release Checklist — v1.0.0

Use this checklist before publishing `react-native-app-update-kit@1.0.0` to npm and GitHub.

## Pre-release validation

- [ ] Run `yarn lint` — zero errors
- [ ] Run `yarn typecheck` — zero errors
- [ ] Run `yarn build` — builds `lib/module` and `lib/typescript`
- [ ] Run `yarn test --watchman=false` — all tests pass
- [ ] Run `yarn example build:web` — example bundles successfully
- [ ] Run `yarn npm publish --dry-run` — verify tarball contents

## Documentation

- [ ] README includes installation, usage, props tables, and screenshots section
- [ ] CHANGELOG.md updated for v1.0.0
- [ ] LICENSE verified as MIT (Copyright 2026 Mohd Nafish)
- [ ] Example app demonstrates all components and dark mode

## Versioning

- [ ] `package.json` version set to `1.0.0`
- [ ] Git tag prepared: `v1.0.0`
- [ ] GitHub release notes copied from CHANGELOG

## Screenshots (recommended before npm publish)

Capture from the example app and add to `docs/screenshots/`:

- [ ] `update-banner.png` — banner at top of screen
- [ ] `update-button.png` — button component
- [ ] `update-modal.png` — optional update modal
- [ ] `force-update-modal.png` — force update modal
- [ ] `dark-mode.png` — dark mode preview

```sh
yarn example start
# Take screenshots from iOS Simulator or Android Emulator
```

## Publish commands

```sh
# 1. Commit all changes
git add -A
git commit -m "chore: release v1.0.0"

# 2. Tag the release
git tag v1.0.0

# 3. Push to GitHub
git push origin main --tags

# 4. Publish to npm
yarn npm login
yarn npm publish --access public
```

## Post-release

- [ ] Verify package on npm: https://www.npmjs.com/package/react-native-app-update-kit
- [ ] Create GitHub release with changelog
- [ ] Test install in a fresh project:

```sh
npx create-expo-app test-update-kit
cd test-update-kit
npm install react-native-app-update-kit
```

## Manual actions

1. Add real screenshots to `docs/screenshots/` and embed in README
2. Create GitHub release with v1.0.0 tag
3. Publish to npm with `yarn npm publish --access public`
4. Share release on GitHub/npm

import { useMemo, useState, type ReactNode } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ForceUpdateModal,
  UpdateBanner,
  UpdateButton,
  UpdateModal,
  useUpdateCheck,
  type ColorScheme,
} from 'react-native-app-update-kit';

const CURRENT_VERSION = '1.0.0';
const LATEST_VERSION = '1.1.0';
const FORCE_VERSION = '2.0.0';
const STORE_URL =
  'https://play.google.com/store/apps/details?id=com.example.app';

const DemoCard = ({
  title,
  description,
  children,
  dark,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  dark: boolean;
}) => {
  const cardStyles = dark ? demoStyles.cardDark : demoStyles.cardLight;

  return (
    <View style={[demoStyles.card, cardStyles]}>
      <Text style={dark ? demoStyles.cardTitleDark : demoStyles.cardTitleLight}>
        {title}
      </Text>
      <Text
        style={
          dark
            ? demoStyles.cardDescriptionDark
            : demoStyles.cardDescriptionLight
        }
      >
        {description}
      </Text>
      {children}
    </View>
  );
};

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [showModal, setShowModal] = useState(false);
  const [showForceModal, setShowForceModal] = useState(false);

  const { hasUpdate } = useUpdateCheck({
    currentVersion: CURRENT_VERSION,
    latestVersion: LATEST_VERSION,
  });

  const dark = colorScheme === 'dark';
  const themeStyles = useMemo(
    () => ({
      container: dark ? demoStyles.containerDark : demoStyles.containerLight,
      heading: dark ? demoStyles.headingDark : demoStyles.headingLight,
      subtitle: dark ? demoStyles.subtitleDark : demoStyles.subtitleLight,
      badge: dark ? demoStyles.badgeDark : demoStyles.badgeLight,
      toggleRow: dark ? demoStyles.toggleRowDark : demoStyles.toggleRowLight,
      toggleLabel: dark
        ? demoStyles.toggleLabelDark
        : demoStyles.toggleLabelLight,
    }),
    [dark]
  );

  return (
    <SafeAreaView style={[demoStyles.container, themeStyles.container]}>
      <UpdateBanner
        currentVersion={CURRENT_VERSION}
        latestVersion={LATEST_VERSION}
        storeUrl={STORE_URL}
        colorScheme={colorScheme}
        message="Version 1.1.0 is ready to install."
      />

      <ScrollView contentContainerStyle={demoStyles.content}>
        <View style={demoStyles.hero}>
          <Text style={[demoStyles.badge, themeStyles.badge]}>v1.0.0 Demo</Text>
          <Text style={[demoStyles.heading, themeStyles.heading]}>
            react-native-app-update-kit
          </Text>
          <Text style={[demoStyles.subtitle, themeStyles.subtitle]}>
            Production-ready update UI for React Native apps.
          </Text>
        </View>

        <View style={[demoStyles.toggleRow, themeStyles.toggleRow]}>
          <Text style={[demoStyles.toggleLabel, themeStyles.toggleLabel]}>
            Dark mode preview
          </Text>
          <Switch
            value={dark}
            onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
          />
        </View>

        <DemoCard
          dark={dark}
          title="useUpdateCheck"
          description={`Update status: ${hasUpdate ? 'Update available' : 'Up to date'}`}
        />

        <DemoCard
          dark={dark}
          title="UpdateButton"
          description="Standalone button with optional icon and theme support."
        >
          <UpdateButton
            currentVersion={CURRENT_VERSION}
            latestVersion={LATEST_VERSION}
            storeUrl={STORE_URL}
            colorScheme={colorScheme}
            title="Update App"
          />
        </DemoCard>

        <DemoCard
          dark={dark}
          title="UpdateBanner"
          description="Pinned banner shown at the top of this screen."
        />

        <DemoCard
          dark={dark}
          title="UpdateModal"
          description="Optional update dialog with dismiss action."
        >
          <TouchableOpacity
            style={demoStyles.previewPrimary}
            onPress={() => setShowModal(true)}
          >
            <Text style={demoStyles.previewButtonText}>Preview Modal</Text>
          </TouchableOpacity>
        </DemoCard>

        <DemoCard
          dark={dark}
          title="ForceUpdateModal"
          description="Blocking modal for mandatory updates. Reload the app to exit the preview."
        >
          <TouchableOpacity
            style={demoStyles.previewDanger}
            onPress={() => setShowForceModal(true)}
          >
            <Text style={demoStyles.previewButtonText}>
              Preview Force Update
            </Text>
          </TouchableOpacity>
        </DemoCard>
      </ScrollView>

      {showModal ? (
        <UpdateModal
          currentVersion={CURRENT_VERSION}
          latestVersion={LATEST_VERSION}
          storeUrl={STORE_URL}
          colorScheme={colorScheme}
          onDismiss={() => setShowModal(false)}
        />
      ) : null}

      {showForceModal ? (
        <ForceUpdateModal
          currentVersion={CURRENT_VERSION}
          latestVersion={FORCE_VERSION}
          storeUrl={STORE_URL}
          colorScheme={colorScheme}
        />
      ) : null}
    </SafeAreaView>
  );
}

const demoStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#F2F2F7',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  hero: {
    gap: 8,
    marginBottom: 4,
  },
  badge: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  badgeLight: {
    color: '#5C5C5C',
  },
  badgeDark: {
    color: '#AEAEB2',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headingLight: {
    color: '#111111',
  },
  headingDark: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtitleLight: {
    color: '#5C5C5C',
  },
  subtitleDark: {
    color: '#AEAEB2',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  toggleRowLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5EA',
  },
  toggleRowDark: {
    backgroundColor: '#1C1C1E',
    borderColor: '#38383A',
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleLabelLight: {
    color: '#111111',
  },
  toggleLabelDark: {
    color: '#FFFFFF',
  },
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5EA',
  },
  cardDark: {
    backgroundColor: '#1C1C1E',
    borderColor: '#38383A',
  },
  cardTitleLight: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '700',
  },
  cardTitleDark: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescriptionLight: {
    color: '#5C5C5C',
    fontSize: 14,
    lineHeight: 20,
  },
  cardDescriptionDark: {
    color: '#AEAEB2',
    fontSize: 14,
    lineHeight: 20,
  },
  previewPrimary: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
  },
  previewDanger: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FF3B30',
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

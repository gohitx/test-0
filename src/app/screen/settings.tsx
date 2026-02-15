import { useRouter } from 'expo-router';
import { ChevronLeft, Moon, Smartphone, Sun } from 'lucide-react-native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_BG = '#0D0D0F';
const CARD_BG = '#151517';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A1A1AA';
const SEPARATOR = '#27272A';
const ACTIVE_COLOR = '#EE0E94';

type ThemeOption = 'automatic' | 'light' | 'dark';

const THEME_OPTIONS: {
  label: string;
  value: ThemeOption;
  Icon: typeof Smartphone;
}[] = [
  { label: 'Automatic', value: 'automatic', Icon: Smartphone },
  { label: 'Light', value: 'light', Icon: Sun },
  { label: 'Dark', value: 'dark', Icon: Moon },
];

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('automatic');

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radioBase, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={20}
          style={styles.backButton}
        >
          <ChevronLeft color={TEXT_PRIMARY} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeader}>Theme</Text>
        <View style={styles.card}>
          {THEME_OPTIONS.map((option, index) => {
            const isLast = index === THEME_OPTIONS.length - 1;
            const Icon = option.Icon;

            return (
              <View key={option.value}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => setSelectedTheme(option.value)}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowLeft}>
                    <Icon color={TEXT_PRIMARY} size={20} />
                    <Text style={styles.rowLabel}>{option.label}</Text>
                  </View>
                  <RadioButton selected={selectedTheme === option.value} />
                </TouchableOpacity>
                {!isLast && <View style={styles.separator} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    marginBottom: 8,
    marginTop: 24,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: SEPARATOR,
    marginLeft: 16 + 20 + 12,
  },
  radioBase: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#52525B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: ACTIVE_COLOR,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ACTIVE_COLOR,
  },
});

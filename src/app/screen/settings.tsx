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
const CARD_BG = '#151517'; // Slightly lighter for contrast
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A1A1AA';
const SEPARATOR = '#27272A';
const ACTIVE_COLOR = '#EE0E94';

type ThemeOption = 'automatic' | 'light' | 'dark';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('automatic');

  // Helper to render radio button
  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radioBase, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
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
        {/* Theme Section */}
        <Text style={styles.sectionHeader}>Theme</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setSelectedTheme('automatic')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Smartphone color={TEXT_PRIMARY} size={20} />
              <Text style={styles.rowLabel}>Automatic</Text>
            </View>
            <RadioButton selected={selectedTheme === 'automatic'} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => setSelectedTheme('light')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Sun color={TEXT_PRIMARY} size={20} />
              <Text style={styles.rowLabel}>Light</Text>
            </View>
            <RadioButton selected={selectedTheme === 'light'} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => setSelectedTheme('dark')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Moon color={TEXT_PRIMARY} size={20} />
              <Text style={styles.rowLabel}>Dark</Text>
            </View>
            <RadioButton selected={selectedTheme === 'dark'} />
          </TouchableOpacity>
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
    fontSize: 24, // Matches standard large title somewhat, but inline
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
    textTransform: 'uppercase', // Optional style choice, looks clean
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
  rowLabelNoIcon: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    fontWeight: '400',
  },
  separator: {
    height: StyleSheet.hairlineWidth, // Thin separator
    backgroundColor: SEPARATOR,
    marginLeft: 16 + 20 + 12, // Align with text (icon size + gap + padding)
  },
  footerText: {
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 4,
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 18,
  },
  // Radio Button Styles
  radioBase: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#52525B', // Zinc-600
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

import { router } from 'expo-router';
import { DollarSign } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SCREEN_BG = '#0D0D0F';
const TEXT_ACTIVE = '#FFFFFF';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/screen/billing')}>
          <DollarSign color={TEXT_ACTIVE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SCREEN_BG,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: TEXT_ACTIVE,
    letterSpacing: -0.5,
  },
  header: {
    padding: 16,
  },
});

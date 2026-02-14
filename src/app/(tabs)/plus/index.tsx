import { COLORS } from '@/configs/styles/theme/colors';
import { StyleSheet, Text, View } from 'react-native';

export default function PlusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.screenBg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.active,
    letterSpacing: -0.5,
  },
});

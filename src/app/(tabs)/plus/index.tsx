import { StyleSheet, Text, View } from 'react-native';

const SCREEN_BG = '#0D0D0F';
const TEXT_ACTIVE = '#FFFFFF';

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
    backgroundColor: SCREEN_BG,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: TEXT_ACTIVE,
    letterSpacing: -0.5,
  },
});

import { screenStyles } from '@/configs/styles/theme/screen';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Home Screen</Text>
    </View>
  );
}

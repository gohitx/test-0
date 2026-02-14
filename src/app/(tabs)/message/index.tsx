import { screenStyles } from '@/configs/styles/theme/screen';
import { Text, View } from 'react-native';

export default function MessageScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Messages</Text>
    </View>
  );
}

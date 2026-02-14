import { screenStyles } from '@/configs/styles/theme/screen';
import { Text, View } from 'react-native';

export default function PlusScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Create</Text>
    </View>
  );
}

import { screenStyles } from '@/configs/styles/theme/screen';
import { Text, View } from 'react-native';

export default function UserScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Profile</Text>
    </View>
  );
}

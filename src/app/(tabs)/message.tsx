import { Text, View } from 'react-native';
import { screenStyles } from '../../styles/theme/screen';

export default function MessageScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Messages</Text>
    </View>
  );
}

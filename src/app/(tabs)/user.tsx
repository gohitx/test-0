import { Text, View } from 'react-native';
import { screenStyles } from '../../styles/theme/screen';

export default function UserScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Profile</Text>
    </View>
  );
}

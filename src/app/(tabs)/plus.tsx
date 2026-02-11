import { Text, View } from 'react-native';
import { screenStyles } from '../../styles/theme/screen';

export default function PlusScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Create</Text>
    </View>
  );
}

import { Text, View } from 'react-native';
import { screenStyles } from '../../styles/screen';

export default function WalletScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Wallet</Text>
    </View>
  );
}

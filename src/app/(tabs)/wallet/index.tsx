import { screenStyles } from '@/configs/styles/theme/screen';
import { Text, View } from 'react-native';

export default function WalletScreen() {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Wallet</Text>
    </View>
  );
}

import BottomBar from '@/configs/navigation/bottom-bar';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <BottomBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="message/index" options={{ title: 'Messages' }} />
      <Tabs.Screen name="plus/index" options={{ title: 'Create' }} />
      <Tabs.Screen name="wallet/index" options={{ title: 'Wallet' }} />
      <Tabs.Screen name="user/index" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import BottomBar from '../../navigation/bottom-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <BottomBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="message" options={{ title: 'Messages' }} />
      <Tabs.Screen name="plus" options={{ title: 'Create' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
      <Tabs.Screen name="user" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

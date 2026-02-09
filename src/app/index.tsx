import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HomeOutline from '../components/icons/bottom-bar/outline/home';
import MessageOutline from '../components/icons/bottom-bar/outline/message';
import UserOutline from '../components/icons/bottom-bar/outline/user';
import WalletOutline from '../components/icons/bottom-bar/outline/wallet';
import PlusIcon from '../components/icons/bottom-bar/plus';
import HomeFilled from '../components/icons/bottom-bar/solid/home';
import MessageSolid from '../components/icons/bottom-bar/solid/message';
import UserSolid from '../components/icons/bottom-bar/solid/user';
import WalletSolid from '../components/icons/bottom-bar/solid/wallet';

interface IconDef {
  id: string;
  name: string;
  Outline: React.ComponentType<any>;
  Solid: React.ComponentType<any>;
}

const icons: IconDef[] = [
  { id: 'home', name: 'Home', Outline: HomeOutline, Solid: HomeFilled },
  {
    id: 'message',
    name: 'Message',
    Outline: MessageOutline,
    Solid: MessageSolid,
  },
  { id: 'wallet', name: 'Wallet', Outline: WalletOutline, Solid: WalletSolid },
  { id: 'user', name: 'User', Outline: UserOutline, Solid: UserSolid },
];

export default function Index() {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Icons Preview</Text>
      <Text style={styles.subtitle}>
        Tap an icon to switch to solid variant
      </Text>

      <View style={styles.grid}>
        {icons.map(icon => {
          const isActive = activeIcon === icon.id;
          const IconComponent = isActive ? icon.Solid : icon.Outline;

          return (
            <TouchableOpacity
              key={icon.id}
              style={styles.iconWrapper}
              onPress={() => setActiveIcon(icon.id)}
            >
              <View style={styles.iconBox}>
                <IconComponent
                  size={40}
                  color={isActive ? '#4F46E5' : '#64748B'}
                />
              </View>
              <Text style={[styles.iconLabel, isActive && styles.activeLabel]}>
                {icon.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Plus Icon - Standalone as it has no solid pair */}
        <TouchableOpacity style={styles.iconWrapper}>
          <View style={styles.iconBox}>
            <PlusIcon size={40} color="#64748B" />
          </View>
          <Text style={styles.iconLabel}>Plus PE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  iconWrapper: {
    alignItems: 'center',
    width: 80,
  },
  iconBox: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});

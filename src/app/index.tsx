import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  HomeOutline,
  HomeSolid,
  MessageOutline,
  MessageSolid,
  PlusIcon,
  UserOutline,
  UserSolid,
  WalletOutline,
  WalletSolid,
} from '../components/icons/icons';

interface IconDef {
  id: string;
  name: string;
  Outline: React.ComponentType<any>;
  Solid: React.ComponentType<any>;
}

const icons: IconDef[] = [
  { id: 'home', name: 'Home', Outline: HomeOutline, Solid: HomeSolid },
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
              <View style={[styles.iconBox, isActive && styles.activeIconBox]}>
                <IconComponent
                  size={40}
                  color={isActive ? '#FFFFFF' : '#64748B'}
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
  activeIconBox: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  iconLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

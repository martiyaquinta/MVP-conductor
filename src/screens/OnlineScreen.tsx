import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { Toggle } from '../components/Toggle';
import { Card } from '../components/Card';
import { TabBar } from '../components/TabBar';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const OnlineScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'earnings' | 'profile'>('home');

  const handleTabPress = (tab: 'home' | 'earnings' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'earnings') navigation.navigate('Earnings');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.deepBlue} />
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.navigate('IncomingRequest')}
        >
          <Text style={styles.avatarText}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.toggleSection}>
          <Text style={styles.statusLabel}>
            Estas {isOnline ? 'conectado' : 'desconectado'}
          </Text>
          <Toggle value={isOnline} onToggle={() => {
            setIsOnline(!isOnline);
            if (!isOnline) {
              setTimeout(() => navigation.navigate('IncomingRequest'), 2000);
            }
          }} />
        </View>

        <Card style={styles.earningsCard} padding={theme.spacing.lg}>
          <Text style={styles.earningsLabel}>Ganaste hoy</Text>
          <Text style={styles.earningsAmount}>$0</Text>
          <Text style={styles.earningsSubtext}>
            Todavia no hiciste viajes hoy
          </Text>
        </Card>

        <View style={{ flex: 1 }} />
      </View>

      <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
    gap: theme.spacing.lg,
  },
  header: {
    height: 56,
    backgroundColor: theme.colors.deepBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  menuIcon: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  toggleSection: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.lg,
  },
  statusLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
  },
  earningsCard: {
    width: 343,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  earningsLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.deepBlue,
  },
  earningsAmount: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  earningsSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
});

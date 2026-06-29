import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { TabBar } from '../components/TabBar';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const TripCompleteScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = React.useState<'home' | 'earnings' | 'profile'>('home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.completedLabel}>Viaje completado!</Text>
        <Text style={styles.earnedLabel}>Ganaste</Text>
        <Text style={styles.earnedAmount}>$2.500</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryDestination}>Terminal de Omnibus</Text>
          <Text style={styles.summaryInfo}>5 min · 3.2 km</Text>
        </View>

        <Button
          title="Cobrar $2.500 · EFECTIVO"
          onPress={() => navigation.navigate('PaymentMethod')}
          style={styles.button}
        />
        <Button
          title="VOLVER AL INICIO"
          onPress={() => navigation.navigate('Online')}
          style={styles.button}
        />
      </View>
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    gap: theme.spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  completedLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
  },
  earnedLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
  },
  earnedAmount: {
    fontSize: theme.fontSize['5xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.turquoise,
  },
  summaryCard: {
    width: 300,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lightGray,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  summaryDestination: {
    fontSize: theme.fontSize.md,
    color: theme.colors.deepBlue,
  },
  summaryInfo: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  button: {
    width: 300,
  },
});

import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Card } from '../components/Card';
import { TabBar } from '../components/TabBar';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const EarningsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = React.useState<'home' | 'earnings' | 'profile'>('earnings');

  const handleTabPress = (tab: 'home' | 'earnings' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Online');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.deepBlue} />
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Cobros</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.saldoCard} padding={theme.spacing.lg}>
          <Text style={styles.saldoLabel}>Saldo acumulado</Text>
          <Text style={styles.saldoAmount}>$2.700</Text>
          <Text style={styles.saldoInfo}>Se transfiere hoy a las 20hs</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Desglose de hoy</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>💵 Efectivo</Text>
            <Text style={styles.rowValue}>$1.500</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>🏦 Transferencia</Text>
            <Text style={[styles.rowValue, { color: theme.colors.turquoise }]}>$2.700</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { fontWeight: theme.fontWeight.bold }]}>Total hoy</Text>
            <Text style={[styles.rowValue, { fontWeight: theme.fontWeight.bold }]}>$4.200</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Tus ganancias</Text>
          <View style={styles.earningRow}>
            <Text style={styles.earningLabel}>Ayer</Text>
            <Text style={styles.earningAmount}>$3.800</Text>
          </View>
          <View style={styles.earningRow}>
            <Text style={styles.earningLabel}>Esta semana</Text>
            <Text style={styles.earningAmount}>$12.800</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Metodo de cobro</Text>
          <View style={styles.row}>
            <Text style={styles.cvuText}>CVU: 0000-1234-5678-9012</Text>
            <Text style={styles.changeLink}>Cambiar →</Text>
          </View>
        </Card>
      </ScrollView>

      <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
    gap: theme.spacing.md,
  },
  header: {
    height: 56,
    backgroundColor: theme.colors.deepBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  saldoCard: {
    width: 343,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  saldoLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  saldoAmount: {
    fontSize: 36,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.turquoise,
  },
  saldoInfo: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  cardTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.deepBlue,
  },
  rowValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.lightGray,
    marginVertical: theme.spacing.xs,
  },
  earningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 4,
  },
  earningLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.mediumGray,
  },
  earningAmount: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  cvuText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.deepBlue,
  },
  changeLink: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.turquoise,
  },
});

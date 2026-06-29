import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const NavigationScreen: React.FC = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mapArea}>
        <Text style={styles.mapPlaceholder}>🗺  Mapa</Text>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.label}>Rumbo al pasajero</Text>
        <Text style={styles.address}>Av. San Martin 450</Text>
        <Text style={styles.eta}>4 min · 1.8 km</Text>
        <View style={styles.navButtons}>
          <Button
            title="Abrir en Waze"
            variant="secondary"
            onPress={() => {}}
            style={styles.navButton}
            textStyle={styles.navButtonText}
          />
          <Button
            title="Abrir en Maps"
            variant="secondary"
            onPress={() => {}}
            style={styles.navButton}
            textStyle={styles.navButtonText}
          />
        </View>
        <Button
          title="LLEGUE"
          onPress={() => navigation.navigate('WaitingPassenger')}
          style={styles.arrivedButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mapArea: {
    height: 528,
    backgroundColor: theme.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.mediumGray,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
  },
  address: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  eta: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.deepBlue,
  },
  navButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  navButton: {
    flex: 1,
    height: 40,
  },
  navButtonText: {
    fontSize: theme.fontSize.sm,
  },
  arrivedButton: {
    width: '100%',
    marginTop: theme.spacing.sm,
  },
});

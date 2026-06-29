import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const TripInProgressScreen: React.FC = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mapArea}>
        <Text style={styles.mapPlaceholder}>🗺  Mapa</Text>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.label}>En viaje</Text>
        <Text style={styles.destination}>Terminal de Omnibus</Text>
        <Text style={styles.eta}>5 min · 3.2 km</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Button
          title="FINALIZAR VIAJE"
          onPress={() => navigation.navigate('TripComplete')}
          style={styles.button}
        />
        <TouchableOpacity>
          <Text style={styles.wazeLink}>Abrir en Waze</Text>
        </TouchableOpacity>
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
    height: 609,
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
  destination: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  eta: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.deepBlue,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.lightGray,
    width: '100%',
    marginTop: theme.spacing.sm,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.turquoise,
    width: '55%',
  },
  button: {
    width: 327,
    alignSelf: 'center',
    marginTop: theme.spacing.sm,
  },
  wazeLink: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
    textAlign: 'center',
  },
});

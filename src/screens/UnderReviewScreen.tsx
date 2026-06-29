import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const UnderReviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.iconCircle}>
        <Text style={styles.clockIcon}>⏳</Text>
      </View>
      <Text style={styles.title}>Tus datos estan siendo verificados</Text>
      <Text style={styles.subtitle}>
        Te avisaremos por WhatsApp cuando tu cuenta este verificada
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(0, 194, 179, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
    textAlign: 'center',
    width: 280,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.mediumGray,
    textAlign: 'center',
    width: 280,
    lineHeight: 24,
  },
});

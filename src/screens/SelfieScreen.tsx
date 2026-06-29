import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const SelfieScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.closeButton}>✕ Cerrar</Text>
      </View>
      <View style={styles.spacer} />
      <Text style={styles.instruction}>Mira a la camara</Text>
      <View style={styles.viewfinder}>
        <Text style={styles.viewfinderHint}>Tu rostro aqui</Text>
      </View>
      <View style={styles.spacer} />
      <Text style={styles.hint}>
        Parpadea cuando te lo indiquemos.{'\n'}Gira la cabeza lentamente.
      </Text>
      <View style={styles.spacerLarge} />
      <Text style={styles.brand}>Verificacion por DIDIT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  closeButton: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  spacer: {
    height: 8,
  },
  instruction: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    width: 327,
  },
  viewfinder: {
    width: 260,
    height: 300,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  viewfinderHint: {
    color: theme.colors.mediumGray,
    fontSize: theme.fontSize.sm,
  },
  hint: {
    color: theme.colors.mediumGray,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    width: 280,
    marginTop: theme.spacing.md,
    lineHeight: 22,
  },
  spacerLarge: {
    height: 24,
  },
  brand: {
    color: theme.colors.mediumGray,
    fontSize: theme.fontSize.xs,
  },
});

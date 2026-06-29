import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const LoginPhoneScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoCircle}>
        <View style={styles.logoInner}>
          <Text style={styles.logoLetter}>L</Text>
        </View>
      </View>
      <Text style={styles.wordmark}>Lifty</Text>
      <Text style={styles.tagline}>Movilidad que te eleva</Text>
      <View style={styles.phoneInput}>
        <Text style={styles.countryCode}>+54</Text>
        <View style={styles.divider} />
        <Text style={styles.phonePlaceholder}>Tu numero de telefono</Text>
      </View>
      <Button
        title="CONTINUAR"
        onPress={() => navigation.navigate('LoginOTP')}
        disabled={true}
        style={styles.button}
      />
      <Text style={styles.terms}>
        Al continuar aceptas los Terminos y Condiciones
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.turquoise,
  },
  wordmark: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
  tagline: {
    fontSize: theme.fontSize.md,
    color: theme.colors.mediumGray,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.dimensions.inputHeight,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    borderRadius: theme.radius.inputRadius,
    paddingHorizontal: theme.spacing.md,
    width: 327,
    gap: theme.spacing.sm,
  },
  countryCode: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.mediumGray,
  },
  phonePlaceholder: {
    color: theme.colors.mediumGray,
    fontSize: theme.fontSize.md,
  },
  button: {
    width: 327,
  },
  terms: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.mediumGray,
    textAlign: 'center',
  },
});

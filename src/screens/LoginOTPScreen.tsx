import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { OTPInput } from '../components/OTPInput';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const LoginOTPScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spacer} />
      <Text style={styles.title}>Ingresa el codigo</Text>
      <Text style={styles.subtitle}>
        Te enviamos un SMS al +54 9 11 1234-5678
      </Text>
      <OTPInput length={4} value={otp} onChange={setOtp} />
      <TouchableOpacity>
        <Text style={styles.resend}>No te llego? Reenviar</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <Button
        title="VERIFICAR CODIGO"
        onPress={() => navigation.navigate('KYCVerify')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  header: {
    height: theme.dimensions.navbarHeight,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  backText: {
    color: theme.colors.deepBlue,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
  },
  spacer: {
    height: 32,
    width: 1,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  resend: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.turquoise,
  },
  button: {
    width: 327,
  },
});

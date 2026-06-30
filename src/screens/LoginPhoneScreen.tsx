/**
 * @deprecated Email-only auth (feature 003). Phone auth removed from main flow.
 * Kept for reference. Remove when cleanup is confirmed.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useSignIn } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';

const ARGENTINA_COUNTRY_CODE = '+54';
const MIN_PHONE_DIGITS = 10;

function formatPhone(digits: string): string {
  if (digits.length === 0) return '';
  let result = digits[0];
  if (digits.length > 1) result += ' ' + digits.slice(1, Math.min(digits.length, 3));
  if (digits.length > 3) result += ' ' + digits.slice(3, Math.min(digits.length, 7));
  if (digits.length > 7) result += '-' + digits.slice(7, 11);
  return result;
}

export const LoginPhoneScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const signIn = useSignIn();
  const storePhone = useAuthStore((s) => s.setPhone);
  const [phone, setPhone] = useState('');

  const digits = phone.replace(/\D/g, '');
  const isValid = digits.length >= MIN_PHONE_DIGITS;
  const displayPhone = formatPhone(digits);

  const handleContinue = async () => {
    if (!isValid || signIn.isPending) return;
    try {
      await signIn.mutateAsync(ARGENTINA_COUNTRY_CODE + digits);
      storePhone(digits);
      navigation.navigate('LoginOTP');
    } catch {
      // error displayed via signIn.error
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Navbar
        title=""
        showBack
        onBack={() => navigation.goBack()}
        backgroundColor={theme.colors.deepBlue}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoCircle}>
            <View style={styles.logoInner}>
              <Text style={styles.logoLetter}>L</Text>
            </View>
          </View>
          <Text style={styles.wordmark}>Lifty</Text>
          <Text style={styles.title}>Ingresa tu telefono</Text>
          <Text style={styles.subtitle}>
            Te enviaremos un codigo de verificacion por SMS
          </Text>
          <Input
            leftElement={<Text style={styles.countryCode}>+54</Text>}
            value={displayPhone}
            onChangeText={(t) => setPhone(t.replace(/\D/g, ''))}
            placeholder="9 XX XXXX-XXXX"
            keyboardType="phone-pad"
            error={signIn.error?.message}
            containerStyle={styles.phoneInput}
            testID="phone-input"
          />
          <Button
            title="CONTINUAR"
            onPress={handleContinue}
            disabled={!isValid}
            loading={signIn.isPending}
            variant="primary"
            style={styles.button}
          />
          <Text style={styles.terms}>
            Al continuar aceptas los Terminos y Condiciones
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.deepBlue,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
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
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
    textAlign: 'center',
  },
  countryCode: {
    color: theme.colors.deepBlue,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  phoneInput: {
    width: 327,
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

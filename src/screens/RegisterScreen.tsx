import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { OTPInput } from '../components/OTPInput';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { apiClient } from '../api/client';
import { useAuthStore } from '../store/authStore';

const COOLDOWN_SECONDS = 30;

export const RegisterScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setDriverId = useAuthStore((s) => s.setDriverId);
  const setDriverStatus = useAuthStore((s) => s.setDriverStatus);

  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const passwordMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;

  const handleSendOtp = async () => {
    setError(null);
    if (!email.trim()) {
      setError('Ingresa tu email');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/register/email', { email: email.trim() });
      setStep('verify');
    } catch (err: any) {
      const message = err?.error?.message ?? err?.message ?? 'Error al enviar el codigo';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/auth/register/email', { email: email.trim() });
      setCooldown(COOLDOWN_SECONDS);
    } catch (err: any) {
      const message = err?.error?.message ?? err?.message ?? 'Error al reenviar el codigo';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleVerify = async () => {
    setError(null);

    if (otp.length !== 6) {
      setError('Ingresa el codigo de 6 digitos');
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setError('Las contrasenas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiClient.post('/auth/register/verify-email', {
        email: email.trim(),
        otp,
        password,
      });

      if (data.access_token) {
        setTokens(data.access_token, data.refresh_token ?? '');
        if (data.user?.id) setDriverId(data.user.id);

        try {
          const statusRes = await apiClient.get('/drivers/me/status');
          const payload = statusRes.data?.data ?? statusRes.data;
          const status = payload?.status;
          if (status) setDriverStatus(status);

          switch (status) {
            case 'approved':
              navigation.replace('Online');
              break;
            case 'under_review':
              navigation.replace('UnderReview');
              break;
            default:
              navigation.replace('Terms');
              break;
          }
        } catch {
          navigation.replace('Terms');
        }
      }
    } catch (err: any) {
      const message = err?.error?.message ?? err?.message ?? 'Error al verificar el codigo';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError(null);
  };

  if (step === 'verify') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToEmail}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verifyContent}>
          <Text style={styles.title}>Verifica tu email</Text>
          <Text style={styles.subtitle}>
            Te enviamos un codigo de 6 digitos a {email}
          </Text>
          <OTPInput length={6} value={otp} onChange={setOtp} />
          <TouchableOpacity onPress={handleResend} disabled={cooldown > 0 || loading}>
            <Text style={[styles.resend, (cooldown > 0 || loading) && styles.resendDisabled]}>
              {cooldown > 0 ? `Reenviar en ${cooldown}s` : 'No te llego? Reenviar'}
            </Text>
          </TouchableOpacity>
          <Input
            placeholder="Contrasena"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(null); }}
            secureTextEntry={!showPassword}
            containerStyle={styles.inputField}
          />
          <Input
            placeholder="Confirmar contrasena"
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); setError(null); }}
            secureTextEntry={!showPassword}
            containerStyle={styles.inputField}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordRow}>
            <Text style={styles.showPasswordText}>
              {showPassword ? '🙈 Ocultar contrasena' : '👁 Mostrar contrasena'}
            </Text>
          </TouchableOpacity>
          {passwordMismatch && (
            <Text style={styles.mismatchText}>Las contrasenas no coinciden</Text>
          )}
          {passwordMatch && (
            <Text style={styles.matchText}>✓ Las contrasenas coinciden</Text>
          )}
          <View style={{ height: 8 }} />
          <Button
            title="CREAR CUENTA"
            onPress={handleVerify}
            loading={loading}
            disabled={otp.length !== 6 || !password || !confirmPassword || loading}
            style={styles.button}
          />
          {error !== null && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 16 }} />
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Ingresa tu email y te enviamos un codigo</Text>
          <View style={{ height: 8 }} />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(t) => { setEmail(t); setError(null); }}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputField}
          />
          <View style={{ height: 8 }} />
          <Button
            title="ENVIAR CODIGO"
            onPress={handleSendOtp}
            loading={loading}
            disabled={!email.trim() || loading}
            style={styles.button}
          />
          {error !== null && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity onPress={() => navigation.navigate('LoginCredentials')}>
            <Text style={styles.loginLink}>Ya tenes cuenta? Inicia sesion</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  verifyContent: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
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
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
    width: 327,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
    width: 327,
  },
  inputField: {
    width: 327,
  },
  showPasswordRow: {
    width: 327,
    alignItems: 'flex-start',
  },
  showPasswordText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  mismatchText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dangerRed,
    width: 327,
  },
  matchText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.turquoise,
    width: 327,
  },
  resend: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.turquoise,
  },
  resendDisabled: {
    color: theme.colors.mediumGray,
  },
  button: {
    width: 327,
  },
  errorText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dangerRed,
    width: 327,
    textAlign: 'center',
  },
  loginLink: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.turquoise,
  },
});

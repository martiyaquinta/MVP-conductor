import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';

export const RegisterScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setDriverId = useAuthStore((s) => s.setDriverId);
  const setDriverStatus = useAuthStore((s) => s.setDriverStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const passwordMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = async () => {
    setError(null);
    if (!email.trim()) {
      setError('Ingresa tu email');
      return;
    }
    if (password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        setTokens(data.session.access_token, data.session.refresh_token ?? '');
        if (data.session.user?.id) setDriverId(data.session.user.id);

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
      } else {
        setCheckEmail(true);
      }
    } catch (err: any) {
      const message = err?.message ?? 'Error al crear la cuenta';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (checkEmail) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { setCheckEmail(false); setError(null); }}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verifyContent}>
          <Text style={styles.title}>Revisa tu email</Text>
          <Text style={styles.subtitle}>
            Te enviamos un link de confirmacion a {email}. Una vez confirmado, inicia sesion.
          </Text>
          <View style={{ height: 16 }} />
          <Button
            title="IR A INICIAR SESION"
            onPress={() => navigation.replace('LoginCredentials')}
            style={styles.button}
          />
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
          <Text style={styles.subtitle}>Ingresa tu email y contrasena para registrarte</Text>
          <View style={{ height: 8 }} />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(t) => { setEmail(t); setError(null); }}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputField}
          />
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
            onPress={handleRegister}
            loading={loading}
            disabled={!email.trim() || !password || !confirmPassword || loading}
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
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  backText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.deepBlue,
    fontWeight: theme.fontWeight.semibold,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.mediumGray,
    marginBottom: theme.spacing.sm,
  },
  verifyContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  inputField: {
    marginBottom: theme.spacing.sm,
  },
  showPasswordRow: {
    marginVertical: theme.spacing.sm,
  },
  showPasswordText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  mismatchText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dangerRed,
    marginTop: theme.spacing.xs,
  },
  matchText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.turquoise,
    marginTop: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  errorText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dangerRed,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  loginLink: {
    fontSize: theme.fontSize.md,
    color: theme.colors.deepBlue,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
  resend: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.deepBlue,
    textAlign: 'center',
  },
  resendDisabled: {
    color: theme.colors.mediumGray,
  },
});

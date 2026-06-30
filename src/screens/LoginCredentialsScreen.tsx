import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';
import { driverStatusSchema } from '../api/types';

export const LoginCredentialsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setTokens = useAuthStore((s) => s.setTokens);
  const setDriverId = useAuthStore((s) => s.setDriverId);
  const setDriverStatus = useAuthStore((s) => s.setDriverStatus);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });
      if (signInError) throw signInError;
      if (!data.session) throw new Error('No se pudo iniciar sesion');

      setTokens(data.session.access_token, data.session.refresh_token ?? '');
      if (data.session.user?.id) {
        setDriverId(data.session.user.id);
      }

      const response = await apiClient.get('/drivers/me/status');
      const parsed = driverStatusSchema.safeParse(response.data);
      const status = parsed.success ? parsed.data.status : (response.data as { status?: string })?.status;

      if (status === 'under_review') {
        setDriverStatus('under_review');
        navigation.navigate('UnderReview');
      } else if (status === 'approved') {
        setDriverStatus('approved');
        navigation.navigate('Online');
      } else if (status === 'pending') {
        setDriverStatus('pending');
        navigation.navigate('Terms');
      } else {
        setDriverStatus('approved');
        navigation.navigate('Online');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesion';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !username || !password || loading;

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
          <Text style={styles.title}>Iniciar sesion</Text>
          <Text style={styles.subtitle}>Ingresa tu email y contrasena</Text>
          <View style={{ height: 8 }} />
          <Input
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputField}
          />
          <Input
            placeholder="Contrasena"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            containerStyle={styles.inputField}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordRow}>
            <Text style={styles.showPasswordText}>
              {showPassword ? '🙈 Ocultar' : '👁 Mostrar'}
            </Text>
          </TouchableOpacity>
          <View style={{ height: 8 }} />
          <Button
            title="INICIAR SESION"
            onPress={handleLogin}
            loading={loading}
            disabled={isDisabled}
            style={styles.button}
          />
          {error !== null && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotPassword}>Olvidaste tu contrasena?</Text>
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
  eyeIcon: {
    fontSize: 16,
    color: theme.colors.mediumGray,
  },
  showPasswordRow: {
    width: 327,
    alignItems: 'flex-start',
  },
  showPasswordText: {
    fontSize: theme.fontSize.sm,
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
  forgotPassword: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.turquoise,
  },
});

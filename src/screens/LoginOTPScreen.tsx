import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { OTPInput } from '../components/OTPInput';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useVerifyOTP, useSignIn } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';
import { driverStatusSchema } from '../api/types';

const COOLDOWN_SECONDS = 30;

function formatPhone(digits: string): string {
  if (!digits) return '';
  let result = digits[0];
  if (digits.length > 1) result += ' ' + digits.slice(1, Math.min(digits.length, 3));
  if (digits.length > 3) result += ' ' + digits.slice(3, Math.min(digits.length, 7));
  if (digits.length > 7) result += '-' + digits.slice(7, 11);
  return result;
}

export const LoginOTPScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const verifyOTP = useVerifyOTP();
  const signIn = useSignIn();
  const phone = useAuthStore((s) => s.phone);
  const setDriverStatus = useAuthStore((s) => s.setDriverStatus);
  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [statusError, setStatusError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || !phone || signIn.isPending) return;
    try {
      await signIn.mutateAsync('+54' + phone);
      setCooldown(COOLDOWN_SECONDS);
    } catch {
      // error displayed via signIn.error
    }
  }, [cooldown, phone, signIn]);

  const handleVerify = async () => {
    if (otp.length !== 6 || verifyOTP.isPending || !phone) return;
    setStatusError(null);
    try {
      await verifyOTP.mutateAsync({ phone: '+54' + phone, token: otp });
      try {
        const { data: body } = await apiClient.get('/drivers/me/status');
        const payload = body?.data ?? body;
        const parsed = driverStatusSchema.safeParse(payload);
        const status: string = parsed.success ? parsed.data.status : payload?.status;
        if (status && ['pending', 'approved', 'under_review', 'rejected', 'suspended'].includes(status)) {
          setDriverStatus(status as 'pending' | 'approved' | 'under_review' | 'rejected' | 'suspended');
        }

        switch (status) {
          case 'pending':
            navigation.navigate('Terms');
            break;
          case 'approved':
            navigation.navigate('Online');
            break;
          case 'under_review':
            navigation.navigate('UnderReview');
            break;
          case 'rejected':
            setStatusError('Tu cuenta ha sido rechazada. Contacta a soporte.');
            break;
          case 'suspended':
            setStatusError('Tu cuenta ha sido suspendida.');
            break;
          default:
            navigation.navigate('Online');
            break;
        }
      } catch (apiErr: any) {
        setStatusError(apiErr?.message ?? 'Error al verificar el estado de tu cuenta.');
      }
    } catch {
      // error displayed via verifyOTP.error
    }
  };

  const isOTPComplete = otp.length === 6;
  const displayPhone = phone ? formatPhone(phone) : '';
  const errorMessage = verifyOTP.error?.message || statusError || signIn.error?.message;

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
        {phone ? `Te enviamos un SMS al +54 ${displayPhone}` : 'Te enviamos un SMS'}
      </Text>
      <OTPInput length={6} value={otp} onChange={setOtp} />
      <TouchableOpacity
        onPress={handleResend}
        disabled={cooldown > 0 || signIn.isPending}
      >
        <Text
          style={[
            styles.resend,
            (cooldown > 0 || signIn.isPending) && styles.resendDisabled,
          ]}
        >
          {cooldown > 0
            ? `Reenviar en ${cooldown}s`
            : 'No te llego? Reenviar'}
        </Text>
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
      <View style={styles.spacer} />
      <Button
        title="VERIFICAR CODIGO"
        onPress={handleVerify}
        disabled={!isOTPComplete}
        loading={verifyOTP.isPending}
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
  resendDisabled: {
    color: theme.colors.mediumGray,
  },
  error: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dangerRed,
    textAlign: 'center',
  },
  button: {
    width: 327,
  },
});

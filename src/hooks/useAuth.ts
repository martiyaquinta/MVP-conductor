import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';

/**
 * @deprecated Email-only auth (feature 003). Phone OTP auth removed from main flow.
 * Kept for reference. useSignIn / useVerifyOTP are no longer used by main screens.
 */
export function useSignIn() {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: 'sms' },
      });
      if (error) throw error;
      return data;
    },
  });
}

export function useVerifyOTP() {
  const setTokens = useAuthStore((s) => s.setTokens);
  const setDriverId = useAuthStore((s) => s.setDriverId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ phone, token }: { phone: string; token: string }) => {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.session) {
        setTokens(
          data.session.access_token,
          data.session.refresh_token ?? ''
        );
        setDriverId(data.session.user.id);
      }
      queryClient.invalidateQueries();
    },
  });
}

export function useSignOut() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      if (token) {
        try { await apiClient.post('/auth/logout'); } catch { /* best-effort */ }
      }
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}

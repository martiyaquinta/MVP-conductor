import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function useSignIn() {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: 'whatsapp' },
      });
      if (error) throw error;
      return data;
    },
  });
}

export function useVerifyOTP() {
  const setTokens = useAuthStore((s) => s.setTokens);
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
      }
      queryClient.invalidateQueries();
    },
  });
}

export function useSignOut() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  driverId: string | null;
  isAuthenticated: boolean;
  needsRedirect: boolean;
  setTokens: (token: string, refreshToken: string) => void;
  setDriverId: (driverId: string) => void;
  clearAuth: () => void;
  resetRedirect: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      driverId: null,
      isAuthenticated: false,
      needsRedirect: false,
      setTokens: (token, refreshToken) =>
        set({ token, refreshToken, isAuthenticated: true }),
      setDriverId: (driverId) => set({ driverId }),
      clearAuth: () =>
        set({
          token: null,
          refreshToken: null,
          driverId: null,
          isAuthenticated: false,
          needsRedirect: true,
        }),
      resetRedirect: () => set({ needsRedirect: false }),
    }),
    {
      name: 'lifty-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        driverId: state.driverId,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

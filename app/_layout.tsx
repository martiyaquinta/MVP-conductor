import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/lib/queryClient';
import { ErrorBoundary } from '../src/components/feedback/ErrorBoundary';
import { ConnectivityBanner } from '../src/components/feedback/ConnectivityBanner';
import { useAuthStore } from '../src/store/authStore';
import { theme } from '../src/theme';

function AuthRedirectWatcher() {
  const needsRedirect = useAuthStore((s) => s.needsRedirect);
  const resetRedirect = useAuthStore((s) => s.resetRedirect);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (needsRedirect && segments[0] !== undefined) {
      resetRedirect();
      router.replace('/');
    }
  }, [needsRedirect, resetRedirect, router, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <View style={styles.root}>
          <StatusBar style="auto" />
          <AuthRedirectWatcher />
          <ConnectivityBanner />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: theme.colors.white },
            }}
          />
        </View>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

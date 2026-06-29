import { useRouter } from 'expo-router';

const SCREEN_TO_ROUTE: Record<string, string> = {
  Welcome: '/',
  LoginPhone: '/login-phone',
  LoginOTP: '/login-otp',
  LoginCredentials: '/login-credentials',
  Terms: '/terms',
  OnboardingStep1: '/onboarding-step1',
  OnboardingStep2: '/onboarding-step2',
  UploadDocument: '/upload-document',
  KYCVerify: '/kyc-verify',
  DNIScan: '/dni-scan',
  Selfie: '/selfie',
  UnderReview: '/under-review',
  Online: '/online',
  IncomingRequest: '/incoming-request',
  Navigation: '/navigation',
  WaitingPassenger: '/waiting-passenger',
  TripInProgress: '/trip-in-progress',
  TripComplete: '/trip-complete',
  Earnings: '/earnings',
  Profile: '/profile',
  PaymentMethod: '/payment-method',
};

export function useAppNavigation() {
  const router = useRouter();
  return {
    navigate: (screen: string) => {
      const route = SCREEN_TO_ROUTE[screen];
      if (route) router.push(route as any);
    },
    goBack: () => router.back(),
    replace: (screen: string) => {
      const route = SCREEN_TO_ROUTE[screen];
      if (route) router.replace(route as any);
    },
  };
}

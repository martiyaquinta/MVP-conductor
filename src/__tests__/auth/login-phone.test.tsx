jest.mock('../../hooks/useAuth', () => ({
  useSignIn: jest.fn(),
  useVerifyOTP: jest.fn(),
  useSignOut: jest.fn(),
}));

jest.mock('expo-router', () => {
  const router = {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  };
  return {
    useRouter: jest.fn(() => router),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  const store: Record<string, string> = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
        return Promise.resolve();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
        return Promise.resolve();
      }),
    },
  };
});

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useSignIn } from '../../hooks/useAuth';
import { LoginPhoneScreen } from '../../screens/LoginPhoneScreen';

function createMockSignIn(overrides: {
  mutateAsync?: jest.Mock;
  isPending?: boolean;
  error?: Error | null;
} = {}) {
  const defaults = {
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
    error: null,
  };
  (useSignIn as jest.Mock).mockReturnValue({ ...defaults, ...overrides });
  return defaults;
}

async function renderScreen() {
  return await render(<LoginPhoneScreen />);
}

describe('LoginPhoneScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ phone: null });
  });

  it('disables the button when phone input is empty', async () => {
    createMockSignIn();
    const { getByText } = await renderScreen();

    const button = getByText('CONTINUAR');
    expect(button.parent?.props.accessibilityState?.disabled).toBe(true);
  });

  it('enables the button when phone input has 10+ digits', async () => {
    createMockSignIn();
    const { getByText, getByTestId } = await renderScreen();

    await act(async () => {
      fireEvent.changeText(getByTestId('phone-input'), '91123456789');
    });

    const button = getByText('CONTINUAR');
    expect(button.parent?.props.accessibilityState?.disabled).toBe(false);
  }, 25000);

  it('calls useSignIn.mutateAsync with E.164 formatted phone on button press', async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    createMockSignIn({ mutateAsync: mockMutateAsync });

    const { getByText, getByTestId } = await renderScreen();

    await act(async () => {
      fireEvent.changeText(getByTestId('phone-input'), '91123456789');
    });

    await act(async () => {
      fireEvent.press(getByText('CONTINUAR').parent!);
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith('+5491123456789');
    });
  });

  it('stores phone in authStore and navigates to LoginOTP on success', async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    createMockSignIn({ mutateAsync: mockMutateAsync });

    const { getByText, getByTestId } = await renderScreen();

    await act(async () => {
      fireEvent.changeText(getByTestId('phone-input'), '91123456789');
    });

    await act(async () => {
      fireEvent.press(getByText('CONTINUAR').parent!);
    });

    const router = (useRouter as jest.Mock)();

    await waitFor(() => {
      expect(useAuthStore.getState().phone).toBe('91123456789');
      expect(router.push).toHaveBeenCalledWith('/login-otp');
    });
  });

  it('shows error text below input when useSignIn fails', async () => {
    createMockSignIn({
      mutateAsync: jest.fn().mockRejectedValue(new Error('Numero invalido')),
      error: new Error('Numero invalido'),
    });

    const { getByTestId, findByText } = await renderScreen();

    await act(async () => {
      fireEvent.changeText(getByTestId('phone-input'), '91123456789');
    });

    const errorText = await findByText('Numero invalido');
    expect(errorText).toBeTruthy();
  });
});

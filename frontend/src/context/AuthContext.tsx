// frontend/src/context/AuthContext.tsx

'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  AuthUser,
  LoginPayload,
  GuestLoginPayload,
  getAccessToken,
  getCurrentUser,
  guestLogin as guestLoginRequest,
  login as loginRequest,
  logout as logoutRequest,
} from '@/lib/auth';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    payload: LoginPayload,
  ) => Promise<AuthUser>;
  guestLogin: (
    payload?: GuestLoginPayload,
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token =
        getAccessToken();

      if (!token) {
        if (active) {
          setLoading(false);
        }

        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        if (active) {
          setUser(currentUser);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  async function login(
    payload: LoginPayload,
  ) {
    setLoading(true);

    try {
      const response =
        await loginRequest(payload);

      setUser(response.user);

      return response.user;
    } finally {
      setLoading(false);
    }
  }

  async function guestLogin(
    payload: GuestLoginPayload = {},
  ) {
    setLoading(true);

    try {
      const response =
        await guestLoginRequest(
          payload,
        );

      setUser(response.user);

      return response.user;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    try {
      await logoutRequest();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function refreshUser() {
    try {
      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      return currentUser;
    } catch {
      setUser(null);

      return null;
    }
  }

  const value: AuthContextValue = {
    user,
    loading,
    isAuthenticated:
      user !== null,
    login,
    guestLogin,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider',
    );
  }

  return context;
}

export default AuthContext;
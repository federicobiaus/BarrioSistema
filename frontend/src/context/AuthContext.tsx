'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: string;
  personId?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (
    token: string,
    user: User,
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedToken =
      localStorage.getItem(
        'token',
      );

    const storedUser =
      localStorage.getItem(
        'user',
      );

    if (
      storedToken &&
      storedUser
    ) {
      setToken(storedToken);

      setUser(
        JSON.parse(storedUser),
      );
    }

    setLoading(false);
  }, []);

  const login = (
    token: string,
    user: User,
  ) => {
    localStorage.setItem(
      'token',
      token,
    );

    localStorage.setItem(
      'user',
      JSON.stringify(user),
    );

    setToken(token);

    setUser(user);
  };

  const updateUser = (patch: Partial<User>) => {
    setUser((prev) => {
      const next = { ...(prev ?? {}), ...patch } as User;
      try {
        localStorage.setItem('user', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const logout = () => {
    localStorage.removeItem(
      'token',
    );

    localStorage.removeItem(
      'user',
    );

    setToken(null);

    setUser(null);

    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated:
          !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'password123') {
      const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('authToken', fakeToken);
      setToken(fakeToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    router.push('/login');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
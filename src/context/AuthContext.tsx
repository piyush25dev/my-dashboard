'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  userData: UserData | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'password123') {
      const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
      const userData: UserData = {
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com'
      };
      
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('userData', JSON.stringify(userData));
      setToken(fakeToken);
      setUserData(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setToken(null);
    setUserData(null);
    router.push('/login');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userData, login, logout, isAuthenticated }}>
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
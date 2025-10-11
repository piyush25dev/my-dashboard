// context/AuthContext.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Role } from '@/types/users';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UserData {
  name: string;
  username: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  token: string | null;
  userData: UserData | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers = [
  {
    username: 'superadmin',
    password: 'super123',
    userData: {
      name: 'Super Admin',
      username: 'superadmin',
      email: 'superadmin@example.com',
      role: 'SuperAdmin' as Role
    }
  },
  {
    username: 'admin',
    password: 'password123',
    userData: {
      name: 'Admin User',
      username: 'admin',
      email: 'admin@example.com',
      role: 'Admin' as Role
    }
  },
  {
    username: 'editor',
    password: 'editor123',
    userData: {
      name: 'Editor User',
      username: 'editor',
      email: 'editor@example.com',
      role: 'Editor' as Role
    }
  }
];

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
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
      
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('userData', JSON.stringify(user.userData));
      setToken(fakeToken);
      setUserData(user.userData);
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

  const hasPermission = (requiredRole: Role): boolean => {
    if (!userData?.role) return false;
    
    const roleHierarchy: Record<Role, number> = {
      'SuperAdmin': 4,
      'Admin': 3,
      'Editor': 2,
      'Viewer': 1
    };
    
    return roleHierarchy[userData.role] >= roleHierarchy[requiredRole];
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      token, 
      userData, 
      login, 
      logout, 
      isAuthenticated,
      hasPermission 
    }}>
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
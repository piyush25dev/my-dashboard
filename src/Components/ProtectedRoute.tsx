'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/Components/Loading';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated) {
    return <Loading />;
  }

  return <>{children}</>;
}
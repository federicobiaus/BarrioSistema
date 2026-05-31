'use client';

import {
  useEffect,
} from 'react';

import {
  useRouter,
  usePathname,
} from 'next/navigation';

import {
  useAuth,
} from '@/src/context/AuthContext';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    token,
    loading,
  } = useAuth();

  const router =
    useRouter();

  const pathname =
    usePathname();

  useEffect(() => {
    if (loading) return;

    const publicRoutes = [
      '/login',
    ];

    const isPublic =
      publicRoutes.includes(
        pathname,
      );

    if (!token && !isPublic) {
      router.push('/login');
      return;
    }

    if (token && pathname === '/login') {
      router.push('/dashboard');
      return;
    }
  }, [
    token,
    loading,
    pathname,
    router,
  ]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Cargando...
      </div>
    );
  }

  return <>{children}</>;
}
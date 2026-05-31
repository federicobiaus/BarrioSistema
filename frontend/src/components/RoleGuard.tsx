'use client';

import {
  ReactNode,
} from 'react';

import {
  useAuth,
} from '@/src/context/AuthContext';

import {
  useRouter,
} from 'next/navigation';

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({
  children,
  allowedRoles,
}: Props) {
  const {
    user,
    loading,
  } = useAuth();

  const router =
    useRouter();

  if (loading) {
    return (
      <div className="p-6">
        Cargando...
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (
    !allowedRoles.includes(
      user.role,
    )
  ) {
    return (
      <div className="p-6 text-red-600 font-bold">
        No tenés permisos para ver esto
      </div>
    );
  }

  return <>{children}</>;
}
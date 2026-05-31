'use client';

import AdminLayout from '@/src/components/AdminLayout';
import RoleGuard from '@/src/components/RoleGuard';

export default function OwnersPage() {
  return (
    <AdminLayout>
      <RoleGuard
        allowedRoles={['ADMIN', 'USER']}>
        <h1 className="text-3xl font-bold">
          Registro de usuarios
        </h1>
      </RoleGuard>
    </AdminLayout>
  );
}
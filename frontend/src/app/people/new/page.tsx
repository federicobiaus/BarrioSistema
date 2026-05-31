'use client';

import { Card, Typography } from 'antd';
import PersonForm from '@/src/components/people/PersonForm';
import AdminLayout from '@/src/components/AdminLayout';

const { Title } = Typography;

export default function NewPersonPage() {
  return (
    <AdminLayout>
      <Card style={{ minHeight: '100vh', background: '#f0f2f5', border: 'none' }} bodyStyle={{ padding: 24 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Title level={2}>Nueva Persona</Title>
          <PersonForm />

        </div>
      </Card>
    </AdminLayout>
  );
}
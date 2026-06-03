'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { api } from '@/src/lib/api';
import { Card, Form, Input, Button, Upload, Avatar, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AdminLayout from '@/src/components/AdminLayout';

const { Title, Text } = Typography;

interface PersonData {
  id: string;
  type: string;
  lot?: string | null;
  block?: string | null;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [person, setPerson] = useState<PersonData | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      firstName: user?.firstName || user?.name?.split(' ')[0] || '',
      lastName: user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    });
  }, [user, form]);

  useEffect(() => {
    async function loadPerson() {
      if (!user?.personId) {
        setPerson(null);
        return;
      }

      try {
        const response = await api.get(`/people/${user.personId}`);
        setPerson(response.data);
      } catch {
        setPerson(null);
      }
    }

    loadPerson();
  }, [user?.personId]);

  const handleFile = async (file: File) => {
    // Convert to base64 for preview
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onFinish = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      // Prepare payload for backend
      const payload = {
        firstName: values.firstName as string,
        lastName: values.lastName as string,
        email: values.email as string,
        phone: values.phone as string,
      };

      // Call backend API to update user
      const response = await api.patch(`/users/${user?.id}`, payload);

      // Update local context with response data
      updateUser({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phone: values.phone as string,
        avatar: preview, // Store avatar locally in context
      });

      message.success('Perfil actualizado correctamente');
      router.back();
    } catch (e: unknown) {
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const axiosError = e as ApiError;
      const errorMsg = axiosError.response?.data?.message || 'Error al actualizar el perfil';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
            <div>
              <Avatar size={96} src={preview ?? undefined} style={{ background: '#f0f0f0' }} />
            </div>
            <div style={{ flex: 1 }}>
              <Title level={3} style={{ margin: 0 }}>
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.name || 'Perfil'}
              </Title>
              <Text type="secondary">{user?.role == 'OWNER' ? 'Propietario' : user?.role == 'ADMIN' ? 'Administrador' : ''}</Text>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
            <Form.Item label="Nombre" name="firstName" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Apellido" name="lastName" rules={[{ required: true, message: 'Ingresa tu apellido' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email inválido' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Teléfono" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Foto de perfil">
              <Upload
                beforeUpload={async (file) => {
                  const dataUrl = await handleFile(file as File);
                  setPreview(dataUrl);
                  return false; // prevent upload
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button onClick={() => router.back()}>Cancelar</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Guardar
                </Button>
              </div>
            </Form.Item>
          </Form>

          {person?.type === 'OWNER' && (
            <Card style={{ marginTop: 24, borderRadius: 12 }}>
              <Title level={4}>Datos de propietario</Title>
              <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                <div>
                  <Text type="secondary">Lote</Text>
                  <div style={{ fontWeight: 600 }}>{person.lot || '-'}</div>
                </div>
                <div>
                  <Text type="secondary">Manzana</Text>
                  <div style={{ fontWeight: 600 }}>{person.block || '-'}</div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Card, Form, Input, Button, Upload, Avatar, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AdminLayout from '@/src/components/AdminLayout';

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      name: user?.name ?? '',
    });
  }, [user, form]);

  const handleFile = async (file: File) => {
    // Convert to base64 for preview and local storage persistence
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const patch: any = {
        email: values.email,
        phone: values.phone,
        name: values.name,
      };

      if (preview) patch.avatar = preview;

      // Update local context + storage. If backend endpoint exists, replace with API call.
      updateUser(patch);

      message.success('Perfil actualizado');
      router.back();
    } catch (e) {
      message.error('Error al actualizar el perfil');
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
            <Title level={3} style={{ margin: 0 }}>{user?.name || 'Perfil'}</Title>
            <Text type="secondary">{user?.role || ''}</Text>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
          <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
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
              <Button type="primary" htmlType="submit" loading={loading}>Guardar</Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </AdminLayout>
  );
}

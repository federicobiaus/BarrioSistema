'use client';

import { useState } from 'react';
//import { useRouter } from 'navigation'; // Ajustado si usas Next.js App Router estándar
import { useRouter as useNextRouter } from 'next/navigation'; // Mantener el tuyo original
import { useAuth } from '@/src/context/AuthContext';
import { authApi } from '@/src/lib/api'; // <-- IMPORTAMOS TU INSTANCIA DE API PERSONALIZADA
import { Card, Form, Input, Button, Typography, Alert } from 'antd';

const { Title, Text } = Typography;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useNextRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      // <-- CORREGIDO: Ahora usa authApi y se conecta dinámicamente a Render o Localhost
      const response = await authApi.post('/api/auth/login', {
        email,
        password,
      });

      const { accessToken, user } = response.data;
      login(accessToken, user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <Card style={{ width: '100%', maxWidth: 520, borderRadius: 24 }} variant="borderless">
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <Title level={2}>Barrio Privado</Title>
          <Text type="secondary">Sistema de Accesos</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          layout="vertical"
          name="login"
          onFinish={handleLogin}
          requiredMark={false}
          style={{ rowGap: 16 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Ingresa tu email' }, { type: 'email', message: 'Ingresa un email válido' }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

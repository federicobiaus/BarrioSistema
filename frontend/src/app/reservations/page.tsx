'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { Button, Card, Form, Input, Select, Space, Typography, Alert } from 'antd';
import AdminLayout from '@/src/components/AdminLayout';
import RoleGuard from '@/src/components/RoleGuard';
import api from '@/src/lib/api';
import { useAuth } from '@/src/context/AuthContext';

import ReservationsCalendar from '@/src/components/ReservationsCalendar';

export default function ReservationsPage() {
  const { user } = useAuth();
  const [reservations, setReservations] =
    useState([]);
  const [title, setTitle] =
    useState('');
  const [type, setType] =
    useState('CLUBHOUSE');
  const [description, setDescription] =
    useState('');
  const [date, setDate] =
    useState('');
  const [error, setError] =
    useState('');
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations =
    async () => {
      const response = await api.get('reservations');
      setReservations(response.data);
    };

  const handleCreateReservation =
    async () => {
      setError('');

      if (!user?.personId) {
        setError('No se encontró la persona asociada al usuario.');
        return;
      }

      if (!title || !type || !date) {
        setError('Debe completar título, tipo y fecha.');
        return;
      }

      try {
        setLoading(true);
        await api.post('reservations', {
          title,
          type,
          description,
          date: new Date(date).toISOString(),
          personId: user.personId,
        });
        setTitle('');
        setType('CLUBHOUSE');
        setDescription('');
        setDate('');
        await loadReservations();
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            'Error al crear la reserva',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AdminLayout>
      <RoleGuard allowedRoles={['ADMIN', 'USER', 'OWNER']}>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={2}>Reservas</Typography.Title>
            <Typography.Text type="secondary">Calendario de reservas</Typography.Text>
          </div>

          <Card style={{ marginBottom: 24 }}>
            <Typography.Title level={4}>Crear reserva</Typography.Title>

            <Form layout="vertical" onFinish={handleCreateReservation}>
              <Form.Item label="Título" required>
                <Input
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  placeholder="Visita del proveedor"
                />
              </Form.Item>

              <Form.Item label="Tipo de reserva" required>
                <Select value={type} onChange={(value: string) => setType(value)}>
                  <Select.Option value="CLUBHOUSE">Casa de club</Select.Option>
                  <Select.Option value="FUTBOLL">Fútbol</Select.Option>
                  <Select.Option value="VOLEY">Vóley</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Fecha y hora" required>
                <Input
                  type="datetime-local"
                  value={date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Descripción (opcional)">
                <Input.TextArea
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Detalles de la reserva"
                />
              </Form.Item>

              {error && (
                <Form.Item>
                  <Alert message={error} type="error" showIcon />
                </Form.Item>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  {loading ? 'Creando reserva...' : 'Crear reserva'}
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <ReservationsCalendar
            reservations={reservations}
          />
        </div>
      </RoleGuard>
    </AdminLayout>
  );
}
'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Typography, Alert } from 'antd';
import AdminLayout from '@/src/components/AdminLayout';
import RoleGuard from '@/src/components/RoleGuard';
import api from '@/src/lib/api';
import { useAuth } from '@/src/context/AuthContext';

import ReservationsCalendar from '@/src/components/ReservationsCalendar';

interface Reservation {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  date?: string;
  status?: string;
  personId?: string;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ReservationsPage() {
  const { user } = useAuth();
  const [reservations, setReservations] =
    useState<Reservation[]>([]);
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
  const [cancelLoadingId, setCancelLoadingId] =
    useState<string | null>(null);

  async function loadReservations() {
    const response = await api.get('reservations');
    setReservations(response.data);
  }

  useEffect(() => {
    const fetchReservations = async () => {
      await loadReservations();
    };

    void fetchReservations();
  }, []);

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
      } catch (err: unknown) {
        const message =
          typeof err === 'object' &&
          err !== null
            ? (err as ApiErrorResponse).response?.data?.message
            : undefined;
        setError(
          message || 'Error al crear la reserva',
        );
      } finally {
        setLoading(false);
      }
    };

  const handleCancelReservation =
    async (reservationId: string) => {
      setError('');
      try {
        setCancelLoadingId(reservationId);
        await api.patch(`reservations/${reservationId}/cancel`);
        await loadReservations();
      } catch (err: unknown) {
        const message =
          typeof err === 'object' &&
          err !== null
            ? (err as ApiErrorResponse).response?.data?.message
            : undefined;
        setError(
          message || 'Error al cancelar la reserva',
        );
      } finally {
        setCancelLoadingId(null);
      }
    };

  const sortedReservations = [...reservations].sort((a, b) => {
    const first = a.date ? new Date(a.date).getTime() : 0;
    const second = b.date ? new Date(b.date).getTime() : 0;
    return first - second;
  });

  return (
    <AdminLayout>
      <RoleGuard allowedRoles={['ADMIN', 'USER', 'OWNER']}>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={2}>Reservas</Typography.Title>
            <Typography.Text type="secondary">Calendario y gestión de reservas</Typography.Text>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={10}>
              <Card className="rounded-2xl shadow" style={{ maxWidth: 560 }}>
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
            </Col>

            <Col xs={24} lg={14}>
              <ReservationsCalendar
                reservations={sortedReservations}
                onCancel={handleCancelReservation}
                cancelingReservationId={cancelLoadingId}
              />
            </Col>
          </Row>
        </div>
      </RoleGuard>
    </AdminLayout>
  );
}
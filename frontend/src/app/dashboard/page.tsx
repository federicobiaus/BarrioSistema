'use client';

import { useEffect, useState } from 'react';
import { Alert, Card, Col, Progress, Row, Space, Spin, Typography } from 'antd';
import AdminLayout from '@/src/components/AdminLayout';
import api from '@/src/lib/api';
import { useAuth } from '@/src/context/AuthContext';

type DashboardStats = {
  peopleInside: number;
  entriesToday: number;
  exitsToday: number;
  blockedPeople: number;
  owners: number;
  visitorsToday: number;
  providers: number;
  reservationsPending: number;
  claimsOpen: number;
  users: number;
  guards: number;
};

type LatestAccess = {
  id: string;
  type: string;
  personName: string;
  vehiclePlate?: string | null;
  registeredBy: {
    email: string;
  };
  createdAt: string;
};

type PersonInside = {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  isBlocked: boolean;
  vehicles: Array<{
    plate: string;
  }>;
  updatedAt: string;
};

const { Title, Paragraph, Text } = Typography;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(dateString));
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [latest, setLatest] = useState<LatestAccess[]>([]);
  const [inside, setInside] = useState<PersonInside[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError('');

    try {
      const [statsRes, latestRes, insideRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/latest-accesses'),
        api.get('/dashboard/inside'),
      ]);

      setStats(statsRes.data);
      setLatest(latestRes.data);
      setInside(insideRes.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin tip="Cargando dashboard..." size="large" />
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Alert message={error || 'No hay datos disponibles en este momento.'} type="error" showIcon />
        </div>
      </AdminLayout>
    );
  }

  const chartData = [
    {
      label: 'Entradas hoy',
      value: stats.entriesToday,
      strokeColor: { from: '#0ea5e9', to: '#06b6d4' },
    },
    {
      label: 'Salidas hoy',
      value: stats.exitsToday,
      strokeColor: { from: '#22c55e', to: '#84cc16' },
    },
    {
      label: 'Personas dentro',
      value: stats.peopleInside,
      strokeColor: { from: '#7c3aed', to: '#d946ef' },
    },
    {
      label: 'Reservas pendientes',
      value: stats.reservationsPending,
      strokeColor: { from: '#f97316', to: '#facc15' },
    },
    {
      label: 'Reclamos abiertos',
      value: stats.claimsOpen,
      strokeColor: { from: '#ec4899', to: '#f472b6' },
    },
  ];

  const maxChartValue = Math.max(...chartData.map((item) => item.value), 1);

  return (
    <AdminLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={3}>Dashboard</Title>
          <Paragraph type="secondary">Bienvenido {user?.email}</Paragraph>
        </div>

        <Card>
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                Resumen visual
              </Title>
              <Text type="secondary">Estado rápido de accesos y operaciones del día.</Text>
            </Col>
            <Col>
              <Text type="secondary">Actualizado: {formatDate(new Date().toISOString())}</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {chartData.map((item) => (
              <Col key={item.label} xs={24} sm={12} xl={8}>
                <Card size="small" styles={{ body: { padding: 16 } }}>
                  <Row justify="space-between" align="middle">
                    <Text strong>{item.label}</Text>
                    <Title level={4} style={{ margin: 0 }}>
                      {item.value}
                    </Title>
                  </Row>
                  <Progress
                    percent={Math.round((item.value / maxChartValue) * 100)}
                    showInfo={false}
                    strokeColor={item.strokeColor}
                    style={{ marginTop: 16 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Últimos accesos" size="default">
              {latest.length === 0 ? (
                <Text type="secondary">No hay registros recientes.</Text>
              ) : (
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {latest.map((access) => (
                    <Card key={access.id} size="small" type="inner">
                      <Row justify="space-between" align="middle" gutter={[16, 16]}>
                        <Col>
                          <Text strong>{access.personName}</Text>
                          <div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {access.type} · {formatDate(access.createdAt)}
                            </Text>
                          </div>
                        </Col>
                        <Col>
                          <Text type="secondary">{access.vehiclePlate || 'Sin vehículo'}</Text>
                        </Col>
                      </Row>
                      <Paragraph type="secondary" style={{ marginBottom: 0, marginTop: 12 }}>
                        Registrado por: {access.registeredBy.email}
                      </Paragraph>
                    </Card>
                  ))}
                </Space>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Personas dentro" size="default">
              {inside.length === 0 ? (
                <Text type="secondary">No hay personas dentro actualmente.</Text>
              ) : (
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {inside.map((person) => (
                    <Card key={person.id} size="small" type="inner">
                      <Row justify="space-between" align="middle" gutter={[16, 16]}>
                        <Col>
                          <Text strong>
                            {person.firstName} {person.lastName}
                          </Text>
                          <div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {person.type.toLowerCase()}
                            </Text>
                          </div>
                        </Col>
                        <Col>
                          <Text type="secondary">{formatDate(person.updatedAt)}</Text>
                        </Col>
                      </Row>
                      {person.vehicles.length > 0 && (
                        <Paragraph type="secondary" style={{ marginBottom: 0, marginTop: 12 }}>
                          Vehículos: {person.vehicles.map((vehicle) => vehicle.plate).join(', ')}
                        </Paragraph>
                      )}
                    </Card>
                  ))}
                </Space>
              )}
            </Card>
          </Col>
        </Row>
      </Space>
    </AdminLayout>
  );
}

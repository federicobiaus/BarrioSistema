'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import Link from 'next/link';
import api from '@/src/lib/api';
import PersonEditorModal from '@/src/components/people/PersonEditorModal';
import PersonTable from '@/src/components/people/PersonTable';
import AdminLayout from '@/src/components/AdminLayout';

const { Title } = Typography;

export default function PeoplePage() {
  const [people, setPeople] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get('/people');
    setPeople(res.data);
  };

  const handleEdit = (person: any) => {
    setSelectedPerson(person);
  };

  const handleDelete = async (person: any) => {
    const confirmed = window.confirm(`¿Eliminar a ${person.firstName} ${person.lastName}?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await api.delete(`/people/${person.id}`);
      await load();
      alert('Persona eliminada');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Error al eliminar la persona');
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = (updatedPerson: any) => {
    setPeople((current) =>
      current.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)),
    );
  };

  return (
    <AdminLayout>
      <Space direction="vertical" size="large" style={{ width: '100%', padding: 24 }}>
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Personas
            </Title>
          </Col>
          <Col>
            <Link href="/people/new">
              <Button type="primary">Nueva persona</Button>
            </Link>
          </Col>
        </Row>

        <Card>
          <PersonTable people={people} onEdit={handleEdit} onDelete={handleDelete} />
        </Card>
      </Space>

      {selectedPerson && (
        <PersonEditorModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onSaved={handleSaved}
        />
      )}
    </AdminLayout>
  );
}
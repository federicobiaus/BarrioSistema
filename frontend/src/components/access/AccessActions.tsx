import { useState, type ChangeEvent } from 'react';
import { Button, Card, Input, message, Space, Typography } from 'antd';
import api from '@/src/lib/api';

const { Text } = Typography;

export default function AccessActions({
  result,
  onReset,
}: {
  result: any;
  onReset: () => void;
}) {
  const person = result?.person;
  const lastAccess = result?.lastAccess;

  const isVisitor = person?.type === 'VISITOR';

  const [visitedLot, setVisitedLot] = useState('');
  const [visitedBlock, setVisitedBlock] = useState('');

  const entry = async () => {
    const payload: any = {
      type: 'ENTRY',
      visitorType: person?.type || 'VISITOR',
      ownerId: person.id,
      lastName: person.lastName,
      dni: person.dni,
    };

    if (isVisitor) {
      if (!visitedLot || !visitedBlock) {
        alert('Para visitas, ingresa lote y manzana');
        return;
      }
      payload.visitedLot = visitedLot;
      payload.visitedBlock = visitedBlock;
    }

    await api.post('/access', payload);

    alert('Ingreso registrado');
    onReset();
    setVisitedLot('');
    setVisitedBlock('');
  };

  const exit = async () => {
    if (!lastAccess?.id) {
      alert('No hay registro de acceso para egresar');
      return;
    }

    await api.patch(`/access/${lastAccess.id}/exit`);

    alert('Egreso registrado');
    onReset();
  };

  return (
    <Card title='Registrar movimiento'>
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {isVisitor && (
        <Card type="inner" title="Información de visita">
          <Text type="secondary">
            Ingresa el lote y manzana del propietario que visita:
          </Text>

          <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
            <Input
              value={visitedLot}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setVisitedLot(e.target.value)}
              placeholder="Lote"
            />
            <Input
              value={visitedBlock}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setVisitedBlock(e.target.value)}
              placeholder="Manzana"
            />
          </Space>
        </Card>
      )}

      <Space size="middle" style={{ width: '100%' }}>
        <Button type="primary" onClick={entry} block>
          Ingresar
        </Button>
        <Button danger onClick={exit} block>
          Egresar
        </Button>
      </Space>
    </Space>
    </Card>
  );
}
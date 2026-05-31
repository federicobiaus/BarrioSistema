'use client';

import { Card, Col, Descriptions, Divider, Image, Row, Space, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

export default function AccessResult({
  data,
}: {
  data: any;
}) {
  const person = data?.person;
  const lastAccess = data?.lastAccess;
  const isVisitor = person?.type === 'VISITOR';
  const isOwner = person?.type === 'OWNER';

  if (!person) {
    return (
      <Card>
        <Text type="secondary">
          Buscá una persona por DNI o nombre para ver su información
        </Text>
      </Card>
    );
  }

  return (
    <Card title="Ficha de acceso">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8}>
            <Card variant='borderless' styles={{ body: { padding: 0 } }}>
              <Image
                src={person.photoUrl || '/no-photo.png'}
                alt="Foto"
                style={{ borderRadius: 16, objectFit: 'cover', width: '100%', minHeight: 200 }}
                preview={false}
                fallback="/no-photo.png"
              />
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Title level={4}>{`${person.firstName} ${person.lastName}`}</Title>
                <Text type="secondary">DNI: {person.dni}</Text>
                <br />
                <Text type="secondary">Tipo: {person.type}</Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space size="middle">
                <div>
                  <Text type="secondary">Estado</Text>
                  <div>
                    <Tag color={person.isInside ? 'success' : 'error'}>
                      {person.isInside ? 'DENTRO' : 'FUERA'}
                    </Tag>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Bloqueado</Text>
                  <div>
                    <Tag color={person.isBlocked ? 'error' : 'success'}>
                      {person.isBlocked ? 'SI' : 'NO'}
                    </Tag>
                  </div>
                </div>
              </Space>

              <Card type="inner" title="Contacto" size="small">
                <Space direction="vertical" size="small">
                  {person.phone ? (
                    <Text>Teléfono: {person.phone}</Text>
                  ) : null}
                  {person.email ? (
                    <Text>Correo: {person.email}</Text>
                  ) : null}
                  {!person.phone && !person.email && (
                    <Text type="secondary">No disponible</Text>
                  )}
                </Space>
              </Card>

              {isOwner && (
                <Card type="inner" title="Ubicación" size="small">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text type="secondary">Lote</Text>
                      <br />
                      <Text strong>{person.lot || '-'}</Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Manzana</Text>
                      <br />
                      <Text strong>{person.block || '-'}</Text>
                    </Col>
                  </Row>
                </Card>
              )}
            </Space>
          </Col>
        </Row>

        <Divider />
       {/*
        <Descriptions column={1} bordered size="small" layout="vertical">
          <Descriptions.Item label="Nombre completo">{`${person.firstName} ${person.lastName}`}</Descriptions.Item>
          <Descriptions.Item label="DNI">{person.dni}</Descriptions.Item>
          <Descriptions.Item label="Tipo">{person.type}</Descriptions.Item>
          <Descriptions.Item label="Estado actual">{person.isInside ? 'DENTRO' : 'FUERA'}</Descriptions.Item>
          <Descriptions.Item label="Último acceso">{lastAccess ? lastAccess.type : 'Sin registros'}</Descriptions.Item>
          <Descriptions.Item label="Fecha último acceso">
            {lastAccess
              ? new Date(lastAccess.createdAt).toLocaleString()
              : 'Sin registros'}
          </Descriptions.Item>
        </Descriptions>
      */}
        {isVisitor && lastAccess && (
          <Card type="inner" title="Último acceso (visita)" size="small">
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Lote visitado</Text>
                <br />
                <Text strong>{lastAccess.visitedLot || '-'}</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary">Manzana visitada</Text>
                <br />
                <Text strong>{lastAccess.visitedBlock || '-'}</Text>
              </Col>
            </Row>
          </Card>
        )}

        {lastAccess?.vehiclePlate && (
          <Card type="inner" title="Vehículo (último acceso)" size="small">
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Patente</Text>
                <br />
                <Text strong>{lastAccess.vehiclePlate}</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary">Otros datos</Text>
                <br />
                <Text>
                  {person.vehicles
                    ?.filter((v: any) => v.plate === lastAccess.vehiclePlate)
                    .map((v: any) => `${v.brand || 'N/A'} ${v.model || 'N/A'}`)
                    .join(', ') || 'N/A'}
                </Text>
              </Col>
            </Row>
          </Card>
        )}

        {person.vehicles?.length > 0 && (
          <Card type="inner" title="Vehículos registrados" size="small">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {person.vehicles.map((v: any) => (
                <Card key={v.id} size="small" type="inner">
                  <Text strong>{v.plate}</Text>
                  <br />
                  <Text type="secondary">
                    {v.brand} {v.model} {v.color ? `- ${v.color}` : ''}
                  </Text>
                </Card>
              ))}
            </Space>
          </Card>
        )}
      </Space>
    </Card>
  );
}

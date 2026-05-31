'use client';

import { useState } from 'react';
import { Card, Col, Row, Space, Typography } from 'antd';
import AdminLayout from '@/src/components/AdminLayout';
import AccessSearch from '@/src/components/access/AccessSearch';
import AccessResult from '@/src/components/access/AccessResult';
import AccessActions from '@/src/components/access/AccessActions';

const { Title, Text } = Typography;

export default function AccessPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <AdminLayout>
      <div style={{ padding: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>Control de Acceso - Guardia</Title>
            <Text type="secondary">Busca por DNI o nombre para controlar accesos</Text>
          </div>

          <Card>
            <AccessSearch onResult={setResult} />
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <AccessResult data={result} />
            </Col>
            <Col xs={24} lg={8}>
              {result?.person && (
                
                  <AccessActions result={result} onReset={() => setResult(null)} />
                
              )}
            </Col>
          </Row>
        </Space>
      </div>
    </AdminLayout>
  );
}
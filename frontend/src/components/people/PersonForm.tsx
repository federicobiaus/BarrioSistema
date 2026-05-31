'use client';

import { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Space, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '@/src/lib/api';
import { useAuth } from '@/src/context/AuthContext';
import WebcamCapture from '@/src/components/WebcamCapture';

const { Title } = Typography;
const { Option } = Select;

const initialForm = {
  firstName: '',
  lastName: '',
  dni: '',
  type: 'OWNER',
  phone: '',
  email: '',
  lot: '',
  block: '',
  plate: '',
  brand: '',
  model: '',
  color: '',
};

export default function PersonForm() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const isOwner = form.type === 'OWNER';
  const isVisitorOrProvider = form.type === 'VISITOR' || form.type === 'PROVIDER';

  const submit = async () => {
    if (!form.firstName || !form.lastName || !form.dni) {
      alert('Completa nombre, apellido y DNI.');
      return;
    }

    if (isOwner && (!form.email || !form.lot || !form.block)) {
      alert('Propietarios requieren email, lote y manzana.');
      return;
    }

    if (isVisitorOrProvider && !form.plate) {
      alert('Visitas y proveedores requieren patente del vehículo.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('dni', form.dni);
    formData.append('type', form.type);

    if (form.phone) formData.append('phone', form.phone);
    if (form.email) formData.append('email', form.email);
    if (form.lot) formData.append('lot', form.lot);
    if (form.block) formData.append('block', form.block);
    if (form.plate) formData.append('plate', form.plate);
    if (form.brand) formData.append('brand', form.brand);
    if (form.model) formData.append('model', form.model);
    if (form.color) formData.append('color', form.color);
    if (file) formData.append('photo', file);

    try {
      setLoading(true);
      await api.post('/people', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Persona creada');
      setForm(initialForm);
      setFile(null);
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Error al crear la persona');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={submit}>
      <Card title="Tipo de persona" className="mb-6">
        <Form.Item label="Tipo" required>
          <Select
            value={form.type}
            onChange={(value) => setForm({ ...form, type: value })}
          >
            <Option value="OWNER">Propietario</Option>
            <Option value="VISITOR">Visita</Option>
            <Option value="PROVIDER">Proveedor</Option>
            <Option value="GUARD">Guardia</Option>
          </Select>
        </Form.Item>
      </Card>

      <Card title="Información del contacto" className="mb-6">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nombre" required>
              <Input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Apellido" required>
              <Input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="DNI" required>
              <Input
                value={form.dni}
                onChange={(e) => setForm({ ...form, dni: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Teléfono">
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>

        {isOwner && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Lote" required>
                <Input
                  value={form.lot}
                  onChange={(e) => setForm({ ...form, lot: e.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Manzana" required>
                <Input
                  value={form.block}
                  onChange={(e) => setForm({ ...form, block: e.target.value })}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Card>

      {isVisitorOrProvider && (
        <Card title="Información del vehículo" className="mb-6">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Patente" required>
                <Input
                  value={form.plate}
                  onChange={(e) => setForm({ ...form, plate: e.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Modelo">
                <Input
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Marca">
                <Input
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Color">
                <Input
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      )}

      <Card title="Foto de perfil" className="mb-6">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Upload
            beforeUpload={(uploadedFile) => {
              setFile(uploadedFile);
              return false;
            }}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Seleccionar foto</Button>
          </Upload>

          <WebcamCapture onCapture={setFile} />

          {file && (
            <div>
              <Title level={5}>Foto seleccionada</Title>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ maxWidth: '180px', borderRadius: 12, border: '1px solid #e8e8e8' }}
              />
            </div>
          )}
        </Space>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {loading ? 'Creando...' : 'Crear persona'}
        </Button>
      </Form.Item>
    </Form>
  );
}

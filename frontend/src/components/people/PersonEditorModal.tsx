'use client';

import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '@/src/lib/api';

const { Option } = Select;
const { Text, Title } = Typography;

export default function PersonEditorModal({
  person,
  onClose,
  onSaved,
}: {
  person: any;
  onClose: () => void;
  onSaved: (updated: any) => void;
}) {
  const [firstName, setFirstName] = useState(person.firstName || '');
  const [lastName, setLastName] = useState(person.lastName || '');
  const [dni, setDni] = useState(person.dni || '');
  const [type, setType] = useState(person.type || 'OWNER');
  const [phone, setPhone] = useState(person.phone || '');
  const [email, setEmail] = useState(person.email || '');
  const [lot, setLot] = useState(person.lot || '');
  const [block, setBlock] = useState(person.block || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState(person.photoUrl || '/no-photo.png');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstName(person.firstName || '');
    setLastName(person.lastName || '');
    setDni(person.dni || '');
    setType(person.type || 'OWNER');
    setPhone(person.phone || '');
    setEmail(person.email || '');
    setLot(person.lot || '');
    setBlock(person.block || '');
    setPhotoPreview(person.photoUrl || '/no-photo.png');
    setPhotoFile(null);
  }, [person]);

  const handleUpload = (file: File) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    return false;
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !dni) {
      alert('Completa nombre, apellido y DNI.');
      return;
    }

    if (type === 'OWNER' && (!lot || !block)) {
      alert('Propietarios requieren lote y manzana.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dni', dni);
    formData.append('type', type);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('lot', lot);
    formData.append('block', block);

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      setLoading(true);
      const response = await api.patch(`/people/${person.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSaved(response.data);
      onClose();
      alert('Persona actualizada');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Error al actualizar la persona');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar persona"
      open
      onCancel={onClose}
      footer={null}
      width={820}
      centered
      destroyOnClose
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>Editar persona</Title>
          <Text type="secondary">Modifica los datos y actualiza la foto si lo deseas.</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Nombre" required>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Apellido" required>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="DNI" required>
                <Input value={dni} onChange={(e) => setDni(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tipo" required>
                <Select value={type} onChange={(value) => setType(value)}>
                  <Option value="OWNER">Propietario</Option>
                  <Option value="VISITOR">Visita</Option>
                  <Option value="PROVIDER">Proveedor</Option>
                  <Option value="GUARD">Guardia</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Teléfono">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Correo">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Lote" required={type === 'OWNER'}>
                <Input value={lot} onChange={(e) => setLot(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Manzana" required={type === 'OWNER'}>
                <Input value={block} onChange={(e) => setBlock(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} align="middle">
            <Col span={12}>
              <Form.Item label="Foto">
                <Upload
                  beforeUpload={handleUpload}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Seleccionar foto</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{ maxWidth: 180, borderRadius: 16, border: '1px solid #f0f0f0' }}
                />
              </div>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
            <Space>
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Guardar cambios
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
}

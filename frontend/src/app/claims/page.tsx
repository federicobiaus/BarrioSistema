'use client';

import { useEffect, useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, Card, Typography } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';

import AdminLayout from '@/src/components/AdminLayout';
import RoleGuard from '@/src/components/RoleGuard';
import { useAuth } from '@/src/context/AuthContext';
import api from '@/src/lib/api';

const { TextArea } = Input;
const { Title } = Typography;

interface ClaimComment {
  id: string;
  content: string;
  author: {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  };
  createdAt: string;
}

interface ClaimItem {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  person?: {
    firstName?: string;
    lastName?: string;
    lot?: string;
    block?: string;
  };
  comments?: ClaimComment[];
}

export default function ClaimsPage() {
  const { user } = useAuth();
  const [claims, setClaims] = useState<ClaimItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem | null>(null);
  const [form] = Form.useForm();
  const [commentForm] = Form.useForm();

  const isAdminOrGuard = useMemo(
    () => user?.role === 'ADMIN' || user?.role === 'GUARD',
    [user],
  );

  const loadClaims = async () => {
    setLoading(true);
    try {
      const url = isAdminOrGuard ? '/claims/open' : '/claims/my';
      const response = await api.get(url);
      setClaims(response.data || []);
    } catch (error) {
      message.error('No se pudieron cargar los reclamos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadClaims();
    }
  }, [user, isAdminOrGuard]);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await api.post('/claims', values);
      message.success('Reclamo creado correctamente');
      form.resetFields();
      setIsCreateModalOpen(false);
      loadClaims();
    } catch (error) {
      message.error('No se pudo crear el reclamo');
    }
  };

  const handleStatusChange = async (claimId: string, status: string) => {
    try {
      await api.patch(`/claims/${claimId}/close`, { status });
      message.success('Estado actualizado');
      loadClaims();
    } catch (error) {
      message.error('No se pudo actualizar el estado');
    }
  };

  const handleShowComments = (claim: ClaimItem) => {
    setSelectedClaim(claim);
    setIsCommentsModalOpen(true);
  };

  const handleAddComment = async () => {
    try {
      const values = await commentForm.validateFields();
      if (!selectedClaim) {
        return;
      }
      await api.post(`/claims/${selectedClaim.id}/comments`, values);
      message.success('Comentario agregado');
      commentForm.resetFields();
      setIsCommentsModalOpen(false);
      loadClaims();
    } catch (error) {
      message.error('No se pudo agregar el comentario');
    }
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => <span>{value}</span>,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: 'Residente',
      dataIndex: 'person',
      key: 'person',
      render: (person: ClaimItem['person']) =>
        person ? `${person.firstName || ''} ${person.lastName || ''}`.trim() : 'N/A',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: ClaimItem) => (
        <Space wrap>
          <Button
            icon={<CommentOutlined />}
            onClick={() => handleShowComments(record)}
          >
            Comentarios
          </Button>
          {isAdminOrGuard && (
            <Select
              defaultValue={record.status}
              style={{ width: 180 }}
              onChange={(value) => handleStatusChange(record.id, value)}
              options={[
                { label: 'OPEN', value: 'OPEN' },
                { label: 'IN_PROGRESS', value: 'IN_PROGRESS' },
                { label: 'CLOSED', value: 'CLOSED' },
              ]}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <RoleGuard allowedRoles={['ADMIN', 'GUARD', 'USER', 'OWNER']}>
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3}>Registro de reclamos</Title>
            <Space wrap>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>
                Nuevo reclamo
              </Button>
            </Space>
          </Space>
        </Card>

        <Card>
          <Table
            rowKey="id"
            loading={loading}
            dataSource={claims}
            columns={columns}
          />
        </Card>

        <Modal
          title="Nuevo reclamo"
          open={isCreateModalOpen}
          onOk={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          okText="Guardar"
          cancelText="Cancelar"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: 'Ingrese un título' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: 'Ingrese una descripción' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={selectedClaim ? `Comentarios para ${selectedClaim.title}` : 'Comentarios'}
          open={isCommentsModalOpen}
          onOk={handleAddComment}
          onCancel={() => {
            setIsCommentsModalOpen(false);
            commentForm.resetFields();
          }}
          okText="Agregar comentario"
          cancelText="Cerrar"
        >
          <Form form={commentForm} layout="vertical">
            <Form.Item
              label="Comentario"
              name="content"
              rules={[{ required: true, message: 'Escribe un comentario' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
          {selectedClaim?.comments?.length ? (
            <div style={{ marginTop: 16 }}>
              <Title level={5}>Comentarios existentes</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                {selectedClaim.comments.map((comment) => (
                  <Card key={comment.id} size="small">
                    <p>{comment.content}</p>
                    <p style={{ marginBottom: 0, color: '#888' }}>
                      {comment.author?.firstName || comment.author?.id}{comment.author?.lastName ? ` ${comment.author.lastName}` : ''} · {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </Card>
                ))}
              </Space>
            </div>
          ) : (
            <p style={{ marginTop: 16 }}>Aún no hay comentarios.</p>
          )}
        </Modal>
      </RoleGuard>
    </AdminLayout>
  );
}

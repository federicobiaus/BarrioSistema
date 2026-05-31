import { Avatar, Button, Space, Table, Tag, Typography } from 'antd';

export default function PersonTable({
  people,
  onEdit,
  onDelete,
}: {
  people: any[];
  onEdit: (person: any) => void;
  onDelete: (person: any) => void;
}) {
  const columns = [
    {
      title: 'Perfil',
      dataIndex: 'firstName',
      key: 'profile',
      render: (_: any, record: any) => (
        <Space align="center">
          <Avatar shape="square" size={48} src={record.photoUrl || '/no-photo.png'} />
          <div>
            <Typography.Text strong>{`${record.firstName} ${record.lastName}`}</Typography.Text>
            <div>
              <Typography.Text type="secondary">{record.type}</Typography.Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contacto',
      dataIndex: 'dni',
      key: 'contact',
      render: (_: any, record: any) => (
        <div>
          <Typography.Text strong>{record.dni}</Typography.Text>
          <div>
            <Typography.Text type="secondary">{record.email || 'Sin email'}</Typography.Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Ubicación',
      key: 'location',
      render: (_: any, record: any) => (
        <div>
          <div>{record.lot || '-'}</div>
          <Typography.Text type="secondary">{record.block || '-'}</Typography.Text>
        </div>
      ),
    },
    {
      title: 'Infracciones',
      key: 'claims',
      render: (_: any, record: any) => <Tag color="red">{record._count?.claims ?? 0}</Tag>,
    },
    {
      title: 'Vehículo',
      key: 'vehicle',
      render: (_: any, record: any) => record.vehicles?.[0]?.plate || 'Sin vehículo',
    },
    {
      title: 'Estado',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record.isBlocked ? 'error' : 'success'}>
          {record.isBlocked ? 'Bloqueado' : 'Activo'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" type="default" onClick={() => onEdit(record)}>
            Editar
          </Button>
          <Button size="small" danger onClick={() => onDelete(record)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={people} rowKey="id" pagination={false} bordered />;
}

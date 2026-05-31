'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Space } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider, Content, Header } = Layout;
const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'Accesos',
    href: '/access',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'Registro',
    href: '/people',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'Reservas',
    href: '/reservations',
    roles: ['ADMIN', 'USER', 'OWNER'],
  },
  {
    label: 'Reclamos',
    href: '/claims',
    roles: ['ADMIN', 'GUARD', 'USER', 'OWNER'],
  },
  {
    label: 'Faltas',
    href: '/infractions',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'Usuarios',
    href: '/users',
    roles: ['ADMIN'],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sidebarCollapsed');
      if (stored !== null) setCollapsed(stored === 'true');
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem('sidebarCollapsed', String(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const items = menuItems
    .filter((item) => (user?.role ? item.roles.includes(user.role) : false))
    .map((item) => ({
      key: item.href,
      label: (
        <Link href={item.href} passHref>
          {item.label}
        </Link>
      ),
    }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        collapsedWidth={80}
        width={260}
        style={{ background: '#001529' }}
      >
        <div style={{ padding: 24, color: '#fff' }}>
          <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
            Sistema Barrio
          </Typography.Title>
          <Typography.Text style={{ color: 'rgba(255,255,255,0.75)' }}>
            Gestión de Accesos
          </Typography.Text>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={items}
          style={{ borderRight: 0, background: '#001529' }}
        />

        <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 'auto' }}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.85)' }}>
              {user?.email}
            </Typography.Text>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.55)' }}>
              {user?.role}
            </Typography.Text>
            <Button type="primary" danger block icon={<LogoutOutlined />} onClick={logout}>
              Cerrar sesión
            </Button>
          </Space>
        </div>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button type="text" onClick={toggleCollapsed} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
          <div style={{ flex: 1 }} />
        </Header>
        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
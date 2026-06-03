'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Space, Tooltip, Avatar } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UnlockOutlined,
  IdcardOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;
const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    roles: ['ADMIN', 'USER'],
    icon: <DashboardOutlined />,
  },
  {
    label: 'Accesos',
    href: '/access',
    roles: ['ADMIN', 'USER'],
    icon: <UnlockOutlined />,
  },
  {
    label: 'Registro',
    href: '/people',
    roles: ['ADMIN', 'USER'],
    icon: <IdcardOutlined />,
  },
  {
    label: 'Reservas',
    href: '/reservations',
    roles: ['ADMIN', 'USER', 'OWNER'],
    icon: <CalendarOutlined />,
  },
  {
    label: 'Reclamos',
    href: '/claims',
    roles: ['ADMIN', 'GUARD', 'USER', 'OWNER'],
    icon: <FileTextOutlined />,
  },/*
  {
    label: 'Faltas',
    href: '/infractions',
    roles: ['ADMIN', 'USER'],
    icon: <ExclamationCircleOutlined />,
  },*/
  {
    label: 'Usuarios',
    href: '/users',
    roles: ['ADMIN'],
    icon: <TeamOutlined />,
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
      icon: item.icon,
    }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        collapsedWidth={80}
        width={250}
        style={{ background: '#001529' }}
      >
        <div style={{ padding: 24, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          {collapsed ? (
            <Tooltip title="Sistema Barrio - Gestión de Accesos">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TeamOutlined style={{ fontSize: 22, color: '#fff' }} />
              </div>
            </Tooltip>
          ) : (
            <div>
              <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                Sistema Barrio
              </Typography.Title>
              <Typography.Text style={{ color: 'rgba(255,255,255,0.75)' }}>
                Gestión de Accesos
              </Typography.Text>
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[pathname]}
          items={items}
          style={{ borderRight: 0, background: '#001529', whiteSpace: 'nowrap', overflow: 'hidden' }}
        />

        <div
          style={{ padding: 18, borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 'auto' }}
        >
          {collapsed ? (
            <Button type="text" icon={<LogoutOutlined />} onClick={logout} title="Cerrar sesión" />
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {user?.avatar ? (
                    <Avatar src={user.avatar} size={56} />
                  ) : (
                    <Avatar size={56} style={{ background: '#fff', color: '#001529' }} icon={<TeamOutlined />} />
                  )}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <Typography.Text strong style={{ color: '#fff', display: 'block', lineHeight: 1.2, marginBottom: 4 }}>
                    {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : 'Usuario'}
                  </Typography.Text>
                  <Typography.Text style={{ color: 'rgba(255,255,255,0.75)', display: 'block', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.email}
                  </Typography.Text>
                  <Typography.Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>
                    {user?.role == 'ADMIN' ? 'Administrador' : user?.role == 'OWNER' ? 'Residente' : 'Usuario'}
                  </Typography.Text>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <Link href="/profile" passHref>
                  <Button type="default" style={{ borderRadius: 10, height: 42, width: '100%' }}>
                    Ver perfil
                  </Button>
                </Link>
                <Button type="primary" danger style={{ borderRadius: 10, height: 42, width: '100%' }} icon={<LogoutOutlined />} onClick={logout}>
                  Cerrar sesión
                </Button>
              </div>
            </div>
          )}
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
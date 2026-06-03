'use client';
import { Button, Typography, Card } from 'antd';
import Link from 'next/link';
const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
        padding: 24,
      }}
    >
      <Card style={{ width: '100%', maxWidth: 960, borderRadius: 20, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center' }}>
          <Title>Bienvenido a Barrio Sistema</Title>
          <Paragraph type="secondary">Usa el menú para navegar.</Paragraph>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
            <Link href="/login" passHref>
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

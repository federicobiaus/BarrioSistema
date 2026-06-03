import './globals.css';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import { AuthProvider } from '@/src/context/AuthContext';
import ProtectedRoute from '@/src/components/ProtectedRoute';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 14,
              fontFamily: 'Arial, Helvetica, sans-serif',
            },
          }}
        >
          <AuthProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
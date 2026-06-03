import './globals.css';
import 'antd/dist/reset.css';
import { ConfigProvider, theme } from 'antd';
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
        <ConfigProvider theme={{theme}}>
          <AuthProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
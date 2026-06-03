import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";

import MainLayout from "@/components/layout/MainLayout";
import theme from "@/styles/theme";

export const metadata: Metadata = {
  title: "Asociación Solares del Valle",
  description: "Naturaleza, comunidad y calidad de vida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ConfigProvider locale={esES} theme={theme}>
          <MainLayout>{children}</MainLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
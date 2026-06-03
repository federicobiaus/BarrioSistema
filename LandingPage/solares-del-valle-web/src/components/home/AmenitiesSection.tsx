"use client";

import { Card, Col, Row, Typography } from "antd";
import {
  HomeOutlined,
  SafetyCertificateOutlined,
  WifiOutlined,
  FieldTimeOutlined,
  CarOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const amenities = [
  {
    icon: <SafetyCertificateOutlined style={{ color: "#5F7A57", fontSize: 32 }} />,
    title: "Seguridad 24/7",
    description: "Control de acceso y vigilancia para una vida tranquila dentro del barrio.",
  },
  {
    icon: <HomeOutlined style={{ color: "#5F7A57", fontSize: 32 }} />,
    title: "Infraestructura",
    description: "Calles, alumbrado y servicios listos para tu proyecto.",
  },
  {
    icon: <CarOutlined style={{ color: "#5F7A57", fontSize: 32 }} />,
    title: "Acceso cómodo",
    description: "Ubicación estratégica con acceso rápido a Merlo y al valle.",
  },
  {
    icon: <WifiOutlined style={{ color: "#5F7A57", fontSize: 32 }} />,
    title: "Conectividad",
    description: "Conexión de datos pensada para familias y trabajo remoto.",
  },
  {
    icon: <BorderOuterOutlined style={{ color: "#5F7A57", fontSize: 32 }} />,
    title: "Lotes variados",
    description: "Parcelas de diferentes tamaños para elegir el proyecto ideal.",
  },
  {
    icon: <FieldTimeOutlined style={{ color: "#5F7A57", fontSize: 32 }} />,
    title: "Calidad de vida",
    description: "Respira aire puro en un barrio pensado para la vida familiar.",
  },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" style={{ padding: "80px 5%", background: "#f7f5ef" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Un barrio con servicios pensados para vos
        </Title>
        <Paragraph style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
          Solares del Valle reúne los servicios esenciales y la infraestructura
          necesaria para que tu proyecto se desarrolle con seguridad, diseño y
          crecimiento sostenible.
        </Paragraph>
        <Row gutter={[24, 24]}>
          {amenities.map((item) => (
            <Col xs={24} md={12} lg={8} key={item.title}>
              <Card hoverable style={{ borderRadius: 20, minHeight: 220 }}>
                <div style={{ marginBottom: 24 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ color: "#555" }}>{item.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

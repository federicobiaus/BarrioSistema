"use client";
import { Card, Col, Row } from "antd";
import {
  EnvironmentOutlined,
  SafetyOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const benefits = [
  {
    icon: <EnvironmentOutlined />,
    title: "Entorno Natural",
  },
  {
    icon: <SafetyOutlined />,
    title: "Seguridad",
  },
  {
    icon: <HomeOutlined />,
    title: "Infraestructura",
  },
  {
    icon: <TeamOutlined />,
    title: "Comunidad",
  },
];

export default function BenefitsSection() {
  return (
    <section style={{ padding: "80px 5%" }}>
      <Row gutter={[24, 24]}>
        {benefits.map((item) => (
          <Col xs={24} md={12} lg={6} key={item.title}>
            <Card hoverable>
              <div style={{ fontSize: 40 }}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
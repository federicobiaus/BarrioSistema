"use client";
import { Card, Col, Row, Typography } from "antd";
import {
  HeartOutlined,
  TeamOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const lifestyleItems = [
  {
    icon: <HeartOutlined style={{ fontSize: 30, color: "#244533" }} />,
    title: "Vida al aire libre",
    description: "Espacios verdes y actividades para disfrutar en familia y con amigos.",
  },
  {
    icon: <TeamOutlined style={{ fontSize: 30, color: "#244533" }} />,
    title: "Comunidad activa",
    description: "Un ambiente de vecinos que priorizan el encuentro y la colaboración.",
  },
  {
    icon: <FieldTimeOutlined style={{ fontSize: 30, color: "#244533" }} />,
    title: "Paz y tranquilidad",
    description: "Un barrio con ritmo propio, ideal para descansar y desarrollarse.",
  },
];

export default function LifestyleSection() {
  return (
    <section id="lifestyle" style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Vivir en Solares del Valle
        </Title>
        <Paragraph style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
          El barrio ofrece un estilo de vida que combina seguridad y naturaleza,
          con espacios pensados para que cada día sea más confortable y seguro.
        </Paragraph>
        <Row gutter={[24, 24]}>
          {lifestyleItems.map((item) => (
            <Col xs={24} md={8} key={item.title}>
              <Card
                variant="borderless"
                style={{ borderRadius: 20, minHeight: 260, boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}
              >
                <div style={{ marginBottom: 18 }}>{item.icon}</div>
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

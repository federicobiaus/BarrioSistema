
"use client";

import Link from "next/link";
import { Card, Col, Row, Typography, Button } from "antd";
const { Title, Paragraph } = Typography; 

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "80px 5%", background: "#fff" }}>
      <Row gutter={[32, 32]} align="middle" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Col xs={24} md={12}>
          <div
            style={{
              minHeight: 360,
              borderRadius: 24,
              backgroundImage: "url('/images/seguridad.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 32,
            }}
          >
            <div style={{ background: 'rgba(36,69,51,0.7)', padding: 18, borderRadius: 12 }}>
            <Title level={2} style={{padding: 10, color: "#f3f1e9", margin: 0 }}>Bienvenido a Solares del Valle</Title>
              <Paragraph style={{ fontSize: 15, lineHeight: 1.8, color: '#f3f1e9' }}>
              Un barrio privado pensado para vivir en armonía con la naturaleza,
              donde cada detalle se cuida para que disfrutes de un estilo de vida
              relajado, seguro y conectado con la comunidad.
              </Paragraph>
            <Paragraph  style={{ padding: 10, fontSize: 15, lineHeight: 1.8, color: '#f3f1e9' }}>
              Ubicado en Merlo, San Luis, Solares del Valle combina un entorno
              natural privilegiado con infraestructura moderna y servicios
              destinados a propietarios exigentes.
            </Paragraph>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div
            style={{
              minHeight: 360,
              borderRadius: 24,
              backgroundImage: "url('/images/interior-.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 32,
            }}
          >
            <div style={{ background: 'rgba(36,69,51,0.7)', padding: 18, borderRadius: 12 }}>
              <Title level={3} style={{ color: "#f3f1e9", margin: 0 }}>
                El barrio que crece con vos
              </Title>
              <Paragraph style={{ fontSize: 18, lineHeight: 1.8, color: '#f3f1e9' }}>
                Áreas verdes, seguridad 24/7, red de servicios y un ambiente ideal
                para familias que buscan tranquilidad y calidad de vida en un
                entorno natural.
              </Paragraph>
              <ul style={{ marginTop: 12, gap: 12, display: "grid", color: '#f3f1e9' }}>
                <li>Calles internas pavimentadas</li>
                <li>Áreas comunes y parques</li>
                <li>Red de gas natural y agua potable</li>
                <li>Conectividad y visión a futuro</li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}

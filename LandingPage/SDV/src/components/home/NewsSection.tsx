"use client";

import { Card, Col, Row, Typography, Button } from "antd";
import Image from "next/image";

const { Title, Paragraph } = Typography;

const posts = [
  {
    title: "Información importante",
    img: "/images/expensas.jpg",
    excerpt: "Documentación y novedades relevantes para propietarios.",
    href: "https://asociacionsolaresdelvalle.ar/informacion-importante/",
  },
  {
    title: "Situación Servicio de Agua",
    img: "/images/costos02.jpg",
    excerpt: "Últimas novedades sobre el servicio de agua en el barrio.",
    href: "https://asociacionsolaresdelvalle.ar/situacion-servicio-agua/",
  },
  {
    title: "Asamblea 2025",
    img: "/images/corte.jpg",
    excerpt: "Asamblea Solares del Valle - Convocatoria y materiales. \n ",
    href: "https://asociacionsolaresdelvalle.ar/asamblea-solares/",
  },
];

export default function NewsSection() {
  return (
    <section id="news" style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Novedades
        </Title>
        <Paragraph style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
          Últimas noticias y comunicados de la Asociación.
        </Paragraph>

        <Row gutter={[24, 24]}>
          {posts.map((p) => (
            <Col xs={24} md={8} key={p.title}>
              <Card hoverable cover={<div style={{ position: 'relative', width: '100%', height: 180 }}><Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} /></div>}>
                <h3>{p.title}</h3>
                <p style={{ color: '#555' }}>{p.excerpt}</p>
                <Button type="link" href={p.href} target="_blank">
                  Leer más
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

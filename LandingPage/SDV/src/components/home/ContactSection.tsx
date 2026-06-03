"use client";

import Link from "next/link";
import { Card, Col, Row, Typography, Button } from "antd";
const { Title, Paragraph } = Typography;

export default function ContactSection() {
    return (
        <section
            id="contact"
            style={{
                padding: "80px 5%",
                backgroundImage: "url('/images/fondo-header.png')",
                backgroundSize: 'auto',
                
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", background: 'rgba(255,255,255,0.92)', borderRadius: 32, padding: '40px 32px' }}>
                <Title level={2} style={{ textAlign: "center" }}>
                    Contacto y acceso para propietarios
                </Title>
                <Paragraph style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
                    Si querés recibir más información sobre lotes, servicios y cómo
                    formar parte de Solares del Valle, escribinos o solicitá una reunión.
                </Paragraph>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <div style={{ padding: 32, borderRadius: 24, background: "#f9f7f1" }}>
                            <Title level={4}>Contacto</Title>
                            <Paragraph style={{ color: "#555" }}>
                                Email: <a href="mailto:contacto@asociacionsolaresdelvalle.ar">contacto@asociacionsolaresdelvalle.ar</a>
                            </Paragraph>
                            <Paragraph style={{ color: "#555" }}>
                                Teléfono: <a href="tel:+540000000000">(000) 000-0000</a>
                            </Paragraph>
                            <Paragraph style={{ color: "#555" }}>
                                Dirección: Merlo, San Luis.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ padding: 10, borderRadius: 24, background: "rgba(249, 247, 241, 0.9)" }}>
                            <div style={{
                                // 0.5 representa el 50% de opacidad. Podés bajarlo a 0.3 o subirlo a 0.8 según necesites.
                                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/images/fondo-header.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: 1,
                                color: '#fff',
                                minHeight: 180
                            }}>
                                <Title level={4}>
                                    Acceso exclusivos
                                </Title>
                                <Paragraph>
                                    Los propietarios deben ingresar a través del sistema de acceso
                                    seguro para gestionar documentación, reservas y trámites internos.
                                </Paragraph>
                            </div>
                            <div style={{ padding: 10, display: 'flex', justifyContent: 'center', background: '#f9f7f1' }}>
                                <Link href="https://barrio-sistema.vercel.app/login" passHref>
                                    <Button type="default" size="large">
                                        Ingresar propietarios
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

"use client";

import { Button, Col, Row, Typography } from "antd";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function PlanSection() {
    return (
        <section id="plan" style={{ padding: "80px 5%", background: "linear-gradient(180deg, #f7f5ef 0%, #fff 100%)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Row gutter={[32, 32]} align="middle">
                    <Col xs={24} md={12}>
                        <div
                            style={{
                                minHeight: 360,
                                borderRadius: 24,
                                backgroundImage: "url('/images/blocks-03.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: 24,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                boxShadow: "0 14px 35px rgba(0,0,0,0.08)",
                            }}
                        >
                            <div style={{ background: 'rgba(255,255,255,0.92)', padding: 18, borderRadius: 12 }}>
                                <Title level={3}>Plano y disponibilidad de lotes</Title>
                                <Paragraph style={{ color: "#555" }}>
                                    Conocé los sectores del barrio y consultá las opciones de lotes
                                    disponibles. Ideal para comenzar tu proyecto en un entorno seguro
                                    y con servicios premium.
                                </Paragraph>
                                <Paragraph>
                                    Lotes residenciales con distintos tamaños, planos configurados y
                                    una propuesta de desarrollo que mantiene la armonía del paisaje.
                                </Paragraph>
                                <Link href="#contact">
                                    <Button
                                        type="default"
                                        size="large"
                                        style={{
                                            background: "#fff",
                                            color: "#244533",
                                            borderColor: "#244533",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Consultar lotes
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div
                            style={{
                                minHeight: 360,
                                borderRadius: 24,
                                backgroundImage: "url('/images/blocks-03.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: 24,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                boxShadow: "0 14px 35px rgba(0,0,0,0.08)",
                            }}
                        >
                            <div style={{ background: 'rgba(255,255,255,0.92)', padding: 18, borderRadius: 12 }}>
                                <span style={{ color: "#244533", fontWeight: 700, marginBottom: 16 }}>
                                    Futura expansión
                                </span>
                                <Title level={3}>Lotes preparados para crecer</Title>
                                <Paragraph style={{ color: "#555" }}>
                                    Diseñamos el barrio con sectores verdes, anchos espacios de
                                    circulación y un plan de desarrollo que respeta el entorno natural.
                                </Paragraph>
                                <ul style={{ marginTop: 16, gap: 8, display: "grid" }}>
                                    <li>Parcelas amplias</li>
                                    <li>Parques internos</li>
                                    <li>Servicios subterráneos</li>
                                    <li>Flexibilidad de proyecto</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

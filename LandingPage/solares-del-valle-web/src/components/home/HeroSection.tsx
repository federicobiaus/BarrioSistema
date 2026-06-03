"use client";

import { Button, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function HeroSection() {
    return (
        <section
            style={{
                position: 'relative',
                minHeight: "90vh",
                display: "flex",
                alignItems: "center",
                padding: "0 5%",
                backgroundImage: "url('/images/back-hero.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >

            <div
                style={{
                    position: 'absolute',
                    right: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 760,
                    minHeight: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 24,
                    padding: 28,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
                }}
            >
                <div style={{ maxWidth: 720, padding: 40, borderRadius: 12 }}>
                    <Title style={{ marginBottom: 24, color: "#244533" }}>
                        Solares del Valle
                    </Title>
                    <Paragraph style={{ fontSize: 20, lineHeight: 1.8, maxWidth: 620 }}>
                        Un barrio privado en Merlo diseñado para disfrutar el paisaje, la
                        tranquilidad y la seguridad mientras crece como comunidad.
                    </Paragraph>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 32 }}>
                        <Link href="#about">
                            <Button type="primary" size="large">
                                Conocer más
                            </Button>
                        </Link>
                    </div>
                </div>
                <div style={{ width: 280, height: 280, position: 'relative' }}>
                    <Image
                        src="/images/logo-transparente.png"
                        alt="Solares del Valle"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </section>
    );
}
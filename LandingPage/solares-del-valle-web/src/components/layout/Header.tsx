"use client";

"use client";

import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #e8e8e8",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1800,
          margin: "0 auto",
          padding: "0 24px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 16,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Image src="/images/logo-transparente.png" alt="Solares del Valle" width={180} height={88} priority />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: "inherit", fontWeight: 600 }}>
          <a href="#about" style={{ color: "#333", textDecoration: "none", letterSpacing: 0.5 }}>
            El Barrio
          </a>
          <a href="#amenities" style={{ color: "#333", textDecoration: "none", letterSpacing: 0.5 }}>
            Servicios
          </a>
          <a href="#lifestyle" style={{ color: "#333", textDecoration: "none", letterSpacing: 0.5 }}>
            Vivir aquí
          </a>
          <a href="#plan" style={{ color: "#333", textDecoration: "none", letterSpacing: 0.5 }}>
            Plano
          </a>
          <a href="#contact" style={{ color: "#333", textDecoration: "none", letterSpacing: 0.5 }}>
            Contacto
          </a>
          <Link href="https://barrio-sistema.vercel.app/login" passHref>
            <Button type="primary">Propietarios</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
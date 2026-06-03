import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        minHeight: 160,
        padding: '24px',
        color: '#fff',
        backgroundImage: "url('/images/back-03.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.35)',
      }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
        <Image src="/images/logo-blanco.png" alt="Solares del Valle" width={130} height={68} />
        <div>© {new Date().getFullYear()} Asociación Solares del Valle</div>
      </div>
    </footer>
  );
}
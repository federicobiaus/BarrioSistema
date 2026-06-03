"use client";

import { useState } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";

const points = [
  { id: 1, left: '28%', top: '42%', title: 'Sector A', desc: 'Lotes residenciales.', img: '/images/blocks-03.jpg' },
  { id: 2, left: '62%', top: '30%', title: 'Sector B', desc: 'Parque y áreas comunes.', img: '/images/interior-.jpg' },
  { id: 3, left: '48%', top: '66%', title: 'Acceso', desc: 'Control de acceso y seguridad.', img: '/images/seguridad.png' },
];

export default function PlanInteractive() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null as any);

  function showPoint(p: any) {
    setActive(p);
    setOpen(true);
  }

  return (
    <section id="plan-interactive" style={{ padding: '80px 5%', background: '#f7f5ef' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Plano interactivo</h2>
        <p style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 24px' }}>Haz clic en los puntos para ver información del sector.</p>

        <div style={{ position: 'relative', width: '100%', paddingTop: '56%', borderRadius: 16, overflow: 'hidden' }}>
          <Image src="/images/Pozo-Cavado-Alta-2.jpg" alt="Plano" fill style={{ objectFit: 'cover' }} />

          {points.map((p) => (
            <button key={p.id} onClick={() => showPoint(p)} aria-label={p.title}
              style={{ position: 'absolute', left: p.left, top: p.top, transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: '#244533', border: '2px solid #fff', cursor: 'pointer' }} />
          ))}
        </div>

        <Modal open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} title={active?.title} footer={[<Button key="close" onClick={() => setOpen(false)}>Cerrar</Button>]}> 
          <p>{active?.desc}</p>
          {active?.img && (
            <div style={{ position: 'relative', width: '100%', height: 200 }}>
              <Image src={active.img} alt={active.title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}

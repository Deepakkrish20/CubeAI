import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clientsData, CLIENTS_SECTION_META } from '@/data/clientsData';


/* ─── single client logo wrapper ──────────────────────────────────── */
function ClientLogo({ client }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '280px',
        height: '120px',
        padding: '10px 24px',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <img
        src={client.logo}
        alt={client.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'flex';
        }}
      />

      {/* Fallback label if image fails to load */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <span style={{ color: '#00D09C', fontWeight: 800, fontSize: 16, textTransform: 'uppercase', padding: '0 10px', textAlign: 'center' }}>
          {client.name}
        </span>
      </div>
    </div>
  );
}

/* ─── infinite scroll row ─────────────────────────────────────────── */
function MarqueeRow({ items, speed = 30, reverse = false }) {
  // Duplicate 3× to make loop seamless
  const tripled = [...items, ...items, ...items];
  const duration = (items.length * 320 * 3) / speed; // px per sec (280px width + 40px gap)

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(to right, white, transparent)',
        zIndex: 10, pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(to left, white, transparent)',
        zIndex: 10, pointerEvents: 'none',
      }} />

      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '40px',
          width: 'max-content',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {tripled.map((client, idx) => (
          <ClientLogo key={`${client.id}-${idx}`} client={client} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(calc(-100% / 3)); }
          to   { transform: translateX(0); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ─── main section ────────────────────────────────────────────────── */
function ClientsSection({ data = clientsData, meta = CLIENTS_SECTION_META }) {
  const clients = Array.isArray(data) ? data : [];
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  if (clients.length === 0) return null;

  // Split into two rows
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <section
      id={meta?.id ?? 'clients'}
      style={{ position: 'relative', width: '100%', borderTop: '1px solid rgba(226,232,240,0.6)', padding: '72px 0', background: '#FFFFFF', overflow: 'hidden' }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0, 208, 156,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 208, 156,0.018) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 60%, transparent 100%)',
      }} />

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: -60, left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 208, 156,0.06), transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -60, right: '10%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />

      <div ref={containerRef} style={{ position: 'relative', zIndex: 1 }}>
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 48, padding: '0 24px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 14px', borderRadius: 999,
            background: 'white', border: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            fontSize: 10, fontWeight: 800, letterSpacing: 2,
            textTransform: 'uppercase', color: '#00D09C', marginBottom: 14,
          }}>
            ✦ Trusted By
          </span>
          <h2 style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#0F172A', lineHeight: 1.2, margin: 0,
          }}>
            {meta?.title ?? 'Our Clients'}
          </h2>
          <p style={{ marginTop: 10, fontSize: 14, color: '#64748B', fontWeight: 500 }}>
            Powering EV adoption across India&apos;s top mobility brands
          </p>
        </motion.div>

        {/* ── row 1 — scrolls left ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ marginBottom: 24 }}
        >
          <MarqueeRow items={row1} speed={28} reverse={false} />
        </motion.div>

        {/* ── row 2 — scrolls right ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        >
          <MarqueeRow items={row2} speed={22} reverse={true} />
        </motion.div>
      </div>
    </section>
  );
}

export default ClientsSection;

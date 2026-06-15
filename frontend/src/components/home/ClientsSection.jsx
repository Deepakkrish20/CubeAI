import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { clientsData, CLIENTS_SECTION_META } from '@/data/clientsData';

/* ─── unique accent colour per card ─────────────────────────────── */
const CARD_COLORS = [
  { from: '#00B386', to: '#33DCB0', glow: 'rgba(0, 208, 156,0.35)' },
  { from: '#0F3460', to: '#3B82F6', glow: 'rgba(59,130,246,0.35)' },
  { from: '#B91C1C', to: '#F87171', glow: 'rgba(239,68,68,0.35)'  },
  { from: '#065F46', to: '#34D399', glow: 'rgba(52,211,153,0.35)' },
  { from: '#92400E', to: '#FCD34D', glow: 'rgba(251,191,36,0.35)' },
  { from: '#1E3A5F', to: '#60A5FA', glow: 'rgba(96,165,250,0.35)' },
  { from: '#4A044E', to: '#E879F9', glow: 'rgba(232,121,249,0.35)' },
  { from: '#134E4A', to: '#2DD4BF', glow: 'rgba(45,212,191,0.35)' },
  { from: '#7F1D1D', to: '#FB923C', glow: 'rgba(251,146,60,0.35)'  },
  { from: '#1E1B4B', to: '#818CF8', glow: 'rgba(129,140,248,0.35)' },
  { from: '#14532D', to: '#86EFAC', glow: 'rgba(134,239,172,0.35)' },
  { from: '#831843', to: '#F9A8D4', glow: 'rgba(249,168,212,0.35)' },
  { from: '#27272A', to: '#A1A1AA', glow: 'rgba(161,161,170,0.35)' },
];



/* ─── single client logo card ────────────────────────────────────── */
function ClientCard({ client, colorIdx }) {
  const [hovered, setHovered] = useState(false);
  const color = CARD_COLORS[colorIdx % CARD_COLORS.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '160px',
        height: '120px',
        padding: '18px 20px',
        borderRadius: '20px',
        border: hovered
          ? `1.5px solid ${color.from}55`
          : '1.5px solid rgba(148,163,184,0.2)',
        background: hovered
          ? `linear-gradient(135deg, ${color.from}18, ${color.to}10)`
          : 'rgba(248,250,252,0.5)',
        boxShadow: hovered
          ? `0 0 0 1px ${color.from}33, 0 8px 32px ${color.glow}, inset 0 0 40px ${color.from}0A`
          : '0 2px 12px rgba(0,0,0,0.04)',
        cursor: 'default',
        overflow: 'visible',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >


      {/* ── shimmer ring ── */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.7, 1.5] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            border: `2px solid ${color.to}`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}

      {/* ── logo image ── */}
      <img
        src={client.logo}
        alt={client.name}
        style={{
          width: '100%',
          height: '52px',
          objectFit: 'contain',
          filter: hovered ? 'none' : 'grayscale(60%)',
          opacity: hovered ? 1 : 0.72,
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
          zIndex: 5,
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'flex';
        }}
      />

      {/* ── fallback name tile ── */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '44px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
          zIndex: 5,
          position: 'relative',
        }}
      >
        <span style={{ color: 'white', fontWeight: 900, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', padding: '0 10px', textAlign: 'center' }}>
          {client.name}
        </span>
      </div>

      {/* ── name label ── */}
      <p
        style={{
          marginTop: 8,
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: hovered ? color.from : '#94A3B8',
          transition: 'color 0.3s ease',
          whiteSpace: 'nowrap',
          zIndex: 5,
          position: 'relative',
        }}
      >
        {client.name}
      </p>
    </div>
  );
}

/* ─── infinite scroll row ─────────────────────────────────────────── */
function MarqueeRow({ items, speed = 30, reverse = false }) {
  // Duplicate 3× to make loop seamless
  const tripled = [...items, ...items, ...items];
  const duration = (items.length * 160 * 3) / speed; // px per sec

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
          gap: '16px',
          width: 'max-content',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {tripled.map((client, idx) => (
          <ClientCard key={`${client.id}-${idx}`} client={client} colorIdx={idx % CARD_COLORS.length} />
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
          style={{ marginBottom: 16 }}
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

        {/* ── bottom tag ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: 36, textAlign: 'center',
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase', color: '#CBD5E1',
          }}
        >
          Hover a logo to see the magic ✦
        </motion.p>
      </div>
    </section>
  );
}

export default ClientsSection;

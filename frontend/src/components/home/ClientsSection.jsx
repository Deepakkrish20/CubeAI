import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { clientsData, CLIENTS_SECTION_META } from '@/data/clientsData';

/* ─── 3D Circular Carousel Component ───────────────────────────────── */
function Circular3DCarousel({ items }) {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const animationFrameId = useRef(null);

  // Responsive width tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main animation physics loop
  useEffect(() => {
    let lastFrameTime = performance.now();

    const updatePhysics = (now) => {
      const delta = now - lastFrameTime;
      lastFrameTime = now;

      // Constant auto-rotation speed for a lively flow
      const autoSpeed = 0.00003; // rad per ms
      
      // Add auto-rotation to current angle
      setAngle((prev) => (prev + autoSpeed * delta) % (2 * Math.PI));

      animationFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameId.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const clientCount = items.length;
  const angleStep = (2 * Math.PI) / clientCount;

  // Responsive scaling of layout values
  const isMobile = windowWidth < 768;
  const radiusX = isMobile ? Math.min(240, windowWidth * 0.42) : Math.min(560, windowWidth * 0.38);
  const radiusY = isMobile ? 24 : 48; // drop at the sides
  const radiusZ = isMobile ? 120 : 260; // depth offset
  const logoWidth = isMobile ? 190 : 290;
  const logoHeight = isMobile ? 95 : 145;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '260px' : '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: isMobile ? '800px' : '1500px',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {items.map((client, i) => {
        const itemAngle = angle + i * angleStep;
        const cosA = Math.cos(itemAngle);
        const sinA = Math.sin(itemAngle);

        const tx = sinA * radiusX;
        const ty = (1 - cosA) * radiusY; // Dome shape
        const tz = (cosA - 1) * radiusZ; // Depth push back
        const rotY = -itemAngle * (180 / Math.PI);

        // Opacity math: items at the front (cosA > -0.15) are visible.
        // Fades out to 0 at the sides.
        const opacity = Math.pow(Math.max(0, (cosA + 0.15) / 1.15), 1.6);
        const zIndex = Math.round((cosA + 1) * 100);

        if (opacity <= 0) return null;

        return (
          <div
            key={client.id}
            style={{
              position: 'absolute',
              width: `${logoWidth}px`,
              height: `${logoHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) rotateY(${rotY}deg)`,
              opacity: opacity,
              zIndex: zIndex,
              transition: 'transform 0.1s linear',
              pointerEvents: opacity > 0.35 ? 'auto' : 'none', // Prevent clicking on faded elements
            }}
          >
            <img
              src={client.logo}
              alt={client.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none', // Prevent browser default image dragging
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
              <span style={{ color: '#00D09C', fontWeight: 800, fontSize: isMobile ? 12 : 14, textTransform: 'uppercase', textAlign: 'center' }}>
                {client.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Section Component ───────────────────────────────────────── */
function ClientsSection({ data = clientsData, meta = CLIENTS_SECTION_META }) {
  const clients = Array.isArray(data) ? data : [];
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  if (clients.length === 0) return null;

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
        {/* Header section */}
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

        {/* 3D Circular Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Circular3DCarousel items={clients} />
        </motion.div>
      </div>
    </section>
  );
}

export default ClientsSection;

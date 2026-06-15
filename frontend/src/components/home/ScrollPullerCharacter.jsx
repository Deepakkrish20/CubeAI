import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import mascotImg from '@/assets/cartoon_mascot.png';

function ScrollPullerCharacter() {
  const { scrollYProgress, scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth out scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 15 });

  // Map scroll progress to vertical position (from 90px at top to near the bottom of viewport)
  const mascotY = useTransform(smoothProgress, [0, 1], [90, windowHeight - 140]);

  // Wobble rotation as the mascot slides along the track
  const mascotRotate = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 18, -18, 18, -18, 0]);

  // Subtle scaling effect during motion
  const mascotScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.06, 1]);

  // Hand/Anchor coordinate inside the bubble (centered at x=50 inside the 100px wide track)
  const handX = 50;
  const handY = useTransform(mascotY, (y) => y + 28);

  // Rope endpoint (AboutSection top boundary)
  // Accounts for the content offset translation (35px -> 0px) to ensure perfect alignment.
  const ropeY2 = useTransform(scrollY, (latest) => {
    const offset = latest < 500 ? 35 * (1 - latest / 500) : 0;
    const targetY = windowHeight - latest + offset;
    // Don't let the rope pull above the mascot's current position
    return Math.max(90 + 60, targetY);
  });

  return (
    <div 
      className="absolute top-0 right-[-60px] w-[100px] h-full pointer-events-none"
      style={{ zIndex: 40 }}
    >
      {/* Sticky container that fits the viewport height */}
      <div className="sticky top-0 w-full h-[100vh]">
        {/* 1. The Dynamic Pulling Rope */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow base line */}
          <motion.line
            x1={handX}
            y1={handY}
            x2={0} // Connects exactly to the left edge of the SVG container (the content border)
            y2={ropeY2}
            stroke="#4b5563"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.15"
          />
          {/* Core rope color */}
          <motion.line
            x1={handX}
            y1={handY}
            x2={0}
            y2={ropeY2}
            stroke="#00D09C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glowing highlight inner strand */}
          <motion.line
            x1={handX}
            y1={handY}
            x2={0}
            y2={ropeY2}
            stroke="#06b6d4"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* 2. Vertical Guide Wire */}
        <div 
          className="absolute left-[50px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00D09C] via-[#a855f7] to-[#06b6d4] opacity-25"
        />

        {/* 3. Floating Mascot Capsule */}
        <motion.div
          style={{
            y: mascotY,
            rotate: mascotRotate,
            scale: mascotScale,
          }}
          className="absolute left-[22px] w-14 h-14 rounded-full bg-white border-2 border-[#00D09C]/80 shadow-[0_8px_24px_rgba(0, 208, 156,0.25)] flex items-center justify-center"
        >
          <img
            src={mascotImg}
            alt="Mascot Helper"
            className="w-11 h-11 object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
          
          {/* Pulsing indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#06b6d4]"></span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollPullerCharacter;

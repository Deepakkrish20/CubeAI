import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ASSOCIATIONS = [
  {
    id: 'face',
    name: 'Fintech Association for Consumer Empowerment (FACE)',
    logo: 'https://www.bundelafinance.com/img/c8.png',
    initials: 'FACE',
  },
  {
    id: 'emfai',
    name: 'Electric Mobility Financiers Association of India (EMFAI)',
    logo: 'https://www.bundelafinance.com/img/c9.png',
    initials: 'EMFAI',
  },
  {
    id: 'sa-dhan',
    name: 'Sa-Dhan, Fostering Inclusive Impact Finance',
    logo: 'https://www.bundelafinance.com/img/SA-DHAN.png',
    initials: 'Sa-Dhan',
  },
];

function AssociationsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  return (
    <section id="associations" className="w-full border-t border-gray-150 py-16 bg-gradient-to-b from-white via-slate-50/10 to-white overflow-hidden">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#00D09C] mb-3">
            Association
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-black tracking-[-0.03em] text-gray-900 leading-[1.2]">
            Our Associations
          </h2>
        </motion.header>

        {/* Logos Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 items-center justify-items-center">
          {ASSOCIATIONS.map((assoc, idx) => (
            <motion.div
              key={assoc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.12 }}
              className="group relative flex flex-col items-center justify-center bg-white border border-gray-100 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,208,156,0.22)] hover:border-transparent hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[280px] h-[200px] overflow-hidden cursor-default"
            >
              {/* Dynamic hover background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D09C] to-[#00b084] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                <div className="flex items-center justify-center bg-white/95 rounded-2xl p-2.5 shadow-sm group-hover:bg-white group-hover:scale-105 transition-all duration-300 max-h-[110px] max-w-[200px] select-none">
                  <img
                    src={assoc.logo}
                    alt={assoc.name}
                    className="max-h-[80px] max-w-[160px] object-contain transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback label if image fails to load */}
                  <div className="hidden h-full w-full items-center justify-center">
                    <span className="text-sm font-black text-[#00D09C] uppercase tracking-wide">
                      {assoc.initials}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs font-bold text-gray-500 group-hover:text-white transition-colors duration-300 text-center line-clamp-2 leading-snug">
                  {assoc.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AssociationsSection;

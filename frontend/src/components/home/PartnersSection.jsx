import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { partnersData, PARTNERS_SECTION_META } from '@/data/partnersData';
import { resolvePartners } from '@/utils/partnersUtils';

const UNAVAILABLE_MESSAGE = 'Partner information is currently unavailable.';

function PartnersSection({ data = partnersData, meta = PARTNERS_SECTION_META }) {
  const partners = resolvePartners(data);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  if (partners.length === 0) {
    return (
      <section id={meta?.id ?? 'partners'} className="w-full border-t border-gray-150 py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={meta?.id ?? 'partners'} className="w-full border-t border-gray-150 py-16 bg-white overflow-hidden">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 text-center"
        >
          {meta?.eyebrow && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4C1D95]/60 mb-2 block">
              {meta.eyebrow}
            </span>
          )}
          {meta?.title && (
            <h2 className="font-heading text-xl font-bold tracking-tight text-gray-900 leading-none">
              {meta.title}
            </h2>
          )}
        </motion.header>

        {/* Partners Grid */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner, idx) => (
            <motion.article
              key={partner.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center border border-gray-200/50 rounded-2xl bg-white px-6 py-8 text-center cursor-default hover:border-violet-200 hover:bg-violet-50/10 hover:shadow-[0_12px_32px_rgba(76,29,149,0.06)] transition-all duration-300 group gap-4 min-h-[160px]"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto max-w-[200px] object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#3B0764] to-[#6D28D9] ${partner.logo ? 'hidden' : 'flex'}`}
              >
                <p className="text-sm font-black text-white uppercase tracking-wide px-3">{partner.name}</p>
              </div>
              <p className="text-sm font-bold text-gray-600 group-hover:text-[#4C1D95] transition-colors duration-200 text-center leading-snug">
                {partner.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;

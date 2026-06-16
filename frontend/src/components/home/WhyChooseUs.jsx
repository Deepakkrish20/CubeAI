import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { whyChooseUsData, WHY_CHOOSE_US_SECTION_META } from '@/data/whyChooseUsData';
import { resolveValuePropositions } from '@/utils/whyChooseUsUtils';

const UNAVAILABLE_MESSAGE = 'We are currently updating our key advantages.';

function ValuePropositionItem({ item, index }) {
  const Icon = item.icon ?? FaCheckCircle;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="group relative flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-[24px] border border-gray-200/50 bg-white/70 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,208,156,0.25)] hover:border-transparent hover:-translate-y-1.5 transition-all duration-300 cursor-default overflow-hidden will-change-transform"
      aria-labelledby={`vp-title-${item.id}`}
    >
      {/* Dynamic hover overlay with smooth scaling and fade */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D09C] to-[#00b084] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-0 rounded-[24px]" />
      
      {/* Icon Frame with glowing border */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00D09C]/5 text-[#00D09C] border border-[#00D09C]/10 group-hover:scale-110 group-hover:bg-white group-hover:text-[#00D09C] group-hover:shadow-[0_8px_20px_rgba(255,255,255,0.25)] transition-all duration-300">
        <Icon className="h-5 w-5 group-hover:rotate-[360deg] transition-transform duration-500 ease-out" aria-hidden="true" />
      </div>

      <div className="relative z-10 flex-1">
        <h3 id={`vp-title-${item.id}`} className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-2 text-sm text-gray-500 group-hover:text-white/90 transition-colors duration-300 font-medium leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}

function WhyChooseUs({ data = whyChooseUsData, meta = WHY_CHOOSE_US_SECTION_META }) {
  const propositions = resolveValuePropositions(data);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  if (propositions.length === 0) {
    return (
      <section id={meta?.id ?? 'why-choose-us'} className="w-full border-t border-gray-150 py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={meta?.id ?? 'why-choose-us'} className="relative w-full border-t border-gray-150 py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/20 to-white overflow-hidden">
      {/* Abstract background gradient details */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-violet-100/15 to-purple-50/5 blur-3xl opacity-50" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          
          {/* Left Column: Editorial Header Content (Col 1-5) */}
          <motion.div 
            ref={headingRef}
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8"
          >
            {meta?.eyebrow && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#00D09C] mb-6">
                {meta.eyebrow}
              </span>
            )}
            {meta?.title && (
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-[-0.03em] text-gray-900 leading-[1.2] text-balance mb-6 mt-1">
                {meta.title}
              </h2>
            )}
            {meta?.subtitle && (
              <p className="text-base text-gray-500 font-medium leading-relaxed">
                {meta.subtitle}
              </p>
            )}
          </motion.div>

          {/* Right Column: Value Propositions Stack (Col 6-12) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {propositions.map((item, idx) => (
              <ValuePropositionItem key={item.id} item={item} index={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

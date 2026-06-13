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
      className="group relative flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-[24px] border border-gray-200/50 bg-white/70 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_16px_36px_rgba(76,29,149,0.03)] hover:border-violet-200/80 transition-all duration-300 cursor-default overflow-hidden"
      aria-labelledby={`vp-title-${item.id}`}
    >
      {/* Dynamic hover overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-violet-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon Frame with glowing border */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4C1D95]/5 text-[#4C1D95] border border-violet-100/10 group-hover:scale-110 group-hover:bg-[#4C1D95]/10 group-hover:shadow-[0_0_15px_rgba(76,29,149,0.15)] transition-all duration-300">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="flex-1">
        <h3 id={`vp-title-${item.id}`} className="text-lg font-bold text-gray-900 group-hover:text-[#3B0764] transition-colors duration-250">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#4C1D95] mb-6">
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

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiChevronRight, FiCheck } from 'react-icons/fi';
import { servicesData, SERVICES_SECTION_META } from '@/data/servicesData';
import { resolveServices } from '@/utils/servicesUtils';

const UNAVAILABLE_MESSAGE = 'Services are currently unavailable.';

function ServicesSection({ data = servicesData, meta = SERVICES_SECTION_META }) {
  const services = resolveServices(data);
  const [activeTabId, setActiveTabId] = useState(services[0]?.id || '');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Fallback check if services array is empty
  if (services.length === 0) {
    return (
      <section
        id={meta?.id ?? 'services'}
        className="w-full border-t border-gray-200 bg-gray-50 py-8"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="font-medium text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  // Retrieve details of the currently active service
  const activeService = services.find((s) => s.id === activeTabId) || services[0];
  const features = Array.isArray(activeService.features) ? activeService.features : [];

  return (
    <section id={meta?.id ?? 'services'} className="relative w-full border-t border-gray-150 bg-gradient-to-b from-white via-slate-50/20 to-white py-16 lg:py-24 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-100/10 to-purple-50/5 blur-3xl opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(76,29,149,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,29,149,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-70" />

      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.header 
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#4C1D95] mb-6">
            Our Offerings
          </span>
          {meta?.title && (
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-gray-900 leading-[1.2] text-balance">
              {meta.title}
            </h2>
          )}
        </motion.header>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Sidebar: Tab buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-3 lg:col-span-4"
          >
            {services.map((service) => {
              const isActive = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTabId(service.id)}
                  className={`group flex w-full items-center justify-between rounded-2xl border p-5 text-left text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'border-violet-100 bg-white text-[#4C1D95] shadow-[0_12px_32px_rgba(76,29,149,0.06)]'
                      : 'border-gray-200/50 bg-white/40 text-gray-500 hover:text-gray-900 hover:bg-white hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)]'
                  }`}
                  type="button"
                >
                  <span className="tracking-tight">{service.title || service.categoryTitle || 'Unnamed Service'}</span>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#4C1D95]/10 text-[#4C1D95]' 
                      : 'bg-transparent text-gray-300 group-hover:text-gray-500 group-hover:bg-gray-100'
                  }`}>
                    <FiChevronRight className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Content Pane: Active Service Details */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col gap-8 rounded-[32px] border border-gray-200/60 bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-10 md:flex-row shadow-[0_16px_48px_rgba(15,23,42,0.03)]"
              >
                {/* Service details column */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="mb-4 font-heading text-2xl font-black tracking-tight text-gray-900">
                      {activeService.detailTitle || activeService.title || 'Service Details'}
                    </h3>

                    {activeService.shortDescription || activeService.description ? (
                      <p className="mb-8 text-sm leading-relaxed text-gray-500 font-medium">
                        {activeService.shortDescription || activeService.description}
                      </p>
                    ) : (
                      <p className="mb-8 text-sm italic text-gray-400">No description available.</p>
                    )}

                    {/* Features List */}
                    {features.length > 0 && (
                      <div className="mb-8">
                        <h4 className="mb-4 text-[10px] font-black uppercase tracking-widest text-[#4C1D95]/60">
                          Key Highlights
                        </h4>
                        <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                          {features.map((feature, idx) => (
                            <li
                              key={`${feature}-${idx}`}
                              className="flex items-start text-xs font-bold text-gray-700"
                            >
                              <div className="mr-2.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4C1D95]/10 text-[#4C1D95] mt-0.5">
                                <FiCheck className="h-3 w-3" />
                              </div>
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-4">
                    <Link
                      to={activeService.route || '/apply-now'}
                      state={{ preselectedService: activeService.id }}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#3B0764] to-[#6D28D9] px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(76,29,149,0.18)] hover:shadow-[0_12px_30px_rgba(76,29,149,0.28)] hover:scale-[1.01] transition-all duration-300"
                    >
                      {activeService.ctaText || 'Apply Now'}
                    </Link>
                  </div>
                </div>

                {/* Service Image column */}
                <div className="flex w-full flex-shrink-0 items-center justify-center md:w-72 mt-6 md:mt-0">
                  {activeService.image ? (
                    <div className="relative h-56 w-full overflow-hidden rounded-[24px] border border-white bg-slate-50 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:h-72 group">
                      <img
                        src={activeService.image}
                        alt={activeService.title || 'Service image'}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://placehold.co/400x300/e2e8f0/64748b?text=Service+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-white text-xs text-gray-400 md:h-72">
                      Placeholder Image
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

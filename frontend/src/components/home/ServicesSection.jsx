import { useState, useRef, useEffect } from 'react';
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

  const activeIndex = services.findIndex((s) => s.id === activeTabId);

  // Auto-cycle through services
  useEffect(() => {
    if (services.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTabId((currentId) => {
        const currIdx = services.findIndex(s => s.id === currentId);
        const nextIdx = (currIdx + 1) % services.length;
        return services[nextIdx].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [services]);

  const handleTabClick = (serviceId) => {
    setActiveTabId(serviceId);
  };

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

  const activeService = services.find((s) => s.id === activeTabId) || services[0];
  const features = Array.isArray(activeService?.features) ? activeService.features : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id={meta?.id ?? 'services'}
      ref={containerRef}
      className="relative w-full border-t border-gray-150 bg-gradient-to-b from-white via-slate-50/20 to-white py-12 lg:py-20 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#00D09C]/10 to-emerald-50/5 blur-3xl opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,208,156,0.006)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,208,156,0.006)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-60" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <motion.header 
          variants={itemVariants}
          className="mb-10 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#00D09C] mb-3">
            Our Offerings
          </span>
          {meta?.title && (
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-gray-900 leading-[1.2] text-balance">
              {meta.title}
            </h2>
          )}
        </motion.header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Active Service Name */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col text-center lg:text-left items-center lg:items-start lg:col-span-4 min-h-[140px] select-none"
          >
            <div className="min-h-[80px] flex items-center justify-center lg:justify-start w-full">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeService.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-black tracking-[-0.02em] leading-[1.2] bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #111827 20%, #00D09C 60%)'
                  }}
                >
                  {activeService.title || activeService.categoryTitle || 'Service Name'}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Navigation Chevron buttons */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  const prevIndex = activeIndex > 0 ? activeIndex - 1 : services.length - 1;
                  handleTabClick(services[prevIndex].id);
                }}
                className="p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:text-[#00D09C] hover:border-[#00D09C]/30 hover:shadow-[0_4px_12px_rgba(0,208,156,0.08)] active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Previous service"
                type="button"
              >
                <FiChevronRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                onClick={() => {
                  const nextIndex = activeIndex < services.length - 1 ? activeIndex + 1 : 0;
                  handleTabClick(services[nextIndex].id);
                }}
                className="p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:text-[#00D09C] hover:border-[#00D09C]/30 hover:shadow-[0_4px_12px_rgba(0,208,156,0.08)] active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Next service"
                type="button"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Active Card content */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-8 w-full relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col gap-6 rounded-[24px] border border-gray-200/60 bg-white/80 backdrop-blur-md p-5 sm:p-6 md:p-8 md:flex-row shadow-[0_16px_48px_rgba(15,23,42,0.03)] w-full"
              >
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="mb-3 font-heading text-2xl font-black tracking-tight text-gray-900">
                      {activeService.detailTitle || activeService.title || 'Service Details'}
                    </h3>

                    {activeService.shortDescription || activeService.description ? (
                      <p className="mb-5 text-sm leading-relaxed text-gray-500 font-medium">
                        {activeService.shortDescription || activeService.description}
                      </p>
                    ) : (
                      <p className="mb-5 text-sm italic text-gray-400">No description available.</p>
                    )}

                    {features.length > 0 && (
                      <div className="mb-5">
                        <h4 className="mb-2.5 text-[10px] font-black uppercase tracking-widest text-[#00D09C]/60">
                          Key Highlights
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {features.map((feature, idx) => (
                            <li
                              key={`${feature}-${idx}`}
                              className="flex items-start text-xs font-bold text-gray-700"
                            >
                              <div className="mr-2.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00D09C]/10 text-[#00D09C] mt-0.5">
                                <FiCheck className="h-3 w-3" />
                              </div>
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <Link
                      to={activeService.route || '/apply-now'}
                      state={{ preselectedService: activeService.id }}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#006B50] to-[#00B386] px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(0, 208, 156,0.18)] hover:shadow-[0_12px_30px_rgba(0, 208, 156,0.28)] hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                    >
                      {activeService.ctaText || 'Apply Now'}
                    </Link>
                  </div>
                </div>

                <div className="flex w-full flex-shrink-0 items-center justify-center md:w-64 mt-6 md:mt-0 relative group">
                  {activeService.image ? (
                    <div className="relative h-48 w-full overflow-hidden rounded-[20px] shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:h-60">
                      <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        src={activeService.image}
                        alt={activeService.title || 'Service image'}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://placehold.co/400x300/e2e8f0/64748b?text=Service+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-[20px] border border-dashed border-gray-300 bg-white text-xs text-gray-400 md:h-60">
                      Placeholder Image
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}

export default ServicesSection;


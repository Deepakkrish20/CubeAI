import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { testimonialsData } from '@/data/testimonialsData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const UNAVAILABLE_MESSAGE = 'Testimonials are currently unavailable.';

function TestimonialsSection({ data = testimonialsData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Validate testimonials data structure
  const isValidTestimonial = (item) => {
    return item && typeof item === 'object' && item.id && item.customerName && item.testimonial;
  };

  const list = Array.isArray(data) ? data.filter(isValidTestimonial) : [];

  // Autoplay support
  useEffect(() => {
    if (!autoplay || list.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, list.length]);

  // Keyboard navigation support
  useEffect(() => {
    if (list.length <= 1) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % list.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [list.length]);

  if (list.length === 0) {
    return (
      <section
        id="testimonials"
        className="w-full border-b border-t border-gray-150 bg-slate-50 py-12"
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-medium text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const current = list[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full border-b border-t border-gray-150 bg-gradient-to-b from-white via-slate-50/20 to-white py-16 lg:py-24 overflow-hidden"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-violet-100/10 blur-3xl opacity-65" />

      <div ref={containerRef} className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#4C1D95] mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl font-black tracking-tight text-gray-900 leading-none">
            What Our Clients Say!
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative flex flex-col items-center rounded-[32px] border border-gray-200/50 bg-white/80 backdrop-blur-md p-8 sm:p-12 shadow-[0_16px_48px_rgba(15,23,42,0.03)]"
        >
          {/* Quote mark icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4C1D95]/5 border border-violet-100/30">
            <span className="font-serif text-3xl font-black text-[#4C1D95] select-none leading-none mt-2">&ldquo;</span>
          </div>

          {/* Testimonial Text with slide-and-fade transition */}
          <div className="relative min-h-[140px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mb-8 text-center text-sm md:text-base font-bold text-gray-800 leading-relaxed max-w-2xl text-balance"
              >
                &ldquo;{current.testimonial}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Customer Avatar & Name */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              {current.image && (
                <img
                  src={current.image}
                  alt={current.customerName}
                  className="mb-4 h-16 w-16 rounded-full border-2 border-white bg-slate-100 object-cover shadow-[0_4px_16px_rgba(76,29,149,0.1)]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <h4 className="text-base font-black text-gray-900 leading-none">{current.customerName}</h4>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4C1D95] mt-1.5">{current.designation}</span>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]/20 hidden sm:flex"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]/20 hidden sm:flex"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="mt-8 flex gap-2.5">
            {list.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                type="button"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-5 bg-[#4C1D95]' : 'w-1.5 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

import { useState, useEffect } from 'react';
import { testimonialsData } from '@/data/testimonialsData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const UNAVAILABLE_MESSAGE = 'Testimonials are currently unavailable.';

function TestimonialsSection({ data = testimonialsData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

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
    }, 5000); // Transitions every 5 seconds
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
        className="w-full border-b border-t border-gray-200 bg-gray-50 py-12"
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
      className="w-full border-b border-t border-gray-200 bg-gray-50 py-12"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Testimonial
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">What Our Clients Say!</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {/* Quote mark icon */}
          <div className="border-gray-150 mb-4 flex h-12 w-12 items-center justify-center rounded-full border bg-gray-50">
            <span className="font-serif text-2xl font-bold text-primary">&ldquo;</span>
          </div>

          {/* Testimonial Text */}
          <p className="mb-6 text-center text-sm italic leading-relaxed text-gray-700 md:text-base">
            &ldquo;{current.testimonial}&rdquo;
          </p>

          {/* Customer Avatar & Name */}
          <div className="flex flex-col items-center">
            {current.image && (
              <img
                src={current.image}
                alt={current.customerName}
                className="mb-3 h-16 w-16 rounded-full border-2 border-primary object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <h4 className="text-sm font-bold text-gray-900 md:text-base">{current.customerName}</h4>
            <span className="text-xs font-medium text-gray-500">{current.designation}</span>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-600 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-600 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="mt-6 flex gap-2">
            {list.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                type="button"
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-5 bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

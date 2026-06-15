import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { heroSlides } from '@/data/heroSlides';
import { ROUTES } from '@/constants/routes';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const UNAVAILABLE_MESSAGE = 'Hero content is currently unavailable.';

// Slide customization map for premium messaging and visual elements
const slideDetails = {
  'financing-ev-future': {
    badge: '⚡ EV Financing Specialists',
    highlightWords: ['Future of EV'],
    description: "Powering India's electric vehicle transition. Get customized loan schemes for electric cars, two-wheelers, and commercial EVs with minimal documentation.",
    stats: [
      { label: 'EVs Financed', value: '5,000+' },
      { label: 'Subsidy Savings', value: '₹40k+' },
      { label: 'Carbon Saved', value: '250 Tons' }
    ],
    widgets: [
      {
        type: 'approval',
        title: 'EV Loan Approved',
        amount: '₹4,85,000',
        detail: 'TATA Nexon EV • 8.9% p.a.',
        status: 'Disbursed',
        position: 'top-[-5%] left-[-10%]',
        delay: 0
      },
      {
        type: 'insight',
        title: 'Battery Subsidy',
        amount: '₹45,000 Saved',
        detail: 'FAME-II scheme enabled',
        status: 'Active',
        position: 'bottom-[10%] right-[-8%]',
        delay: 1.5
      },
      {
        type: 'rate',
        title: 'Processing Time',
        value: '2.5 Hours',
        detail: '100% digital check',
        position: 'bottom-[-10%] left-[5%]',
        delay: 3.0
      }
    ]
  },
  'affordable-ev-loans': {
    badge: '✓ 24-Hour Digital Approvals',
    highlightWords: ['Affordable EV Loans'],
    description: 'Unlock hassle-free financing options for any electric vehicle. We partner directly with leading dealers to offer you interest rates that fit your budget.',
    stats: [
      { label: 'Partnerships', value: '120+' },
      { label: 'Interest Rate', value: 'From 8.5%' },
      { label: 'Digital Process', value: '100%' }
    ],
    widgets: [
      {
        type: 'approval',
        title: '2-Wheeler Approved',
        amount: '₹1,20,000',
        detail: 'Ola S1 Pro • 0 Downpayment',
        status: 'Approved',
        position: 'top-[-8%] right-[-5%]',
        delay: 0.5
      },
      {
        type: 'insight',
        title: 'Monthly Savings',
        amount: '₹4,200 /mo',
        detail: 'vs. petrol running costs',
        status: 'Optimized',
        position: 'bottom-[5%] left-[-10%]',
        delay: 2.0
      },
      {
        type: 'rate',
        title: 'LTV Ratio',
        value: 'Up to 90%',
        detail: 'Funding on-road price',
        position: 'bottom-[-12%] right-[5%]',
        delay: 3.5
      }
    ]
  },
  'dream-car': {
    badge: '🚘 Premium Car Financing',
    highlightWords: ['Dream Car'],
    description: 'Experience a smooth journey to your new car. Benefit from flexible repayment tenures, lowest processing fees, and immediate financing approval.',
    stats: [
      { label: 'Tenure Options', value: 'Up to 7 Yrs' },
      { label: 'Processing Fee', value: 'Flat 1%' },
      { label: 'Pre-approved Users', value: '25,000+' }
    ],
    widgets: [
      {
        type: 'approval',
        title: 'Car Loan Approved',
        amount: '₹12,50,000',
        detail: 'Hyundai Creta • pre-approved',
        status: 'Active',
        position: 'top-[-5%] left-[-12%]',
        delay: 1.0
      },
      {
        type: 'insight',
        title: 'Flexible EMIs',
        amount: '₹14,500 /mo',
        detail: 'Step-up option enabled',
        status: 'Custom',
        position: 'bottom-[12%] right-[-10%]',
        delay: 2.5
      },
      {
        type: 'rate',
        title: 'Documentation',
        value: 'Paperless',
        detail: 'PAN & Bank Statement only',
        position: 'bottom-[-8%] left-[10%]',
        delay: 4.0
      }
    ]
  },
  'loan-against-property': {
    badge: '🏠 Unlock Property Value',
    highlightWords: ['Against Property'],
    description: 'Turn your real estate equity into liquidity. Secure large funding amounts with easy tenure options, fast evaluations, and dedicated support.',
    stats: [
      { label: 'Max Loan Amount', value: '₹5 Crore' },
      { label: 'Long Tenure', value: 'Up to 15 Yrs' },
      { label: 'LTV Funding', value: 'Up to 75%' }
    ],
    widgets: [
      {
        type: 'approval',
        title: 'LAP Disbursed',
        amount: '₹45,00,000',
        detail: 'Residential Property Loan',
        status: 'Disbursed',
        position: 'top-[-10%] right-[-8%]',
        delay: 1.2
      },
      {
        type: 'insight',
        title: 'Property Valuation',
        amount: '₹1.5 Crores',
        detail: 'Verified by Bundela Valuer',
        status: 'Verified',
        position: 'bottom-[8%] left-[-12%]',
        delay: 2.8
      },
      {
        type: 'rate',
        title: 'Interest Style',
        value: 'Reducing Balance',
        detail: 'Daily reducing calculation',
        position: 'bottom-[-10%] right-[10%]',
        delay: 4.2
      }
    ]
  },
  'electric-bike': {
    badge: '🏍️ Electric Bike Financing',
    highlightWords: ['Electric Bike Today'],
    description: 'Zip through the city with zero fuel costs. Get quick, hassle-free electric bike financing with customized schemes and low monthly payments.',
    stats: [
      { label: 'Weekly EMI', value: 'Starts ₹350' },
      { label: 'Fast Approval', value: '15 Minutes' },
      { label: 'Network Dealers', value: '500+' }
    ],
    widgets: [
      {
        type: 'approval',
        title: 'E-Bike Approved',
        amount: '₹85,000',
        detail: 'Ather 450X • 0% Downpayment',
        status: 'Approved',
        position: 'top-[-6%] left-[-8%]',
        delay: 0.8
      },
      {
        type: 'insight',
        title: 'Fuel Savings',
        amount: '₹3,500 Saved/mo',
        detail: 'Compared to petrol scooter',
        status: 'Active',
        position: 'bottom-[12%] right-[-10%]',
        delay: 2.3
      },
      {
        type: 'rate',
        title: 'Processing fee',
        value: 'Zero',
        detail: 'For early bird registrations',
        position: 'bottom-[-10%] left-[8%]',
        delay: 3.8
      }
    ]
  }
};

const renderHighlightedHeading = (heading, highlightWords) => {
  if (!highlightWords || highlightWords.length === 0) return heading;
  const sortedWords = [...highlightWords].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sortedWords.map(w => w.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
  const parts = heading.split(pattern);
  return parts.map((part, index) => {
    const isMatch = sortedWords.some(w => w.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      return (
        <span
          key={index}
          className="bg-gradient-to-r from-[#006B50] via-[#00D09C] to-[#00D09C] bg-clip-text text-transparent font-black tracking-tight"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

function FloatingWidget({ widget }) {


  const widgetStyles = "absolute z-20 transition-all duration-300 " + widget.position;

  if (widget.type === 'approval') {
    return (
      <motion.div
        className={`${widgetStyles} bg-white/90 backdrop-blur-xl border border-white/80 p-3.5 rounded-[20px] shadow-[0_12px_36px_rgba(15,23,42,0.08)] flex items-center gap-3 w-56 sm:w-64`}
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -8, 0] }}
        transition={{ 
          opacity: { duration: 0.5, delay: widget.delay || 0 },
          scale: { duration: 0.5, delay: widget.delay || 0 },
          rotate: { duration: 0.5, delay: widget.delay || 0 },
          y: { duration: 4.5 + (widget.delay || 0) * 0.5, repeat: Infinity, repeatType: "reverse" }
        }}
        whileHover={{ scale: 1.08, rotate: 2, boxShadow: "0 16px 48px rgba(15,23,42,0.12)" }}
      >
        <motion.div 
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00D09C]/10 text-[#00D09C] shrink-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#00D09C] leading-none">{widget.title}</p>
            <motion.span 
              className="inline-block px-1.5 py-0.5 text-[8px] font-bold bg-[#00D09C]/10 text-[#00D09C] rounded-full leading-none"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {widget.status}
            </motion.span>
          </div>
          <p 
            className="text-[14px] sm:text-base font-extrabold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight mt-0.5"
          >
            {widget.amount}
          </p>
          <p className="text-[10px] text-gray-500 truncate leading-none mt-1">{widget.detail}</p>
        </div>
      </motion.div>
    );
  }

  if (widget.type === 'insight') {
    return (
      <motion.div
        className={`${widgetStyles} bg-white/85 backdrop-blur-xl border border-white/60 p-3 rounded-[18px] shadow-[0_10px_28px_rgba(15,23,42,0.06)] flex items-center gap-3 w-48 sm:w-56`}
        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, 8, 0] }}
        transition={{ 
          opacity: { duration: 0.5, delay: widget.delay || 0 },
          scale: { duration: 0.5, delay: widget.delay || 0 },
          rotate: { duration: 0.5, delay: widget.delay || 0 },
          y: { duration: 5 + (widget.delay || 0) * 0.5, repeat: Infinity, repeatType: "reverse" }
        }}
        whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0 14px 40px rgba(15,23,42,0.1)" }}
      >
        <motion.div 
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary shrink-0"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide leading-none">{widget.title}</p>
          <p className="text-[13px] sm:text-[14px] font-black text-gray-900 mt-1 leading-tight">
            {widget.amount}
          </p>
          <p className="text-[9px] text-gray-400 truncate leading-none mt-0.5">{widget.detail}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${widgetStyles} bg-white/95 backdrop-blur-md border border-white/80 p-3.5 rounded-[16px] shadow-[0_8px_24px_rgba(15,23,42,0.05)] w-32 sm:w-40`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
      transition={{ 
        opacity: { duration: 0.5, delay: widget.delay || 0 },
        scale: { duration: 0.5, delay: widget.delay || 0 },
        y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ scale: 1.1, boxShadow: "0 12px 32px rgba(15,23,42,0.08)" }}
    >
      <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight leading-none">
        {widget.value}
      </p>
      <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-tight mt-1.5">{widget.title}</p>
      <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5 leading-tight">{widget.detail}</p>
    </motion.div>
  );
}

function HeroSection({ slides = heroSlides }) {
  const swiperRef = useRef(null);
  const validSlides = Array.isArray(slides)
    ? slides.filter((slide) => slide && slide.id && slide.heading)
    : [];

  if (validSlides.length === 0) {
    return (
      <section id="hero" className="w-full border-b border-gray-200 py-8 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden border-b border-gray-100 bg-gradient-to-b from-slate-50 via-white to-slate-50" style={{ height: '680px' }}>
      {/* Grid Dots Background — LEFT HALF ONLY, behind text */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-1/2 opacity-40 pointer-events-none hero-wavy-grid"
        style={{
          backgroundImage: 'radial-gradient(circle, #ec4899 0.8px, #a855f7 0.5px, #00D09C 0.3px, transparent 2px)',
          backgroundSize: '35px 35px',
          willChange: 'transform'
        }}
      />

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        speed={700}
        navigation={{
          prevEl: '.hero-swiper-button-prev',
          nextEl: '.hero-swiper-button-next',
        }}
        pagination={{
          el: '.hero-swiper-pagination',
          clickable: true,
        }}
        className="w-full h-full"
      >
        {validSlides.map((slide) => {
          const details = slideDetails[slide.id] || {
            badge: '✓ Fast & Transparent Financing',
            highlightWords: [],
            description: slide.description || 'Flexible loans customized to your needs with transparent pricing and minimal paper requirements.',
            stats: [
              { label: 'Processing Time', value: '24 Hours' },
              { label: 'Interest Rate', value: 'From 8.9% p.a.' },
              { label: 'Transparent Process', value: '100%' }
            ],
            widgets: []
          };

          return (
            <SwiperSlide key={slide.id}>
              {/* Full-bleed flex row — no max-w container */}
              <div className="flex h-full w-full">

                {/* LEFT 50% — text content with grid dot bg behind it */}
                <motion.div
                  key={slide.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative z-10 w-1/2 flex flex-col justify-center pl-8 sm:pl-12 lg:pl-20 pr-8 lg:pr-12 py-12 md:py-16"
                >
                  {/* Trust Badge */}
                  <motion.div
                    variants={slideInVariants}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/70 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-[#00D09C] backdrop-blur-md mb-6 self-start"
                  >
                    <motion.span 
                      className="flex h-1.5 w-1.5 rounded-full bg-[#00D09C]"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {details.badge}
                  </motion.div>

                  {/* Headline */}
                  <motion.h1
                    variants={itemVariants}
                    className="font-heading text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-black tracking-tight leading-[1.08] text-gray-900 text-balance mb-6"
                  >
                    {renderHighlightedHeading(slide.heading, details.highlightWords)}
                  </motion.h1>

                  {/* Supporting Description */}
                  <motion.p
                    variants={slideInVariants}
                    className="text-base sm:text-[17px] text-gray-500 font-medium leading-relaxed max-w-lg mb-8"
                  >
                    {details.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-4 mb-10"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={slide.primaryBtnLink ?? ROUTES.APPLY_NOW}
                        className="h-12 px-7 rounded-full flex items-center justify-center gap-2 group bg-gradient-to-r from-[#006B50] to-[#00B386] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(0,208,156,0.18)] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,208,156,0.28)] transition-all duration-200"
                      >
                        <span>{slide.primaryBtnText ?? 'Apply Now'}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FiArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={ROUTES.EMI_CALCULATOR}
                        className="h-12 px-7 rounded-full flex items-center justify-center font-semibold text-gray-700 text-sm bg-white/60 hover:bg-white/80 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200"
                      >
                        EMI Calculator
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Social Proof */}
                  <motion.div
                    variants={scaleInVariants}
                    className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-gray-200/60 w-full"
                  >
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex -space-x-2.5">
                        {[...Array(3)].map((_, i) => (
                          <motion.img
                            key={i}
                            className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                            src={["https://images.unsplash.com/photo-1534528741775-53994a69daeb", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", "https://images.unsplash.com/photo-1494790108377-be9c29b29330"][i]}
                            alt="customer"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                          />
                        ))}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-900 leading-tight">10,000+ Customers</p>
                        <p className="text-[10px] text-gray-400 font-semibold leading-none">Financed across India</p>
                      </div>
                    </motion.div>

                    <div className="h-8 w-px bg-gray-200 hidden sm:block" />

                    <div className="flex gap-6 sm:gap-8">
                      {details.stats.map((stat, i) => (
                        <motion.div 
                          key={i} 
                          className="text-left"
                          variants={scaleInVariants}
                          whileHover={{ scale: 1.1 }}
                        >
                          <p className="text-xs font-extrabold text-gray-900 leading-tight">{stat.value}</p>
                          <p className="text-[10px] text-gray-400 font-semibold leading-none mt-0.5 text-nowrap">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* RIGHT 50% — image with proper spacing, contained */}
                <div className="w-1/2 overflow-hidden flex items-center py-8 pr-10 pl-4">
                  <motion.div
                    key={slide.id + '-img-wrap'}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative rounded-2xl overflow-hidden"
                  >
                    <img
                      src={slide.image}
                      alt={slide.imageAlt ?? slide.heading}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                    />
                  </motion.div>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Sleek navigation controls */}
      <button
        className="hero-swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 hidden md:flex items-center justify-center h-11 w-11 rounded-full border border-white/50 bg-white/40 text-gray-700 backdrop-blur-md shadow-sm transition-all duration-200 hover:bg-white/80 hover:scale-105 active:scale-95"
        aria-label="Previous slide"
        type="button"
      >
        <FiArrowLeft className="h-5 w-5" />
      </button>

      <button
        className="hero-swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 hidden md:flex items-center justify-center h-11 w-11 rounded-full border border-white/50 bg-white/40 text-gray-700 backdrop-blur-md shadow-sm transition-all duration-200 hover:bg-white/80 hover:scale-105 active:scale-95"
        aria-label="Next slide"
        type="button"
      >
        <FiArrowRight className="h-5 w-5" />
      </button>

      {/* Apple-style pill pagination bar */}
      <div className="hero-swiper-pagination pb-8" />
    </section>
  );
}

export default HeroSection;

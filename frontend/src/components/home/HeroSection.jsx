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
  const pattern = new RegExp(`(${sortedWords.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
  const parts = heading.split(pattern);
  return parts.map((part, index) => {
    const isMatch = sortedWords.some(w => w.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      return (
        <span
          key={index}
          className="bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-black tracking-tight"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

function FloatingWidget({ widget }) {
  const floatTransition = {
    y: {
      duration: 4.5 + (widget.delay || 0) * 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }
  };

  const widgetStyles = "absolute z-20 transition-all duration-300 hover:scale-[1.03] " + widget.position;

  if (widget.type === 'approval') {
    return (
      <motion.div
        className={`${widgetStyles} bg-white/90 backdrop-blur-xl border border-white/80 p-3.5 rounded-[20px] shadow-[0_12px_36px_rgba(15,23,42,0.08)] flex items-center gap-3 w-56 sm:w-64`}
        animate={{ y: [0, -6, 0] }}
        transition={floatTransition}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6D28D9]/10 text-[#6D28D9] shrink-0">
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#6D28D9] leading-none">{widget.title}</p>
            <span className="inline-block px-1.5 py-0.5 text-[8px] font-bold bg-[#6D28D9]/10 text-[#6D28D9] rounded-full leading-none">{widget.status}</span>
          </div>
          <p className="text-[14px] sm:text-base font-extrabold text-gray-900 leading-tight mt-0.5">{widget.amount}</p>
          <p className="text-[10px] text-gray-500 truncate leading-none mt-1">{widget.detail}</p>
        </div>
      </motion.div>
    );
  }

  if (widget.type === 'insight') {
    return (
      <motion.div
        className={`${widgetStyles} bg-white/85 backdrop-blur-xl border border-white/60 p-3 rounded-[18px] shadow-[0_10px_28px_rgba(15,23,42,0.06)] flex items-center gap-3 w-48 sm:w-56`}
        animate={{ y: [0, 6, 0] }}
        transition={floatTransition}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary shrink-0">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide leading-none">{widget.title}</p>
          <p className="text-[13px] sm:text-[14px] font-black text-gray-900 mt-1 leading-tight">{widget.amount}</p>
          <p className="text-[9px] text-gray-400 truncate leading-none mt-0.5">{widget.detail}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${widgetStyles} bg-white/95 backdrop-blur-md border border-white/80 p-3.5 rounded-[16px] shadow-[0_8px_24px_rgba(15,23,42,0.05)] w-32 sm:w-40`}
      animate={{ y: [0, -5, 0] }}
      transition={floatTransition}
    >
      <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight leading-none">{widget.value}</p>
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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden border-b border-gray-100 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background elegant radial blur */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-violet-100/20 to-purple-50/10 blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-amber-50/10 to-violet-50/5 blur-3xl opacity-50" />

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
        className="w-full"
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
              {/* Unique key inside slide ensures animations replay when slide changes */}
              <motion.div
                key={slide.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24"
              >
                <div className="grid items-center gap-12 lg:grid-cols-12">
                  {/* Left content panel (58% width on desktop) */}
                  <div className="lg:col-span-7 flex flex-col items-start text-left">
                    {/* Trust Badge */}
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/70 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-[#6D28D9] backdrop-blur-md mb-6"
                    >
                      <span className="flex h-1.5 w-1.5 rounded-full bg-[#6D28D9] animate-pulse" />
                      {details.badge}
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      variants={itemVariants}
                      className="font-heading text-[36px] sm:text-[46px] md:text-[54px] lg:text-[60px] font-black tracking-tight leading-[1.08] text-gray-900 text-balance mb-6"
                    >
                      {renderHighlightedHeading(slide.heading, details.highlightWords)}
                    </motion.h1>

                    {/* Supporting Description */}
                    <motion.p
                      variants={itemVariants}
                      className="text-base sm:text-[17px] text-gray-500 font-medium leading-relaxed max-w-xl mb-8"
                    >
                      {details.description}
                    </motion.p>

                    {/* CTA Area */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-4 mb-12"
                    >
                      <Link
                        to={slide.primaryBtnLink ?? ROUTES.APPLY_NOW}
                        className="h-12 px-7 rounded-full flex items-center justify-center gap-2 group bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(109,40,217,0.18)] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(109,40,217,0.28)] transition-all duration-200"
                      >
                        <span>{slide.primaryBtnText ?? 'Apply Now'}</span>
                        <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>

                      <Link
                        to={ROUTES.EMI_CALCULATOR}
                        className="h-12 px-7 rounded-full flex items-center justify-center font-semibold text-gray-700 text-sm bg-white/60 hover:bg-white/80 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200"
                      >
                        EMI Calculator
                      </Link>
                    </motion.div>

                    {/* Social Proof & Trust Signals */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-gray-200/60 w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2.5">
                          <img className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="customer" />
                          <img className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="customer" />
                          <img className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="customer" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-gray-900 leading-tight">10,000+ Customers</p>
                          <p className="text-[10px] text-gray-400 font-semibold leading-none">Financed across India</p>
                        </div>
                      </div>

                      <div className="h-8 w-px bg-gray-200 hidden sm:block" />

                      <div className="flex gap-6 sm:gap-8">
                        {details.stats.map((stat, i) => (
                          <div key={i} className="text-left">
                            <p className="text-xs font-extrabold text-gray-900 leading-tight">{stat.value}</p>
                            <p className="text-[10px] text-gray-400 font-semibold leading-none mt-0.5 text-nowrap">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right visual storytelling panel (42% width on desktop) */}
                  <div className="lg:col-span-5 flex justify-center py-8 lg:py-0">
                    <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center p-4">
                      {/* Glow effects behind composition */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#6D28D9]/10 via-[#8B5CF6]/5 to-transparent blur-2xl rounded-full" />

                      {/* Center Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-white/40 p-6 sm:p-8 rounded-[24px] border border-white/60 shadow-[0_16px_48px_rgba(15,23,42,0.06)] backdrop-blur-md overflow-hidden w-full h-full flex items-center justify-center z-10"
                      >
                        <img
                          src={slide.image}
                          alt={slide.imageAlt ?? slide.heading}
                          className="max-h-36 sm:max-h-44 w-auto object-contain z-10 transition-transform duration-300 hover:scale-105"
                        />
                        {/* Interactive gloss overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                      </motion.div>

                      {/* Floating overlay widgets */}
                      {details.widgets.map((widget, idx) => (
                        <FloatingWidget key={idx} widget={widget} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
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

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiUsers, FiClock } from 'react-icons/fi';
import { aboutData, ABOUT_SECTION_META } from '@/data/aboutData';

const UNAVAILABLE_MESSAGE = 'Company information is currently unavailable.';

// Map icons to trust pillars
const PILLAR_ICONS = {
  'no-hidden-cost': <FiShield className="h-5 w-5 text-[#00D09C]" />,
  'dedicated-team': <FiUsers className="h-5 w-5 text-[#00D09C]" />,
  'available-247': <FiClock className="h-5 w-5 text-[#00D09C]" />,
};

function AboutSection({ data = aboutData, meta = ABOUT_SECTION_META }) {
  const [activeTab, setActiveTab] = useState('mission');

  if (!data || !Array.isArray(data.paragraphs) || data.paragraphs.length === 0) {
    return (
      <section id={meta?.id ?? 'about'} className="w-full border-t border-gray-150 py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  const trustPillars = Array.isArray(data.trustPillars) ? data.trustPillars : [];

  // Group paragraphs logically for the tab experience:
  // Lead paragraph: index 0
  const leadParagraph = data.paragraphs[0];
  // Our Story: indices 1, 2, 3, 4
  const storyParagraphs = data.paragraphs.slice(1, 5);
  // Our Vision: indices 5, 6
  const visionParagraphs = data.paragraphs.slice(5, 7);
  // Our Mission: index 7 or remaining
  const missionParagraphs = data.paragraphs.slice(7) || [data.paragraphs[data.paragraphs.length - 1]];

  const tabContent = {
    mission: {
      title: 'Our Mission',
      subtitle: 'Accessible Green Financing',
      text: missionParagraphs.join(' '),
    },
    vision: {
      title: 'Our Vision',
      subtitle: 'Fostering Sustainable Growth',
      text: visionParagraphs.join(' '),
    },
    story: {
      title: 'Our Story',
      subtitle: 'Bridging the Finance Gap',
      text: storyParagraphs.join(' '),
    }
  };

  // Motion variants for stagger entrance
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
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <section id={meta?.id ?? 'about'} className="relative w-full overflow-hidden border-t border-gray-150 py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-100/10 to-purple-50/5 blur-3xl opacity-60" />
      
      {/* Sleek background editorial grid lines */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0, 208, 156,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0, 208, 156,0.008)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Side: Visual Storytelling Area (45% width on desktop) */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="relative w-full max-w-[380px] aspect-[4/5] p-2"
            >
              {/* Offset background luxury card */}
              <div className="absolute inset-0 border border-violet-100 bg-gradient-to-br from-violet-50/40 to-teal-50/20 rounded-tl-[80px] rounded-br-[80px] rounded-tr-[24px] rounded-bl-[24px] -rotate-3 -z-10 shadow-[0_12px_40px_rgba(0, 208, 156,0.03)]" />
              
              {/* Large dedicated image container with asymmetrical crop */}
              <div className="w-full h-full rounded-tl-[80px] rounded-br-[80px] rounded-tr-[24px] rounded-bl-[24px] overflow-hidden border border-white bg-slate-100 shadow-[0_16px_48px_rgba(15,23,42,0.06)] relative group">
                <img
                  src="/about-growth-finance.png"
                  alt="Bundela Finance Business Growth & EV Financing"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Fallback elegant silhouette if image fails */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-violet-900 to-[#006B50] text-white select-none text-center -z-10">
                  <FiUsers className="h-12 w-12 text-violet-200/80 mb-3 animate-pulse" />
                  <p className="font-heading text-lg font-bold">Bundela Finance</p>
                  <p className="text-xs text-violet-200/70 mt-1">Trust & Transparency</p>
                </div>
                
                {/* Interactive premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D3A]/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating glass info card A */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute top-[15%] left-[-10%] z-20 bg-white border border-violet-100/80 p-3 rounded-[16px] shadow-[0_12px_40px_rgba(0, 208, 156,0.12)] flex items-center gap-2.5 w-44"
              >
                <div className="h-7 w-7 rounded-full bg-[#00D09C]/10 flex items-center justify-center text-[#00D09C] shrink-0 font-extrabold text-xs">
                  ✓
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-[#006B50] uppercase tracking-wider">RBI REGISTERED</p>
                  <p className="text-[9px] text-gray-700 font-bold leading-none mt-1">Compliant Partner</p>
                </div>
              </motion.div>

              {/* Floating glass info card B */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-[20%] right-[-10%] z-20 bg-white border border-violet-100/80 p-3.5 rounded-[16px] shadow-[0_12px_40px_rgba(0, 208, 156,0.12)] flex flex-col w-40"
              >
                <p className="text-2xl font-black text-[#006B50] leading-none">98%</p>
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-wide leading-tight mt-1.5">Satisfaction Rate</p>
                <p className="text-[8px] text-gray-600 font-semibold mt-1 leading-tight">Verified customer ratings</p>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Side: Editorial Content Experience (55% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              {/* Trust Label */}
              {meta?.eyebrow && (
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#00D09C] mb-6"
                >
                  {meta.eyebrow}
                </motion.div>
              )}

              {/* Headline */}
              {meta?.title && (
                <motion.h2
                  variants={itemVariants}
                  className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-gray-900 leading-[1.25] text-balance mb-8 mt-2"
                >
                  {meta.title}
                </motion.h2>
              )}

              {/* Supporting Lead Description */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-[17px] text-gray-500 font-medium leading-relaxed mb-8"
              >
                {leadParagraph}
              </motion.p>

              {/* Mission/Vision Premium Segmented Controls */}
              <motion.div
                variants={itemVariants}
                className="flex p-1 bg-slate-100 rounded-full w-full max-w-[360px] border border-gray-200/50 mb-6"
              >
                {Object.keys(tabContent).map((tabKey) => {
                  const isActive = activeTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      className={`flex-1 text-center py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#00D09C] text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-slate-50/50'
                      }`}
                      type="button"
                    >
                      {tabContent[tabKey].title}
                    </button>
                  );
                })}
              </motion.div>

              {/* Elevated Tab Content Panel */}
              <motion.div
                variants={itemVariants}
                className="w-full mb-10"
              >
                <div className="bg-white/80 border border-gray-200/60 p-6 rounded-[20px] shadow-[0_8px_24px_rgba(15,23,42,0.02)] backdrop-blur-md min-h-[140px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h4 className="text-xs font-black uppercase text-[#00D09C] tracking-wider mb-2">
                        {tabContent[activeTab].subtitle}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tabContent[activeTab].text}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Key Strength Highlights - Connected Grid Layout */}
              {trustPillars.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="grid gap-px bg-slate-200/70 rounded-[20px] overflow-hidden w-full sm:grid-cols-3 border border-gray-200/50 shadow-[0_12px_40px_rgba(15,23,42,0.02)]"
                >
                  {trustPillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="group flex flex-col justify-start bg-white/95 p-6 hover:bg-gradient-to-br hover:from-white hover:to-violet-50/20 transition-all duration-300 cursor-default relative overflow-hidden"
                    >
                      {/* Subtle hover background highlight spot */}
                      <div className="absolute -right-8 -top-8 w-24 h-24 bg-violet-100/10 rounded-full blur-xl group-hover:bg-[#00D09C]/5 transition-all duration-500" />
                      
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00D09C]/10 mb-4 group-hover:scale-110 group-hover:bg-[#00D09C]/15 transition-all duration-300 relative z-10">
                        {PILLAR_ICONS[pillar.id] || <FiShield className="h-5 w-5 text-[#00D09C]" />}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2 relative z-10">
                        {pillar.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 font-medium leading-relaxed relative z-10">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;

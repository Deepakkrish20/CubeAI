import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { statisticsData, STATISTICS_SECTION_META } from '@/data/statisticsData';
import { resolveStatistics, getAnimationConfig } from '@/utils/statisticsUtils';

const UNAVAILABLE_MESSAGE = 'Statistics are currently unavailable.';

function AnimatedNumber({ value, duration = 1.5, startTrigger = false }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setDisplayValue(value);
      return;
    }
    
    const startTime = performance.now();
    
    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * (end - start) + start);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(end);
      }
    };
    
    requestAnimationFrame(updateNumber);
  }, [value, duration, startTrigger]);

  return <>{displayValue.toLocaleString()}</>;
}

function StatisticItem({ stat, index }) {
  const Icon = stat.icon;
  const animationConfig = getAnimationConfig(stat);
  const suffix = stat.suffix ?? '';
  const prefix = stat.prefix ?? '';
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Progressive staggered timing
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }
    }
  };

  return (
    <motion.article
      ref={containerRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group relative flex flex-col justify-between bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-[20px] border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_16px_36px_rgba(0, 208, 156,0.04)] hover:border-violet-200/60 transition-all duration-300 overflow-hidden cursor-default"
      aria-labelledby={`stat-label-${stat.id}`}
      data-stat-id={stat.id}
    >
      {/* Decorative inner ambient glow on card hover */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-violet-100/10 rounded-full blur-xl group-hover:bg-[#00D09C]/5 transition-all duration-500" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00D09C]/5 text-[#00D09C] group-hover:scale-110 group-hover:bg-[#00D09C]/10 transition-all duration-300">
            {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00D09C]/40 group-hover:text-[#00D09C]/60 transition-colors duration-300">
            0{index + 1}
          </span>
        </div>

        <p className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-none mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#006B50] via-[#00D09C] to-[#00D09C]">
            {prefix}
            <AnimatedNumber 
              value={animationConfig.endValue} 
              duration={animationConfig.duration / 1000} 
              startTrigger={isInView} 
            />
            {suffix}
          </span>
          <span className="text-[#00D09C] ml-0.5 group-hover:animate-pulse">+</span>
        </p>
      </div>

      <h3 id={`stat-label-${stat.id}`} className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
        {stat.label}
      </h3>
    </motion.article>
  );
}

function StatisticsSection({ data = statisticsData, meta = STATISTICS_SECTION_META }) {
  const statistics = resolveStatistics(data);

  if (statistics.length === 0) {
    return (
      <section id={meta?.id ?? 'statistics'} className="w-full border-t border-gray-150 py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={meta?.id ?? 'statistics'} className="relative w-full border-t border-gray-150 py-16 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0, 208, 156,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0, 208, 156,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, idx) => (
            <StatisticItem key={stat.id} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;

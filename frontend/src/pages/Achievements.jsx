import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageHeader from '@/components/common/PageHeader';

const AWARDS = [
  {
    title: 'FE Mobility by Financial Express',
    description: 'Awarded for Excellence in Vechile Finance & Leasing 2025 - New Delhi.',
    image: 'https://www.bundelafinance.com/img/a1.jpg',
    year: '2025',
    location: 'New Delhi',
    badge: 'Excellence Award',
  },
  {
    title: 'Entrepreneur Startup Award 2025',
    description: 'Best EV Fintech of the year 2025 - Bengluru.',
    image: 'https://www.bundelafinance.com/img/a2.jpg',
    year: '2025',
    location: 'Bengaluru',
    badge: 'Best EV Fintech',
  },
  {
    title: 'World Business Conclave 2025',
    description: 'EV Fintech of the year - Indore.',
    image: 'https://www.bundelafinance.com/img/a3.jpg',
    year: '2025',
    location: 'Indore',
    badge: 'Industry Leader',
  },
  {
    title: '19th NBFC FinTech Conclave - New Delhi.',
    description: 'Best EV Fintech of the year.',
    image: 'https://www.bundelafinance.com/img/a5.jpg',
    year: '2024',
    location: 'New Delhi',
    badge: 'Best EV Fintech',
  },
  {
    title: '19th NBFC FinTech Conclave - New Delhi',
    description: 'Best EV Fintech of the year.',
    image: 'https://www.bundelafinance.com/img/a6.jpg',
    year: '2024',
    location: 'New Delhi',
    badge: 'Innovation Award',
  },
  {
    title: 'Entrepreneur Startup Award',
    description: 'Honored for adopting modern tech in loan processing and delivery.',
    image: 'https://www.bundelafinance.com/img/a4.jpg',
    year: '2023',
    location: 'India',
    badge: 'Tech Innovation',
  },
  {
    title: 'FINX Conclave & Awards',
    description: 'Rising Leaders in digital financing.',
    image: 'https://www.bundelafinance.com/img/a9.jpeg',
    year: '2025',
    location: 'India',
    badge: 'Rising Leader',
  },
  {
    title: 'Finx Conclave 2026',
    description: 'Rising leader in financial services award.',
    image: 'https://www.bundelafinance.com/img/event2.jpeg',
    year: '2026',
    location: 'India',
    badge: 'Leadership Award',
  },
];

function AwardCard({ award, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-[28px] border border-gray-200/60 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_48px_rgba(0, 208, 156,0.08)] hover:border-violet-200/80 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={award.image}
          alt={award.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/006B50/ffffff?text=${encodeURIComponent(award.title)}`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00D09C]/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-white border border-white/10">
            🏆 {award.badge}
          </span>
        </div>

        {/* Year pill */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-widest text-[#00D09C]">
            {award.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-sm font-black text-gray-900 leading-tight group-hover:text-[#00D09C] transition-colors duration-200">
          {award.title}
        </h3>
        <p className="text-xs leading-relaxed text-gray-500 font-medium flex-1">{award.description}</p>

        {/* Location footer */}
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#00D09C]/70">
          <span>📍</span>
          <span>{award.location}</span>
        </div>
      </div>
    </motion.article>
  );
}

export function AchievementsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/20 to-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0, 208, 156,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0, 208, 156,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-violet-100/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[#00D09C] mb-5">
            🏅 Our Achievements
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-gray-900 leading-[1.2] mb-4">
            Honours & Awards
          </h2>
          <p className="text-base text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
            Recognised by leading industry bodies for our commitment to EV financing
            excellence and fintech innovation across India.
          </p>

          {/* Stats bar */}
          <div className="mt-8 inline-flex items-center gap-6 px-8 py-4 rounded-2xl border border-gray-200/50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="text-center">
              <p className="text-2xl font-black text-[#00D09C]">{AWARDS.length}+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Awards Won</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-black text-[#00D09C]">12+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Years Active</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-black text-[#00D09C]">5</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cities</p>
            </div>
          </div>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AWARDS.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 rounded-[32px] border border-violet-100 bg-gradient-to-br from-[#006B50] via-[#00D09C] to-[#00B386] p-10 text-center text-white shadow-[0_20px_60px_rgba(0, 208, 156,0.25)]"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-violet-300 mb-3">
            Join Our Journey
          </p>
          <h3 className="font-heading text-2xl sm:text-3xl font-black tracking-tight mb-4">
            More Milestones Ahead
          </h3>
          <p className="text-sm text-violet-200 font-medium max-w-md mx-auto leading-relaxed">
            We&apos;re just getting started. Our commitment to EV financing innovation
            continues to earn recognition across India&apos;s financial industry.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

function Achievements() {
  return (
    <>
      <PageHeader
        title="Achievements"
        subtitle="Our Honours & Awards"
        breadcrumb="Home / Achievements"
      />
      <AchievementsSection />
    </>
  );
}

export default Achievements;

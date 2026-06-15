import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageHeader from '@/components/common/PageHeader';
import { FaLinkedinIn, FaBriefcase } from 'react-icons/fa';

const TEAM_MEMBERS = [
  {
    name: 'Abhay Singh',
    role: 'Director & Founder',
    image: 'https://www.bundelafinance.com/img/abhaysir.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    initials: 'AS',
    isDirector: true,
    linkedin: 'https://www.linkedin.com/in/abhay-manepuriya',
    bio: 'Visionary leader with 12+ years of experience in EV financing and fintech.',
  },
  {
    name: 'Rahul Pal',
    role: 'Business Analyst',
    image: 'https://www.bundelafinance.com/img/team-2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    initials: 'RP',
    isDirector: false,
    linkedin: 'https://www.linkedin.com/in/',
    bio: 'Strategic analyst driving data-informed business decisions.',
  },
  {
    name: 'Shashank Anand',
    role: 'National Head - BD & Partnership',
    image: 'https://www.bundelafinance.com/img/img-6.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    initials: 'SA',
    isDirector: false,
    linkedin: 'https://www.linkedin.com/in/shashank-anand-087b64252',
    portfolio: 'https://bundela-fincorp-national-head-portf.vercel.app/',
    bio: 'National head driving partnerships and business development.',
  },
  {
    name: 'Sharandeep Kaur',
    role: 'Head-HR & Operations',
    image: 'https://www.bundelafinance.com/img/team-6.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    initials: 'SK',
    isDirector: false,
    linkedin: 'https://www.linkedin.com/in/sharandeep-kaur-8a2a7b186',
    bio: 'Leading HR excellence and operational efficiency across the organization.',
  },
];

function TeamMemberCard({ member, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={`group flex flex-col items-center rounded-[28px] border bg-white p-6 text-center shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_48px_rgba(0, 208, 156,0.1)] hover:-translate-y-1 transition-all duration-500 overflow-hidden relative ${
        member.isDirector
          ? 'border-violet-200 ring-2 ring-[#00D09C]/10'
          : 'border-gray-200/60'
      }`}
    >
      {/* Director badge */}
      {member.isDirector && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#006B50] to-[#00B386] text-[9px] font-black uppercase tracking-widest text-white">
            ⭐ Founder
          </span>
        </div>
      )}

      {/* Decorative background glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-violet-100/20 rounded-full blur-3xl group-hover:bg-violet-200/30 transition-all duration-700 -z-10" />

      {/* Profile Image */}
      <div className={`relative mb-5 h-36 w-36 overflow-hidden rounded-full border-4 shadow-[0_8px_24px_rgba(0, 208, 156,0.12)] ${
        member.isDirector ? 'border-[#00D09C]/30' : 'border-white'
      }`}>
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = member.fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00D09C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Name & Role */}
      <h3 className="text-base font-black text-gray-900 group-hover:text-[#00D09C] transition-colors duration-200">
        {member.name}
      </h3>
      <span className="mt-2 inline-block rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#00B386]">
        {member.role}
      </span>

      {/* Bio */}
      {member.bio && (
        <p className="mt-3 text-xs text-gray-400 font-medium leading-relaxed max-w-[180px]">
          {member.bio}
        </p>
      )}

      {/* Social Links */}
      <div className="mt-5 flex gap-2.5">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-all duration-200 hover:border-[#00D09C] hover:bg-[#00D09C] hover:text-white hover:scale-105 active:scale-95"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="h-4 w-4" />
          </a>
        )}
        {member.portfolio && (
          <a
            href={member.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-all duration-200 hover:border-[#00D09C] hover:bg-[#00D09C] hover:text-white hover:scale-105 active:scale-95"
            aria-label="Portfolio"
          >
            <FaBriefcase className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function TeamSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/20 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0, 208, 156,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0, 208, 156,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-violet-100/20 blur-3xl" />

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
            Our People
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-gray-900 leading-[1.2] mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-base text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            The passionate professionals driving Bundela Fin Corp&apos;s mission to make EV
            financing accessible across India.
          </p>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Core Team Group Photo */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Meet Our Core Team
            </h2>
            <p className="mt-2 text-sm text-gray-400 font-medium">
              The backbone of Bundela Fin Corp — united in purpose, driven by excellence.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-gray-200/50 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
            <img
              src="https://www.bundelafinance.com/img/team-group.jpeg"
              alt="Bundela Fin Corp Core Team"
              className="h-auto w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=80';
              }}
            />
            {/* Gradient overlay on group photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09070F]/60 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-xs font-extrabold uppercase tracking-widest text-violet-300 mb-1">
                  Bundela Fin Corp
                </p>
                <h3 className="text-xl sm:text-2xl font-black">Our Core Team — 2025</h3>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function Team() {
  return (
    <>
      <PageHeader
        title="Team Member"
        subtitle="Meet our Leadership Team"
        breadcrumb="Home / Team Member"
      />
      <TeamSection />
    </>
  );
}

export default Team;

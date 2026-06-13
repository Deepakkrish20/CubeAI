import PageHeader from '@/components/common/PageHeader';
import { FaLinkedinIn, FaBriefcase } from 'react-icons/fa';

const TEAM_MEMBERS = [
  {
    name: 'Abhay Singh',
    role: 'Director & Founder',
    image: '/img/abhaysir.jpeg',
    initials: 'AS',
    isDirector: true,
    linkedin: 'https://www.linkedin.com/in/abhay-manepuriya',
  },
  {
    name: 'Rahul Pal',
    role: 'Business Analyst',
    image: '/img/team-2.jpg',
    initials: 'RP',
    isDirector: false,
    linkedin: 'https://www.linkedin.com/in/',
  },
  {
    name: 'Shashank Anand',
    role: 'National Head - BD & partnership',
    image: '/img/img-6.jpeg',
    initials: 'SA',
    isDirector: false,
    linkedin: 'https://www.linkedin.com/in/shashank-anand-087b64252',
    portfolio: 'https://bundela-fincorp-national-head-portf.vercel.app/',
  },
  {
    name: 'Sharandeep Kaur',
    role: 'Head-HR & Operations',
    image: '/img/team-6.jpeg',
    initials: 'SK',
    isDirector: false,
    linkedin: 'https://www.linkedin.com/in/sharandeep-kaur-8a2a7b186',
  },
];

function Team() {
  return (
    <>
      <PageHeader
        title="Team Member"
        subtitle="Meet our Leadership Team"
        breadcrumb="Home / Team Member"
      />
      <div className="section-padding container py-12">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Our People
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Meet Our Leadership Team</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
            The passionate professionals driving Bundela Fin Corp&apos;s mission to make EV
            financing accessible across India.
          </p>
        </div>

        {/* Card Grid */}
        <div className="justify-content-center mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.name}
              className={`flex flex-col items-center overflow-hidden rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm ${
                member.isDirector ? 'border-primary ring-2 ring-primary/10' : ''
              }`}
            >
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full border-2 border-primary/20 bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-primary/10 text-xl font-bold text-primary">
                  {member.initials}
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
              <span className="mt-1.5 rounded-full border border-primary/10 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {member.role}
              </span>

              <div className="mt-4 flex gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-gray-200 p-2 transition hover:bg-primary hover:text-white"
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
                    className="rounded-full border border-gray-200 p-2 transition hover:bg-primary hover:text-white"
                    aria-label="Portfolio"
                  >
                    <FaBriefcase className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Core Team Section */}
        <div className="border-gray-150 border-t pt-12 text-center">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Meet Our Core Team</h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-sm">
            <img
              src="/img/team-group.jpeg"
              alt="Bundela Fin Corp Core Team"
              className="h-auto w-full rounded-xl object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="hidden py-12 font-semibold text-gray-500">
              Core team group photograph placeholder
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;

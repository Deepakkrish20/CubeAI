import PageHeader from '@/components/common/PageHeader';

const AWARDS = [
  {
    title: 'FE Mobility by Financial Express',
    description: 'Awarded for Excellence in Vehicle Finance & Leasing 2025 - New Delhi.',
    image: '/img/a1.jpg',
  },
  {
    title: 'Entrepreneur Startup Award 2025',
    description: 'Best EV Fintech of the year 2025 - Bengaluru.',
    image: '/img/a2.jpg',
  },
  {
    title: 'World Business Conclave 2025',
    description: 'EV Fintech of the year - Indore.',
    image: '/img/a3.jpg',
  },
  {
    title: '19th NBFC FinTech Conclave',
    description: 'Best EV Fintech of the year - New Delhi.',
    image: '/img/a5.jpg',
  },
  {
    title: '19th NBFC FinTech Conclave',
    description: 'Best EV Fintech of the year - New Delhi.',
    image: '/img/a6.jpg',
  },
  {
    title: 'Entrepreneur Startup Award',
    description: 'Honored for adopting modern tech in loan processing and delivery.',
    image: '/img/a4.jpg',
  },
  {
    title: 'FINX Conclave & Awards',
    description: 'Rising Leaders in digital financing.',
    image: '/img/a9.jpeg',
  },
  {
    title: 'Finx Conclave 2026',
    description: 'Rising leader in financial services award.',
    image: '/img/event2.jpeg',
  },
];

function Achievements() {
  return (
    <>
      <PageHeader
        title="Achievements"
        subtitle="Our Honours & Awards"
        breadcrumb="Home / Achievements"
      />
      <div className="section-padding container py-12">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Our Achievements
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Honours & Awards</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((award, index) => (
            <article
              key={index}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-gray-100 bg-gray-50">
                <img
                  src={award.image}
                  alt={award.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-sm font-bold text-gray-400">
                  Award Image Placeholder
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center p-5 text-center">
                <h3 className="mb-2 text-sm font-bold text-gray-900 md:text-base">{award.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{award.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Achievements;

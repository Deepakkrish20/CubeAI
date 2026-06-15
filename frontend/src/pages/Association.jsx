import PageHeader from '@/components/common/PageHeader';

const ASSOCIATIONS = [
  {
    name: 'EMFAI, Electric Mobility Financiers Association of India',
    description:
      'EMFAI (Electric Mobility Financiers Association of India) is a premier industry association committed to advancing the growth of electric mobility in India. It serves as a collaborative platform for financial institutions, manufacturers, service providers, and other stakeholders involved in the electric vehicle ecosystem. The association works towards strengthening the EV financing landscape by encouraging innovation, industry collaboration, and the adoption of sustainable transportation solutions. Bundela Fin Corp is a proud member of EMFAI and actively supports its vision of promoting green mobility, sustainable transportation, and accessible financing solutions for the electric vehicle sector.',
    logo: 'https://www.bundelafinance.com/img/c9.png',
    initials: 'EMFAI',
  },
  {
    name: 'FACE, Fintech Association for Consumer Empowerment',
    description:
      "The Fintech Association for Consumer Empowerment (FACE) is a leading industry body representing India's digital lending and fintech ecosystem. Recognised by the Reserve Bank of India (RBI) as the Self-Regulatory Organisation for the FinTech sector (SRO-FT), FACE plays a vital role in promoting responsible innovation, consumer protection, and ethical business practices within the industry. The association works closely with regulators, policymakers, and industry participants to establish standards that foster transparency, accountability, and trust in digital financial services. Bundela Fin Corp is a proud member of FACE and actively supports its vision of responsible financial innovation, consumer empowerment, and the development of a transparent and inclusive digital financial ecosystem.",
    logo: 'https://www.bundelafinance.com/img/c8.png',
    initials: 'FACE',
  },
  {
    name: 'SA-DHAN (Sa-Dhan, Fostering Inclusive Impact Finance)',
    description:
      "Sa-Dhan is India's first and largest association of Impact Finance Institutions and serves as an RBI-appointed Self-Regulatory Organization (SRO) for the microfinance sector. Established to promote inclusive finance and sustainable development, Sa-Dhan brings together a diverse network of financial institutions, microfinance organizations, banks, and development agencies working towards financial inclusion across the country. Bundela Fin Corp is a proud member of Sa-Dhan and actively supports its mission of promoting financial inclusion, responsible lending practices, and sustainable socio-economic development across India.",
    logo: 'https://www.bundelafinance.com/img/SA-DHAN.png',
    initials: 'Sa-Dhan',
  },
];

export function AssociationSection() {
  return (
    <div className="section-padding container space-y-12 py-12">
      <div className="mb-10 text-center">
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Associations
        </span>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">Our Associations</h2>
      </div>

      <div className="space-y-12">
        {ASSOCIATIONS.map((assoc, index) => (
          <div
            key={index}
            className={`border-gray-150 flex flex-col items-center gap-8 border-b pb-8 last:border-0 lg:flex-row ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Logo Area */}
            <div className="flex w-full flex-col items-center text-center lg:w-1/3">
              <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                <img
                  src={assoc.logo}
                  alt={assoc.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-lg font-bold text-gray-400">{assoc.initials}</div>
              </div>
              <h3 className="mt-4 max-w-xs text-sm font-bold text-gray-800 md:text-base">
                {assoc.name}
              </h3>
            </div>

            {/* Text Area */}
            <div className="w-full space-y-4 lg:w-2/3">
              <p className="text-gray-650 text-sm font-medium leading-relaxed">
                {assoc.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Association() {
  return (
    <>
      <PageHeader
        title="Association"
        subtitle="Our Industry Associations"
        breadcrumb="Home / Association"
      />
      <AssociationSection />
    </>
  );
}

export default Association;

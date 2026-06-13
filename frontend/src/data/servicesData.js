/**
 * Services section data — aligned with bundelafinance.com homepage.
 * Nine service categories with detailed blocks, image tags, routes, and feature tags.
 */

export const SERVICES_SECTION_META = {
  id: 'services',
  title: 'Our Financial Services',
};

const STANDARD_LOAN_FEATURES = [
  'Secured Loans',
  'Credit Facilities',
  'Fast Approval',
  'Affordable EMIs',
  'Cash Advanced',
];

export const servicesData = [
  {
    id: 'e-auto',
    title: 'E - Auto Loans',
    categoryTitle: 'E - Auto Loans',
    detailTitle: '12 Years Of Experience In E - Auto Loans',
    description:
      'With 12 years of expertise in providing seamless and reliable e-Auto Loans, Bundela Fin Corp has built a reputation for excellence and customer satisfaction.',
    shortDescription:
      'With 12 years of expertise in providing seamless and reliable e-Auto Loans, Bundela Fin Corp has built a reputation for excellence and customer satisfaction.',
    image: '/img/eauto.jpg',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: STANDARD_LOAN_FEATURES,
    order: 1,
  },
  {
    id: 'battery',
    title: 'Battery Financing',
    categoryTitle: 'Battery Financing',
    detailTitle: 'Powering Your Future with Smart Battery Financing',
    description:
      'Our goal is to help customers adopt clean energy solutions without financial burden. At Bundela Fin Corp, we provide simple, affordable and hassle-free financing options for EV batteries and energy storage systems.',
    shortDescription:
      'Our goal is to help customers adopt clean energy solutions without financial burden. At Bundela Fin Corp, we provide simple, affordable and hassle-free financing options for EV batteries and energy storage systems.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: [
      'EV Battery Financing',
      'Flexible Repayment Options',
      'Quick Loan Approval',
      'Affordable EMI Plans',
    ],
    order: 2,
  },
  {
    id: 'solar',
    title: 'Solar Financing',
    categoryTitle: 'Solar Financing',
    detailTitle: 'Smart Solar Financing Solutions',
    description:
      'Bundela Fin Corp provides smart and affordable solar financing solutions for residential, commercial and industrial solar projects. Our hassle-free process and flexible repayment options help customers switch to clean and sustainable energy with ease.',
    shortDescription:
      'Bundela Fin Corp provides smart and affordable solar financing solutions for residential, commercial and industrial solar projects. Our hassle-free process and flexible repayment options help customers switch to clean and sustainable energy with ease.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: [
      'Solar Panel Financing',
      'Flexible Repayment Plans',
      'Quick Loan Approval',
      'Affordable EMI Options',
      'Minimal Documentation',
    ],
    order: 3,
  },
  {
    id: 'fleet',
    title: 'Fleet Financing',
    categoryTitle: 'Fleet Financing',
    detailTitle: 'Drive Your Business Forward with Fleet Financing',
    description:
      'Fleet Financing solutions from Bundela Fin Corp are designed to help businesses expand and manage their transportation needs with ease. We provide affordable and flexible financing options for commercial vehicles, delivery fleets and business transportation solutions.',
    shortDescription:
      'Fleet Financing solutions from Bundela Fin Corp are designed to help businesses expand and manage their transportation needs with ease. We provide affordable and flexible financing options for commercial vehicles, delivery fleets and business transportation solutions.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: [
      'Commercial Vehicle Loans',
      'Flexible Financing Solutions',
      'Fast Approval Process',
      'Affordable EMI Plans',
      'Business Growth Support',
    ],
    order: 4,
  },
  {
    id: 'e-rickshaw',
    title: 'E - Rickshaw Loans',
    categoryTitle: 'E - Rickshaw Loans',
    detailTitle: '12 Years Of Experience In E- Rickshaw Loans',
    description:
      'Bundela Fin Corp has been a trusted partner for individuals and businesses seeking to own eco-friendly and affordable transportation solutions, with 12 years of expertise in providing E-Rickshaw loans.',
    shortDescription:
      'Bundela Fin Corp has been a trusted partner for individuals and businesses seeking to own eco-friendly and affordable transportation solutions, with 12 years of expertise in providing E-Rickshaw loans.',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: STANDARD_LOAN_FEATURES,
    order: 5,
  },
  {
    id: 'e-scooter',
    title: 'E - Scooter Loans',
    categoryTitle: 'E - Scooter Loans',
    detailTitle: '12 Years Of Experience In E- Scooter Loans',
    description:
      'We take pride in empowering our customers to own their dream two-wheelers with tailored loan options, competitive interest rates, and a seamless application process.',
    shortDescription:
      'We take pride in empowering our customers to own their dream two-wheelers with tailored loan options, competitive interest rates, and a seamless application process.',
    image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: STANDARD_LOAN_FEATURES,
    order: 6,
  },
  {
    id: 'used-car',
    title: 'Used Car Loans',
    categoryTitle: 'Used Car Loans',
    detailTitle: '12 Years Of Experience In Used Car Loans',
    description:
      'We pride ourselves on understanding the unique needs of our clients, offering tailored solutions that make vehicle ownership more accessible.',
    shortDescription:
      'We pride ourselves on understanding the unique needs of our clients, offering tailored solutions that make vehicle ownership more accessible.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: STANDARD_LOAN_FEATURES,
    order: 7,
  },
  {
    id: 'lap',
    title: 'Loan Against Property',
    categoryTitle: 'Loan Against Property',
    detailTitle: '12 Years Of Experience In Loan Against Property',
    description:
      'Bundela Fin Corp has earned the trust of customers by offering high-value, secure Loan Against Property solutions, backed by years of industry knowledge and a commitment to financial growth.',
    shortDescription:
      'Bundela Fin Corp has earned the trust of customers by offering high-value, secure Loan Against Property solutions, backed by years of industry knowledge and a commitment to financial growth.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: STANDARD_LOAN_FEATURES,
    order: 8,
  },
  {
    id: 'lcv',
    title: 'LCV Loans',
    categoryTitle: 'lcv',
    detailTitle: '12 Years Of Experience In Light Commercial Vehicle (LCV) Loan',
    description:
      'Bundela Fin Corp supports the backbone of transportation businesses through its expertise in LCV Loans, helping individuals and enterprises expand their commercial fleets with confidence and ease.',
    shortDescription:
      'Bundela Fin Corp supports the backbone of transportation businesses through its expertise in LCV Loans, helping individuals and enterprises expand their commercial fleets with confidence and ease.',
    image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=600&auto=format&fit=crop',
    route: '/apply-now',
    ctaText: 'Apply Now',
    features: STANDARD_LOAN_FEATURES,
    order: 9,
  },
];

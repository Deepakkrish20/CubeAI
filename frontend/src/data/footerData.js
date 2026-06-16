import { ROUTES } from '@/constants/routes';

export const footerData = {
  companyInfo: {
    description:
      'your trusted partner in financing the future of transportation. We specialize in providing easy, hassle-free e-vehicle loans tailored to help you make the switch to eco-friendly electric vehicles.',
  },
  quickLinks: [
    { id: 'about', label: 'About Us', path: ROUTES.ABOUT },
    { id: 'contact', label: 'Contact Us', path: ROUTES.CONTACT },
    { id: 'services', label: 'Our Services', path: ROUTES.SERVICES },
    { id: 'terms', label: 'Terms & Condition', action: 'terms' },
    { id: 'refund', label: 'Refund Policy', action: 'refund' },
    { id: 'privacy', label: 'Privacy & Policy', action: 'privacy' },
  ],
  serviceLinks: [
    { id: 'e-auto', label: 'E-Auto Loans', path: `${ROUTES.SERVICES}#e-auto` },
    { id: 'e-rickshaw', label: 'E-Rickshaw Loans', path: `${ROUTES.SERVICES}#e-rickshaw` },
    { id: 'e-scooter', label: 'E-Scooter Loans', path: `${ROUTES.SERVICES}#e-scooter` },
    { id: 'used-car', label: 'Used Car Loans', path: `${ROUTES.SERVICES}#used-car` },
    { id: 'emi-calc', label: 'Calculate Your EMI', path: ROUTES.EMI_CALCULATOR },
  ],
  contactDetails: {
    officeName: 'Bundela Fin Corp',
    address:
      'Bundela Fin Corp, C-420, 4th Floor, Block C Golden I, TechZone IV, Greater Noida West, 201308, Uttar Pradesh India..',
    phone: '+91-1205095106',
    email: 'info@bundelafinance.com',
  },
  socialLinks: [
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/bundelafincorp/',
    },
    { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/BundelaFinCorp/' },
    { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/bundelafincorp/' },
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      url: 'https://wa.me/+919266372051',
    },
  ],
  newsletter: {
    title: 'Newsletter',
    description: 'Drive into the Future with Bundela Fin Corp’s E-Vehicle Loans!',
  },
  copyright: {
    text: 'Bundela Fin Corp, All Right Reserved.',
    designerName: '7 Techies',
    designerUrl: 'https://7techie.com',
  },
};

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Bundela Finance',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
};

export const CONTACT_INFO = {
  location: 'Greater Noida, Uttar Pradesh',
  phone: '+91-1205095106',
  email: 'info@bundelafinance.com',
  address:
    'Bundela Fin Corp, C-420, 4th Floor, Block C Golden I, TechZone IV, Greater Noida West, 201308, Uttar Pradesh, India',
  hours: '9.00 am - 7.00 pm',
};

export const LOAN_TYPES = [
  { value: 'e-auto', label: 'E-Auto Loans' },
  { value: 'battery', label: 'Battery Financing' },
  { value: 'solar', label: 'Solar Financing' },
  { value: 'fleet', label: 'Fleet Financing' },
  { value: 'e-rickshaw', label: 'E-Rickshaw Loans' },
  { value: 'e-scooter', label: 'E-Scooter Loans' },
  { value: 'used-car', label: 'Used Car Loans' },
  { value: 'lap', label: 'Loan Against Property' },
  { value: 'lcv', label: 'Light Commercial Vehicle (LCV)' },
];

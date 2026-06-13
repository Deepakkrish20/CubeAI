export const isValidPartner = (partner) => {
  if (!partner || typeof partner !== 'object') return false;
  if (!partner.id || typeof partner.id !== 'string') return false;
  if (!partner.name || typeof partner.name !== 'string') return false;
  return true;
};

export const resolvePartners = (data) => {
  if (!Array.isArray(data)) return [];
  return data.filter(isValidPartner).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

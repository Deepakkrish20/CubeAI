export const isValidService = (service) => {
  if (!service || typeof service !== 'object') return false;
  if (!service.id || typeof service.id !== 'string') return false;
  const title = service.title || service.categoryTitle;
  if (!title || typeof title !== 'string') return false;
  return true;
};

export const resolveServices = (data) => {
  if (!Array.isArray(data)) return [];
  return data.filter(isValidService).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

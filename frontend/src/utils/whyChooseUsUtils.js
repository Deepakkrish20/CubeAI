/**
 * Why Choose Us data utilities — validation and ordering.
 */

export const isValidValueProposition = (item) => {
  if (!item || typeof item !== 'object') return false;
  if (!item.id || typeof item.id !== 'string') return false;
  if (!item.title || typeof item.title !== 'string') return false;
  return true;
};

export const resolveValuePropositions = (data) => {
  if (!Array.isArray(data)) return [];

  return data.filter(isValidValueProposition).sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
};

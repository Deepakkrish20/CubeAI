/**
 * Statistics data utilities — validation, display resolution, and animation config.
 * Keeps StatisticsSection presentation-agnostic and API-ready.
 */

/**
 * Validate a single statistic object has the minimum fields required to render.
 */
export const isValidStatistic = (stat) => {
  if (!stat || typeof stat !== 'object') return false;
  if (!stat.id || typeof stat.id !== 'string') return false;
  if (!stat.label || typeof stat.label !== 'string') return false;

  const hasDisplayValue = stat.value !== null && stat.value !== undefined && stat.value !== '';
  const hasEndValue = stat.endValue !== null && stat.endValue !== undefined;

  return hasDisplayValue || hasEndValue;
};

/**
 * Resolve and sort statistics from a data source (static array or future API response).
 */
export const resolveStatistics = (data) => {
  if (!Array.isArray(data)) return [];

  return data.filter(isValidStatistic).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

/**
 * Resolve the value string shown before animations are implemented.
 */
export const getDisplayValue = (stat) => {
  if (stat.value !== null && stat.value !== undefined && stat.value !== '') {
    return String(stat.value);
  }

  if (stat.endValue !== null && stat.endValue !== undefined) {
    return String(stat.endValue);
  }

  return '—';
};

/**
 * Animation configuration for future count-up integration (e.g. react-countup).
 * Not used for rendering yet — exposed via data attributes on each metric block.
 */
export const getAnimationConfig = (stat) => {
  const parsedValue = Number(stat.value);
  const fallbackEndValue = Number.isFinite(parsedValue) ? parsedValue : 0;

  return {
    startValue: stat.startValue ?? 0,
    endValue: stat.endValue ?? fallbackEndValue,
    duration: stat.duration ?? 2000,
    suffix: stat.suffix ?? '',
    prefix: stat.prefix ?? '',
    enabled: stat.animate !== false && stat.endValue !== undefined,
  };
};

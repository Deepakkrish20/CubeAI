import { statisticsData, STATISTICS_SECTION_META } from '@/data/statisticsData';
import { resolveStatistics, getDisplayValue, getAnimationConfig } from '@/utils/statisticsUtils';

const UNAVAILABLE_MESSAGE = 'Statistics are currently unavailable.';

function StatisticItem({ stat }) {
  const Icon = stat.icon;
  const displayValue = getDisplayValue(stat);
  const animationConfig = getAnimationConfig(stat);
  const suffix = stat.suffix ?? '';
  const prefix = stat.prefix ?? '';

  return (
    <article
      className="border border-gray-200 p-4 text-center"
      aria-labelledby={`stat-label-${stat.id}`}
      data-stat-id={stat.id}
      data-start-value={animationConfig.startValue}
      data-end-value={animationConfig.endValue}
      data-duration={animationConfig.duration}
      data-suffix={animationConfig.suffix}
      data-prefix={animationConfig.prefix}
      data-animate={animationConfig.enabled ? 'true' : 'false'}
    >
      {Icon && <Icon className="mx-auto mb-2 h-6 w-6 text-gray-700" aria-hidden="true" />}

      <p className="text-2xl font-semibold text-gray-900">
        {prefix}
        {displayValue}
        {suffix}
      </p>

      <h3 id={`stat-label-${stat.id}`} className="mt-1 text-sm font-medium text-gray-800">
        {stat.label}
      </h3>
    </article>
  );
}

function StatisticsSection({ data = statisticsData, meta = STATISTICS_SECTION_META }) {
  const statistics = resolveStatistics(data);

  if (statistics.length === 0) {
    return (
      <section id={meta?.id ?? 'statistics'} className="w-full border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={meta?.id ?? 'statistics'} className="w-full border-t border-gray-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <StatisticItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;

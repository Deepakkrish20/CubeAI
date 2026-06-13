import { FaCheckCircle } from 'react-icons/fa';
import { whyChooseUsData, WHY_CHOOSE_US_SECTION_META } from '@/data/whyChooseUsData';
import { resolveValuePropositions } from '@/utils/whyChooseUsUtils';

const UNAVAILABLE_MESSAGE = 'We are currently updating our key advantages.';

function ValuePropositionItem({ item }) {
  const Icon = item.icon ?? FaCheckCircle;

  return (
    <article className="border border-gray-200 p-4" aria-labelledby={`vp-title-${item.id}`}>
      <Icon className="mb-2 h-6 w-6 text-gray-700" aria-hidden="true" />
      <h3 id={`vp-title-${item.id}`} className="text-base font-medium text-gray-800">
        {item.title}
      </h3>
      {item.description && <p className="mt-2 text-sm text-gray-600">{item.description}</p>}
    </article>
  );
}

function WhyChooseUs({ data = whyChooseUsData, meta = WHY_CHOOSE_US_SECTION_META }) {
  const propositions = resolveValuePropositions(data);

  if (propositions.length === 0) {
    return (
      <section id={meta?.id ?? 'why-choose-us'} className="w-full border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={meta?.id ?? 'why-choose-us'} className="w-full border-t border-gray-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-6">
          {meta?.eyebrow && <p className="text-sm text-gray-500">{meta.eyebrow}</p>}
          {meta?.title && (
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{meta.title}</h2>
          )}
          {meta?.subtitle && <p className="mt-2 text-sm text-gray-600">{meta.subtitle}</p>}
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {propositions.map((item) => (
            <ValuePropositionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

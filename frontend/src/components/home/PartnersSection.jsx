import { partnersData, PARTNERS_SECTION_META } from '@/data/partnersData';
import { resolvePartners } from '@/utils/partnersUtils';

const UNAVAILABLE_MESSAGE = 'Partner information is currently unavailable.';

function PartnersSection({ data = partnersData, meta = PARTNERS_SECTION_META }) {
  const partners = resolvePartners(data);

  if (partners.length === 0) {
    return (
      <section id={meta?.id ?? 'partners'} className="w-full border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={meta?.id ?? 'partners'} className="w-full border-t border-gray-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-6">
          {meta?.eyebrow && <p className="text-sm text-gray-500">{meta.eyebrow}</p>}
          {meta?.title && (
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{meta.title}</h2>
          )}
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <article key={partner.id} className="border border-gray-200 p-4 text-center">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="mx-auto h-12 object-contain"
                />
              ) : (
                <p className="text-sm font-medium text-gray-800">{partner.name}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;

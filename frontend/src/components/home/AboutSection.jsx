import { aboutData, ABOUT_SECTION_META } from '@/data/aboutData';

const UNAVAILABLE_MESSAGE = 'Company information is currently unavailable.';

/**
 * AboutSection — Reference-aligned company overview and trust pillars.
 */
function AboutSection({ data = aboutData, meta = ABOUT_SECTION_META }) {
  if (!data || !Array.isArray(data.paragraphs) || data.paragraphs.length === 0) {
    return (
      <section id={meta?.id ?? 'about'} className="w-full border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  const trustPillars = Array.isArray(data.trustPillars) ? data.trustPillars : [];

  return (
    <section id={meta?.id ?? 'about'} className="w-full border-t border-gray-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-6">
          {meta?.eyebrow && <p className="text-sm text-gray-500">{meta.eyebrow}</p>}
          {meta?.title && (
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{meta.title}</h2>
          )}
        </header>

        <div className="space-y-4">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        {trustPillars.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {trustPillars.map((pillar) => (
              <article key={pillar.id} className="border border-gray-200 p-4">
                {pillar.title && (
                  <h3 className="text-base font-medium text-gray-800">{pillar.title}</h3>
                )}
                {pillar.description && (
                  <p className="mt-2 text-sm text-gray-600">{pillar.description}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutSection;

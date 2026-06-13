import { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData, SERVICES_SECTION_META } from '@/data/servicesData';
import { resolveServices } from '@/utils/servicesUtils';

const UNAVAILABLE_MESSAGE = 'Services are currently unavailable.';

function ServicesSection({ data = servicesData, meta = SERVICES_SECTION_META }) {
  const services = resolveServices(data);
  const [activeTabId, setActiveTabId] = useState(services[0]?.id || '');

  // Fallback check if services array is empty
  if (services.length === 0) {
    return (
      <section
        id={meta?.id ?? 'services'}
        className="w-full border-t border-gray-200 bg-gray-50 py-8"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="font-medium text-gray-600">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </section>
    );
  }

  // Retrieve details of the currently active service
  const activeService = services.find((s) => s.id === activeTabId) || services[0];
  const features = Array.isArray(activeService.features) ? activeService.features : [];

  return (
    <section id={meta?.id ?? 'services'} className="w-full border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 text-center md:text-left">
          {meta?.title && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{meta.title}</h2>
          )}
        </header>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left/Top Sidebar: Tab buttons */}
          <div className="flex flex-col gap-2.5 lg:col-span-4">
            {services.map((service) => {
              const isActive = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTabId(service.id)}
                  className={`flex w-full items-center justify-between rounded-lg border p-4 text-left text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  type="button"
                >
                  <span>{service.title || service.categoryTitle || 'Unnamed Service'}</span>
                  <span className={`ml-2 text-xs ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    &#9656;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right/Bottom Content Pane: Active Service Details */}
          <div className="flex flex-col gap-8 rounded-xl border border-gray-200 bg-gray-50 p-6 md:flex-row md:p-8 lg:col-span-8">
            {/* Service details column */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {activeService.detailTitle || activeService.title || 'Service Details'}
                </h3>

                {activeService.shortDescription || activeService.description ? (
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {activeService.shortDescription || activeService.description}
                  </p>
                ) : (
                  <p className="mb-6 text-sm italic text-gray-400">No description available.</p>
                )}

                {/* Features List */}
                {features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Key Highlights
                    </h4>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {features.map((feature, idx) => (
                        <li
                          key={`${feature}-${idx}`}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <span className="mr-2 text-base font-bold text-secondary">
                            &#10003;
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Link
                  to={activeService.route || '/apply-now'}
                  state={{ preselectedService: activeService.id }}
                  className="hover:bg-primary-dark inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors duration-200"
                >
                  {activeService.ctaText || 'Apply Now'}
                </Link>
              </div>
            </div>

            {/* Service Image column */}
            <div className="flex w-full flex-shrink-0 items-center justify-center md:w-72">
              {activeService.image ? (
                <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-200 bg-white md:h-64">
                  <img
                    src={activeService.image}
                    alt={activeService.title || 'Service image'}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder image if URL fails
                      e.target.onerror = null;
                      e.target.src =
                        'https://placehold.co/400x300/e2e8f0/64748b?text=Service+Image';
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-48 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-400 md:h-64">
                  Placeholder Image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

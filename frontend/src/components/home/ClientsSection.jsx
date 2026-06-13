import { clientsData, CLIENTS_SECTION_META } from '@/data/clientsData';

/**
 * ClientsSection — logo grid placeholder aligned with reference homepage.
 * Reference shows "Our Clients" as a visual logo strip; assets added in UI phase.
 */
function ClientsSection({ data = clientsData, meta = CLIENTS_SECTION_META }) {
  const clients = Array.isArray(data) ? data : [];

  return (
    <section id={meta?.id ?? 'clients'} className="w-full border-t border-gray-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {meta?.title && <h2 className="mb-6 text-xl font-semibold text-gray-900">{meta.title}</h2>}

        {clients.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <article key={client.id} className="border border-gray-200 p-4 text-center">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="mx-auto h-10 object-contain"
                  />
                ) : (
                  <p className="text-sm text-gray-600">{client.name}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Client logos will be displayed here.</p>
        )}
      </div>
    </section>
  );
}

export default ClientsSection;

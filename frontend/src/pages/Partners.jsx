import PageHeader from '@/components/common/PageHeader';
import PartnersSection from '@/components/home/PartnersSection';
import ClientsSection from '@/components/home/ClientsSection';

function Partners() {
  return (
    <>
      <PageHeader
        title="Lending Partners"
        subtitle="Our trusted financial associations"
        breadcrumb="Home / Partners"
      />
      <div className="section-padding py-4">
        <PartnersSection />
        <ClientsSection />
      </div>
    </>
  );
}

export default Partners;

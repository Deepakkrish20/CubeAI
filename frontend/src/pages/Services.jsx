import PageHeader from '@/components/common/PageHeader';
import ServicesSection from '@/components/home/ServicesSection';

function Services() {
  return (
    <>
      <PageHeader
        title="Our Financial Services"
        subtitle="Innovative and accessible financing options"
        breadcrumb="Home / Services"
      />
      <div className="section-padding py-4">
        <ServicesSection />
      </div>
    </>
  );
}

export default Services;

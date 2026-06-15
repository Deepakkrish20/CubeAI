import PageHeader from '@/components/common/PageHeader';
import ServicesSection from '@/components/home/ServicesSection';
import EmiCalculatorSection from '@/components/calculator/EmiCalculatorSection';

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
      <div className="section-padding bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <EmiCalculatorSection />
        </div>
      </div>
    </>
  );
}

export default Services;

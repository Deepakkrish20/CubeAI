import PageHeader from '@/components/common/PageHeader';
import EmiCalculatorSection from '@/components/calculator/EmiCalculatorSection';

function EmiCalculator() {
  return (
    <>
      <PageHeader
        title="EMI Calculator"
        subtitle="Estimate your monthly loan EMIs for flat and reducing interest rates"
        breadcrumb="Home / EMI Calculator"
      />
      <div className="section-padding bg-gray-50 py-12">
        <EmiCalculatorSection />
      </div>
    </>
  );
}

export default EmiCalculator;

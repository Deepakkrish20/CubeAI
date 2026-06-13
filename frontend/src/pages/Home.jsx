import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesSection from '@/components/home/ServicesSection';
import PartnersSection from '@/components/home/PartnersSection';
import ClientsSection from '@/components/home/ClientsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

/**
 * Home page — section order aligned with bundelafinance.com homepage.
 */
function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <WhyChooseUs />
      <ServicesSection />
      <PartnersSection />
      <ClientsSection />
      <TestimonialsSection />
    </div>
  );
}

export default Home;

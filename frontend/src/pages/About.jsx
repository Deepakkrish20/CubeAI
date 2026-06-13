import PageHeader from '@/components/common/PageHeader';
import AboutSection from '@/components/home/AboutSection';

function About() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="We Help Our Clients To Grow Their Business"
        breadcrumb="Home / About"
      />
      <AboutSection />
    </>
  );
}

export default About;

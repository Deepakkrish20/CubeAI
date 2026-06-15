import PageHeader from '@/components/common/PageHeader';
import AboutSection from '@/components/home/AboutSection';
import DirectorMessageSection from '@/components/about/DirectorMessageSection';
import { TeamSection } from '@/pages/Team';
import { AchievementsSection } from '@/pages/Achievements';
import { AssociationSection } from '@/pages/Association';

function About() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="We Help Our Clients To Grow Their Business"
        breadcrumb="Home / About"
      />
      <AboutSection />
      <DirectorMessageSection />
      <TeamSection />
      <AchievementsSection />
      <AssociationSection />
    </>
  );
}

export default About;

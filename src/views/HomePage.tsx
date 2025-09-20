import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import ReadyToCollaborateSection from '../components/sections/ReadyToCollaborateSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <CertificatesSection />
      <ReadyToCollaborateSection />
      {/* <ProfessionalProjectSection /> */}
      <ContactSection />
    </MainLayout>
  );
};

export default HomePage;
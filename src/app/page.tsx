import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Marquee } from "../components/Marquee";
import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { StatsSection } from "../components/StatsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <Marquee />
        <AboutSection />
        <ExperienceSection />
        <StatsSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

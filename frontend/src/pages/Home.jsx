import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import FeaturedStartupsSection from "../components/home/FeaturedStartupsSection";
import RoleFeaturesSection from "../components/home/RoleFeaturesSection";
import CtaSection from "../components/home/CtaSection";

function Home() {
  const { projects } = useSelector((state) => state.projects);
  const totalFunded = projects.reduce((acc, p) => acc + p.fundingRaised, 0);
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const fundedProjects = projects.filter((p) => p.status === "funded").length;
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <HeroSection projects={projects} navigate={navigate} />
      <StatsSection
        projects={projects}
        totalFunded={totalFunded}
        activeProjects={activeProjects}
        fundedProjects={fundedProjects}
      />
      <HowItWorksSection />
      <FeaturedStartupsSection projects={projects} navigate={navigate} />
      <RoleFeaturesSection />
      <CtaSection />
    </div>
  );
}

export default Home;

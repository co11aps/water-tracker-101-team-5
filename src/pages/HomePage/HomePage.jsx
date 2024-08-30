import HomePageContainer from "../../components/HomePageContainer/HomePageContainer";
import HeroSection from "../../components/HeroSection/HeroSection";
import TrackerSection from "../../components/TrackerSection/TrackerSection";

export default function HomePage() {
  return (
    <HomePageContainer>
      <HeroSection />
      <TrackerSection />
    </HomePageContainer>
  );
}

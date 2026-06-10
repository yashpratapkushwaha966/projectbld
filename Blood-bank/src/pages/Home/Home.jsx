import Hero from "../../components/Hero";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import EmergencyBanner from "./EmergencyBanner";
import RecentRequests from "./RecentRequests";
import HospitalPreview from "./HospitalPreview";
import SuccessStories from "./SuccessStories";
import CTA from "./CTA";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <EmergencyBanner />
      <RecentRequests />
      <HospitalPreview />
      <SuccessStories />
      <CTA />
    </>
  );
}
export default Home;

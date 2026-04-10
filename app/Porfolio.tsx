import Navbar from "../components/navbar";
import FirstSection from "../components/firstsection";
import SecondSection from "../components/secondsection";
import MasteredTechSection from "../components/masteredtechsection";
import AboutMeSection from "../components/aboutmesection";
import OtherTechStack from "../components/othertechstack";
import SecondLastSection from "../components/2ndlastsection";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#d7d9e1] flex flex-col">
      <Navbar />
      <FirstSection />
      <SecondSection />
			<MasteredTechSection />
			<AboutMeSection />
      <OtherTechStack />
			<SecondLastSection />
			<Footer />
    </main>
  );
}

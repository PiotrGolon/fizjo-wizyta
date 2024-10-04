import AnimatedSection from "@/components/animated-section";
import AnimatedSectionContrast from "@/components/animated-section-contrast";
import Banner from "@/components/banner";
import Billboard from "@/components/billboard";
import Services from "@/components/services";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Billboard />
      <Services />
      <AnimatedSection
        imageSrc="/images/tomasz-deput-gabinet.webp"
        altText="gabinet zdjęcie"
        title="Profesjonalna rehabilitacja"
        description="Oferujemy kompleksowe programy rehabilitacyjne dostosowane do Twoich potrzeb."
      />
      <AnimatedSectionContrast
        imageSrc="/images/tomasz-deput-gabinet-2.webp"
        altText="Indywidualne Podejście"
        title="Indywidualne Podejście"
        description="Każdy pacjent jest dla nas wyjątkowy. Stosujemy indywidualne metody terapeutyczne."
      />
      <AnimatedSection
        imageSrc="/images/tomasz-deput-cwiczenie.webp"
        altText="Zaawansowane Techniki"
        title="Zaawansowane Techniki"
        description="Korzystamy z najnowszych technologii i technik fizjoterapeutycznych, aby zapewnić najlepsze rezultaty."
      />
      <Banner />
    </div>
  );
}

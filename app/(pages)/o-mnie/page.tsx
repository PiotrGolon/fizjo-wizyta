import About from "@/components/about";
import AnimatedSectionContrastSmall from "@/components/animated-section-contrast-small";
import AnimatedSectionSmall from "@/components/animated-section-small";
import BannerAbout from "@/components/banner-about";
import PassionCircle from "@/components/passion-circle";

const AboutMePage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <PassionCircle />
      <About />
      <AnimatedSectionSmall
        imageSrc="/images/olimpiada.webp"
        altText="gabinet zdjęcie"
        title="Profesjonalna rehabilitacja"
        description="Oferujemy kompleksowe programy rehabilitacyjne dostosowane do Twoich potrzeb."
      />
      <AnimatedSectionContrastSmall
        imageSrc="/images/mistrz-przycięte.jpg"
        altText="Indywidualne Podejście"
        title="Indywidualne Podejście"
        description="Każdy pacjent jest dla nas wyjątkowy. Stosujemy indywidualne metody terapeutyczne."
      />
      <AnimatedSectionSmall
        imageSrc="/images/mistrz-fen.webp"
        altText="gabinet zdjęcie"
        title="Profesjonalna rehabilitacja"
        description="Oferujemy kompleksowe programy rehabilitacyjne dostosowane do Twoich potrzeb."
      />
      <AnimatedSectionContrastSmall
        imageSrc="/images/gala.jpg"
        altText="Indywidualne Podejście"
        title="Indywidualne Podejście"
        description="Każdy pacjent jest dla nas wyjątkowy. Stosujemy indywidualne metody terapeutyczne."
      />
      <BannerAbout />
    </div>
  );
};

export default AboutMePage;

import AnimatedSectionIcon from "@/components/animated-section-icon";
import AnimatedSectionIconContrast from "@/components/animated-section-icon-contrast";
import dynamic from "next/dynamic";

// import MapComponent from "@/components/map-location-component";

const DynamicMap = dynamic(
  () => import("../../../components/map-location-component"),
  { ssr: false }
);

const ContactPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <AnimatedSectionIcon
        imageSrc="/images/place_location.svg"
        altText="location icon"
        title="Moja lokalizacja"
        description="Andrzeja 3, 05-800 Pruszków"
        notes="(Miejska Kryta Pływalnia KAPRY)"
        openingHours="7:30 - 22:00"
      />
      <AnimatedSectionIconContrast
        imageSrc="/images/phone-ringing.svg"
        altText="location icon"
        title="Kontakt"
        description="tel. 791-690-347"
        notes="e-mail: tomasz.deput@o2.pl"
        preferations="Preferowany kontakt SMS"
      />
      <DynamicMap latitude={52.1621091} longitude={20.8222591} />
    </div>
  );
};

export default ContactPage;

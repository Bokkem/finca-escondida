import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GallerySection from "@/components/sections/GallerySection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import BookingSection from "@/components/sections/BookingSection";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <AmenitiesSection />
      <BookingSection />
      <LocationSection />
      <Footer />
      <BackToTop />
    </main>
  );
}

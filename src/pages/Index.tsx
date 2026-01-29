import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import BrandsSection from '@/components/BrandsSection';
import ServicesSection from '@/components/ServicesSection';
import LocationsSection from '@/components/LocationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Take-off Phase */}
      <HeroSection />
      
      {/* Brands - Climb Phase */}
      <section id="brands">
        <BrandsSection />
      </section>
      
      {/* Services - Cruise Phase */}
      <section id="services">
        <ServicesSection />
      </section>
      
      {/* Locations - Approach Phase */}
      <section id="locations">
        <LocationsSection />
      </section>
      
      {/* Contact - Landing Phase */}
      <section id="contact">
        <ContactSection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

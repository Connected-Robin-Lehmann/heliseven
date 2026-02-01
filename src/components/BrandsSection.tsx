import { motion } from 'framer-motion';
import BrandCard from './BrandCard';

import HeliSevenLogo from '@/assets/logos/HeliSevenGroup_logo.svg';
import HeliToursLogo from '@/assets/logos/HeliTours_logo.svg';
import HeliSxoolLogo from '@/assets/logos/HeliSxool_logo.svg';
import HeliWorksLogo from '@/assets/logos/HeliWorks_logo.svg';
import HeliEventsLogo from '@/assets/logos/HeliEvents_logo.svg';

const brands = [
  {
    name: 'HeliTours',
    tagline: 'Panorama. Abenteuer. Perspektive.',
    description: 'Atemberaubende Hubschrauber-Rundflüge. Von verschiedenen Standorten aus können Passagiere Städte wie Mannheim, Stuttgart oder Heidelberg sowie Naturlandschaften wie die Weinstraße aus der Vogelperspektive erleben.',
    logo: HeliToursLogo,
    flightMode: 'TOURING',
  },
  {
    name: 'HeliSxool',
    tagline: 'Fokus. Präzision. Exzellenz.',
    description: 'Professionelle Ausbildung zum Piloten. Hier können Flugschüler sowohl die Privatpilotenlizenz (PPL-H) als auch berufliche Lizenzen (CPL-H, ATPL-H) erwerben, ergänzt durch moderne Simulatortrainings.',
    logo: HeliSxoolLogo,
    flightMode: 'TRAINING',
  },
  {
    name: 'HeliWorks',
    tagline: 'Kraft. Zuverlässigkeit. Einsatz.',
    description: 'Spezialisierte Arbeits- und Lastenflüge. Technisch anspruchsvolle Einsätze wie Film- und Fotoflüge, Kontrolle von Pipelines und Stromleitungen, Laserscan-Befliegungen sowie Transport von Außenlasten.',
    logo: HeliWorksLogo,
    flightMode: 'MISSION',
  },
  {
    name: 'HeliEvents',
    tagline: 'Prestige. Exklusivität. Glanz.',
    description: 'Exklusive Flugerlebnisse für besondere Anlässe. Von emotionalen Highlights wie Hochzeitsflügen und Heiratsanträgen bis hin zu Corporate Events und VIP-Shuttle-Services.',
    logo: HeliEventsLogo,
    flightMode: 'VIP',
  },
];

const BrandsSection = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 hud-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="tech-label text-primary mb-4 block">CLIMB PHASE / MISSION SELECT</span>
          <h2 className="headline-hero text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Unsere <span className="text-gradient-primary">Marken</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vier spezialisierte Marken unter einem Dach. Jede mit ihrer eigenen Mission, 
            vereint durch Leidenschaft für die Luftfahrt.
          </p>
        </motion.div>

        {/* Flight Path Line */}
        <motion.div 
          className="relative mb-12 hidden md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flight-path w-full" />
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
        </motion.div>

        {/* Brand Cards Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {brands.map((brand, index) => (
            <BrandCard key={brand.name} {...brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;

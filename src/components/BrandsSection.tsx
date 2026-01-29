import { motion } from 'framer-motion';
import BrandCard from './BrandCard';

import HeliSevenLogo from '@/assets/logos/HeliSevenGroup_logo.svg';
import HeliToursLogo from '@/assets/logos/HeliTours_logo.svg';
import HeliSxoolLogo from '@/assets/logos/HeliSxool_logo.svg';
import HeliWorksLogo from '@/assets/logos/HeliWorks_logo.svg';
import HeliEventsLogo from '@/assets/logos/HeliEvents_logo.svg';

const brands = [
  {
    name: 'HeliSeven',
    tagline: 'Emotion. Freiheit. Horizont.',
    description: 'Die Muttermarke für unvergessliche Helikopter-Erlebnisse. Vom ersten Sonnenstrahl bis zum goldenen Sonnenuntergang – wir heben ab.',
    logo: HeliSevenLogo,
    flightMode: 'EXPERIENCE',
  },
  {
    name: 'HeliTours',
    tagline: 'Panorama. Abenteuer. Perspektive.',
    description: 'Rundflüge über atemberaubende Landschaften. Berge, Städte und Küsten aus einer völlig neuen Perspektive erleben.',
    logo: HeliToursLogo,
    flightMode: 'TOURING',
  },
  {
    name: 'HeliSxool',
    tagline: 'Fokus. Präzision. Exzellenz.',
    description: 'Professionelle Pilotenausbildung auf höchstem Niveau. Vom PPL bis zum ATPL – Ihr Weg zum Cockpit beginnt hier.',
    logo: HeliSxoolLogo,
    flightMode: 'TRAINING',
  },
  {
    name: 'HeliWorks',
    tagline: 'Kraft. Zuverlässigkeit. Einsatz.',
    description: 'Industrielle Helikopter-Dienstleistungen. Lastenflüge, Windrad-Montage, Baulogistik – wenn es darauf ankommt.',
    logo: HeliWorksLogo,
    flightMode: 'MISSION',
  },
  {
    name: 'HeliEvents',
    tagline: 'Prestige. Exklusivität. Glanz.',
    description: 'VIP-Transfers und unvergessliche Events. Nachtflüge über funkelnde Städte, Premium-Service für besondere Anlässe.',
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
            Fünf spezialisierte Marken unter einem Dach. Jede mit ihrer eigenen Mission, 
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

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.slice(0, 3).map((brand, index) => (
            <BrandCard key={brand.name} {...brand} index={index} />
          ))}
        </div>
        
        {/* Second Row - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {brands.slice(3).map((brand, index) => (
            <BrandCard key={brand.name} {...brand} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;

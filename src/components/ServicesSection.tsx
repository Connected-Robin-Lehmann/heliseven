import { motion } from 'framer-motion';
import { Plane, GraduationCap, Building2, PartyPopper, Briefcase, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: GraduationCap,
    title: 'Ausbildung',
    description: 'Praxisnahe Pilotenausbildung mit professioneller Begleitung auf dem Weg in die Helikopterfliegerei.',
  },
  {
    icon: Plane,
    title: 'Rundflüge',
    description: 'Unvergessliche Helikoptererlebnisse – von Panoramaflügen bis zu exklusiven individuellen Touren.',
  },
  {
    icon: Plane,
    title: 'Pilot for a Day',
    description: 'Selbst ins Cockpit steigen und die Faszination Helikopterfliegen hautnah erleben.',
  },
  {
    icon: Briefcase,
    title: 'Business',
    description: 'Effiziente Helikopterlösungen für Unternehmen – von Business-Flügen bis zu individuellen Lufttransporten.',
  },
  {
    icon: PartyPopper,
    title: 'Events',
    description: 'Außergewöhnliche Events mit Helikoptereinsatz, die Emotionen wecken und bleibende Eindrücke hinterlassen.',
  },
  {
    icon: Wrench,
    title: 'Works',
    description: 'Professionelle Helikopter-Dienstleistungen für Arbeitsflüge, Spezialaufträge und technische Einsätze.',
  },
];

const ServicesSection = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="tech-label text-primary mb-4 block">CRUISE PHASE / SERVICES</span>
          <h2 className="headline-hero text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Unsere <span className="text-gradient-primary">Leistungen</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Von Erlebnisflügen bis zu Spezialoperationen – 
            wir bieten das gesamte Spektrum moderner Luftfahrt.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative glass-panel rounded-sm p-6 text-center hover:border-primary/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 mb-4">
                {/* Radar circle behind icon */}
                <div className="absolute inset-0 rounded-full border border-primary/20 group-hover:border-primary/40 transition-colors" />
                <div className="absolute inset-2 rounded-full border border-primary/10 group-hover:border-primary/20 transition-colors" />
                <service.icon className="w-6 h-6 text-primary relative z-10" />
              </div>

              {/* Title */}
              <h3 className="text-foreground font-medium mb-2 tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom highlight on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hud" size="lg">
            Alle Leistungen entdecken
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

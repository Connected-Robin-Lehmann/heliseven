import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const locations = [
  {
    city: 'Mannheim',
    airport: 'EDFM',
    address: 'City Airport Mannheim',
    // Approximate position on simplified southern Germany map (viewBox 0 0 200 140)
    mapX: 52,
    mapY: 38,
  },
  {
    city: 'Stuttgart',
    airport: 'EDDS',
    address: 'Flughafen Stuttgart',
    mapX: 68,
    mapY: 62,
  },
  {
    city: 'Augsburg',
    airport: 'EDMA',
    address: 'Flughafen Augsburg',
    mapX: 130,
    mapY: 72,
  },
];

// Simplified outline of southern Germany / Baden-Württemberg + Bayern region
const GermanyOutline = () => (
  <path
    d="M20,10 L45,5 L80,8 L110,3 L145,6 L175,12 L190,25 L185,50 L180,75 L170,95 L155,110 L135,120 L110,130 L85,125 L60,115 L40,100 L25,80 L15,55 L12,35 Z"
    fill="none"
    stroke="hsl(var(--primary))"
    strokeWidth="0.8"
    opacity="0.3"
  />
);

const MiniMap = ({ activeX, activeY, allLocations }: { activeX: number; activeY: number; allLocations: typeof locations }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Grid lines */}
    {[0, 35, 70, 105, 140].map(y => (
      <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.1" />
    ))}
    {[0, 50, 100, 150, 200].map(x => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="140" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.1" />
    ))}
    
    {/* Country outline */}
    <GermanyOutline />
    
    {/* Other location dots (dimmed) */}
    {allLocations.map((loc) => (
      <g key={loc.city}>
        <circle cx={loc.mapX} cy={loc.mapY} r={loc.mapX === activeX && loc.mapY === activeY ? 0 : 2} fill="hsl(var(--muted-foreground))" opacity="0.3" />
      </g>
    ))}
    
    {/* Active location */}
    <circle cx={activeX} cy={activeY} r="3" fill="hsl(var(--primary))" />
    <circle cx={activeX} cy={activeY} r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5" />
    <circle cx={activeX} cy={activeY} r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" />
    
    {/* Crosshair */}
    <line x1={activeX - 20} y1={activeY} x2={activeX - 10} y2={activeY} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />
    <line x1={activeX + 10} y1={activeY} x2={activeX + 20} y2={activeY} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />
    <line x1={activeX} y1={activeY - 20} x2={activeX} y2={activeY - 10} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />
    <line x1={activeX} y1={activeY + 10} x2={activeX} y2={activeY + 20} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

const LocationsSection = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      {/* HUD Grid */}
      <div className="absolute inset-0 hud-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="tech-label text-primary mb-4 block">APPROACH PHASE / STANDORTE</span>
          <h2 className="headline-hero text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Unsere <span className="text-gradient-primary">Basen</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategisch positioniert im Herzen Europas. 
            Bereit für jede Mission.
          </p>
        </motion.div>

        {/* Flight Route Visualization */}
        <motion.div 
          className="relative mb-16 hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <svg className="w-full h-24" viewBox="0 0 1200 100" preserveAspectRatio="xMidYMid meet">
            {/* Flight path line */}
            <motion.path
              d="M100,50 Q400,20 600,50 T1100,50"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3 }}
            />
            {/* Location markers */}
            {[100, 600, 1100].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="50" r="8" fill="hsl(var(--primary))" />
                <circle cx={x} cy="50" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                <circle cx={x} cy="50" r="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group glass-panel rounded-sm p-6 md:p-8 hover:border-primary/50 transition-all duration-300"
            >
              {/* Mini Map */}
              <div className="w-full h-28 mb-4 rounded-sm overflow-hidden border border-border/30 bg-background/50">
                <MiniMap activeX={location.mapX} activeY={location.mapY} allLocations={locations} />
              </div>

              {/* Airport Code */}
              <div className="flex items-center justify-between mb-4">
                <span className="tech-label text-primary text-lg">{location.airport}</span>
                <MapPin className="w-5 h-5 text-primary" />
              </div>

              {/* City Name */}
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 tracking-wide">
                {location.city}
              </h3>

              {/* Address */}
              <p className="text-muted-foreground text-sm mb-6">
                {location.address}
              </p>


              {/* Divider */}
              <div className="w-full h-px bg-border mb-6" />

              {/* Contact */}
              <div className="space-y-2 text-sm">
                <a href="tel:+4962179944698" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0621 - 79 94 46 98</span>
                </a>
                <a href="mailto:info@heliseven.de" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@heliseven.de</span>
                </a>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;

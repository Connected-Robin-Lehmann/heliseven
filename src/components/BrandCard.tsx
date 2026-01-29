import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BrandCardProps {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  flightMode: string;
  index: number;
}

const BrandCard = ({ name, tagline, description, logo, flightMode, index }: BrandCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="brand-card group relative glass-panel rounded-sm p-6 md:p-8 cursor-pointer hover:border-primary/50 transition-all duration-300"
    >
      {/* Flight Mode Label */}
      <div className="absolute top-4 right-4">
        <span className="tech-label text-primary">{flightMode}</span>
      </div>

      {/* Logo */}
      <div className="mb-6">
        <img 
          src={logo} 
          alt={name} 
          className="h-10 md:h-12 object-contain object-left transition-all duration-300 group-hover:brightness-125"
        />
      </div>

      {/* Tagline */}
      <h3 className="text-lg md:text-xl font-medium text-foreground mb-3 tracking-wide">
        {tagline}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Hover Action */}
      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-medium uppercase tracking-wider">Mehr erfahren</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Corner Decoration */}
      <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 2L22 12L12 22" stroke="currentColor" strokeWidth="1" />
          <path d="M2 12H20" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-sm bg-gradient-to-tr from-primary/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

export default BrandCard;

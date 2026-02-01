import { motion } from 'framer-motion';
import { useState } from 'react';

interface BrandCardProps {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  flightMode: string;
  index: number;
}

const BrandCard = ({ name, tagline, description, logo, flightMode, index }: BrandCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-square cursor-pointer"
    >
      {/* Background with gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[1px] rounded-2xl bg-card" />
      </div>
      
      {/* Main Card */}
      <div className="relative h-full rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_20px_60px_-15px_rgba(236,102,8,0.15)]">
        
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Flight mode badge */}
        <motion.div 
          className="absolute top-4 right-4 z-10"
          animate={{ y: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <span className="px-2 py-1 text-[9px] font-bold tracking-[0.2em] text-primary bg-primary/10 rounded-full border border-primary/20">
            {flightMode}
          </span>
        </motion.div>

        {/* Logo Container - Centered and Large */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -10 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Logo glow effect */}
            <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-primary rounded-full scale-150" />
            
            <img 
              src={logo} 
              alt={name} 
              className="relative h-16 md:h-20 lg:h-24 w-auto object-contain filter drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Bottom Info - Slides up on hover */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-5"
          animate={{ 
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Tagline */}
          <p className="text-xs text-primary font-medium tracking-wide mb-1">
            {tagline}
          </p>
          
          {/* Description - Very small */}
          <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </motion.div>

        {/* Decorative flight line */}
        <svg 
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#flight-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <defs>
            <linearGradient id="flight-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg viewBox="0 0 48 48" className="w-full h-full text-primary/20">
            <path d="M0 0 L48 0 L0 48 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCard;

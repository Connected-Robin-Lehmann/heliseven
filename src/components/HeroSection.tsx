import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroCockpit from '@/assets/hero-cockpit.jpg';
import HeliSevenLogo from '@/assets/logos/HeliSevenGroup_logo.svg';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src={heroCockpit} 
          alt="Helicopter cockpit view above clouds at sunrise"
          className="w-full h-full object-cover"
        />
        {/* Light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-background" />
        {/* Orange sunset glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/10" />
      </motion.div>

      {/* Animated Cloud Layers */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute bottom-0 left-0 w-[200%] h-32 opacity-30"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1), transparent, hsl(var(--foreground) / 0.05), transparent)',
          }}
        />
      </div>

      {/* HUD Grid Overlay */}
      <div className="absolute inset-0 z-10 hud-grid opacity-30 pointer-events-none" />


      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          {/* Tech Label */}
          <motion.p 
            className="tech-label mb-6 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            EXPERIENCE THE WORLD FROM ABOVE
          </motion.p>

          {/* Main Headline */}
          <h1 className="headline-hero text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground mb-6 leading-tight">
            <span className="block">DIE WELT</span>
            <span className="block text-gradient-primary">VON OBEN</span>
            <span className="block">ERLEBEN.</span>
          </h1>

          {/* Subline */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            HeliSeven Group – Ausbildung, Erlebnis, Mission, Business.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button variant="hero" size="xl">
              Jetzt Buchen
            </Button>
            <Button variant="hud" size="xl">
              Unsere Marken
            </Button>
          </motion.div>
        </motion.div>

        {/* Radar Circle Decoration */}
        <motion.div 
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 radar-circle" />
            <div className="absolute inset-2 radar-circle animation-delay-500" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-4 radar-circle" style={{ animationDelay: '2s' }} />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="tech-label">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Side Technical Lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <motion.div 
          className="w-24 h-px bg-gradient-to-r from-primary to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.div 
          className="w-16 h-px bg-gradient-to-r from-primary/50 to-transparent mt-2"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <motion.div 
          className="w-24 h-px bg-gradient-to-l from-primary to-transparent"
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.div 
          className="w-16 h-px bg-gradient-to-l from-primary/50 to-transparent mt-2"
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;

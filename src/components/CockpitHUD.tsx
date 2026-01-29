import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const CockpitHUD = () => {
  const { scrollYProgress } = useScroll();
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);

  // Transform scroll to flight data
  const altitudeValue = useTransform(scrollYProgress, [0, 1], [0, 12500]);
  const speedValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 180, 220, 0]);

  useEffect(() => {
    const unsubAlt = altitudeValue.on('change', v => setAltitude(Math.round(v)));
    const unsubSpeed = speedValue.on('change', v => setSpeed(Math.round(v)));
    
    return () => {
      unsubAlt();
      unsubSpeed();
    };
  }, [altitudeValue, speedValue]);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 pointer-events-none">
      {/* Altimeter */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="w-20 h-20 relative">
          {/* Outer ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="226"
              style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [226, 0]) }}
            />
          </svg>
          
          {/* Center display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[8px] uppercase tracking-wider text-muted-foreground">ALT</span>
            <span className="text-sm font-mono text-primary font-bold">{altitude.toLocaleString()}</span>
            <span className="text-[8px] text-muted-foreground">FT</span>
          </div>
        </div>
      </motion.div>

      {/* Speed Indicator */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        <div className="w-20 h-20 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="226"
              style={{ strokeDashoffset: useTransform(speedValue, [0, 250], [226, 0]) }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[8px] uppercase tracking-wider text-muted-foreground">SPD</span>
            <span className="text-sm font-mono text-accent font-bold">{speed}</span>
            <span className="text-[8px] text-muted-foreground">KTS</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CockpitHUD;

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const CockpitHUD = () => {
  const { scrollYProgress } = useScroll();
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(0);

  // Transform scroll to flight data
  const altitudeValue = useTransform(scrollYProgress, [0, 1], [0, 12500]);
  const speedValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 180, 220, 0]);
  const headingValue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const unsubAlt = altitudeValue.on('change', v => setAltitude(Math.round(v)));
    const unsubSpeed = speedValue.on('change', v => setSpeed(Math.round(v)));
    const unsubHeading = headingValue.on('change', v => setHeading(Math.round(v)));
    
    return () => {
      unsubAlt();
      unsubSpeed();
      unsubHeading();
    };
  }, [altitudeValue, speedValue, headingValue]);

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

      {/* Compass / Heading */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.9, duration: 0.6 }}
      >
        <div className="w-20 h-20 relative">
          <svg className="w-full h-full" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            {/* Compass marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="40"
                y1="8"
                x2="40"
                y2={deg % 90 === 0 ? "14" : "11"}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={deg % 90 === 0 ? "2" : "1"}
                transform={`rotate(${deg} 40 40)`}
              />
            ))}
            {/* Compass needle */}
            <motion.g style={{ rotate: heading, originX: "40px", originY: "40px" }}>
              <polygon
                points="40,16 37,28 43,28"
                fill="hsl(var(--primary))"
              />
              <polygon
                points="40,64 37,52 43,52"
                fill="hsl(var(--muted-foreground))"
              />
            </motion.g>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[8px] uppercase tracking-wider text-muted-foreground">HDG</span>
            <span className="text-sm font-mono text-foreground font-bold">{heading}°</span>
          </div>
        </div>
      </motion.div>

      {/* Flight Phase Indicator */}
      <motion.div 
        className="mt-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        <FlightPhaseIndicator scrollProgress={scrollYProgress} />
      </motion.div>
    </div>
  );
};

const FlightPhaseIndicator = ({ scrollProgress }: { scrollProgress: any }) => {
  const phases = [
    { name: 'TAKE-OFF', range: [0, 0.15] },
    { name: 'CLIMB', range: [0.15, 0.35] },
    { name: 'CRUISE', range: [0.35, 0.6] },
    { name: 'APPROACH', range: [0.6, 0.8] },
    { name: 'LANDING', range: [0.8, 1] },
  ];

  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (v: number) => {
      const phaseIndex = phases.findIndex(p => v >= p.range[0] && v < p.range[1]);
      setCurrentPhase(phaseIndex === -1 ? phases.length - 1 : phaseIndex);
    });
    return unsubscribe;
  }, [scrollProgress]);

  return (
    <div className="flex flex-col gap-1">
      {phases.map((phase, index) => (
        <div 
          key={phase.name}
          className={`flex items-center gap-2 transition-all duration-300 ${
            index === currentPhase ? 'opacity-100' : 'opacity-30'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            index === currentPhase ? 'bg-primary' : 'bg-muted-foreground'
          }`} />
          <span className={`text-[9px] font-mono tracking-wider transition-colors duration-300 ${
            index === currentPhase ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {phase.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CockpitHUD;

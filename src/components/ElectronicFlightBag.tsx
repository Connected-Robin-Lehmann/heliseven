import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

const ElectronicFlightBag = () => {
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState('');
  const [eta, setEta] = useState('00:00');
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { name: 'TAKE-OFF', icon: '▲', range: [0, 0.15] },
    { name: 'CLIMB', icon: '↗', range: [0.15, 0.35] },
    { name: 'CRUISE', icon: '→', range: [0.35, 0.6] },
    { name: 'APPROACH', icon: '↘', range: [0.6, 0.8] },
    { name: 'LANDING', icon: '▼', range: [0.8, 1] },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // ETA calculation
      const remaining = Math.round((1 - v) * 8);
      const mins = Math.floor(remaining);
      const secs = Math.round((remaining - mins) * 60);
      setEta(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      
      // Phase calculation
      const phaseIndex = phases.findIndex(p => v >= p.range[0] && v < p.range[1]);
      setCurrentPhase(phaseIndex === -1 ? phases.length - 1 : phaseIndex);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const fuelPercent = useTransform(scrollYProgress, [0, 1], [100, 15]);
  const [fuel, setFuel] = useState(100);

  useEffect(() => {
    const unsubscribe = fuelPercent.on('change', v => setFuel(Math.round(v)));
    return unsubscribe;
  }, [fuelPercent]);

  return (
    <motion.div 
      className="fixed bottom-4 left-4 z-50 hidden md:block pointer-events-none"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {/* iPad Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[12px] p-[6px] shadow-2xl">
        {/* Camera notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2a2a2a] border border-[#333]" />
        
        {/* Screen */}
        <div className="bg-background/95 backdrop-blur-sm rounded-[8px] p-3 w-[280px] border border-border/30">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Plane className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-mono text-primary font-semibold">HS-001</span>
            </div>
            <span className="text-[9px] font-mono text-muted-foreground">{time} UTC</span>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left: Flight Phases */}
            <div className="space-y-1">
              <span className="text-[7px] uppercase tracking-wider text-muted-foreground">PHASE</span>
              <div className="space-y-0.5">
                {phases.map((phase, index) => (
                  <div 
                    key={phase.name}
                    className={`flex items-center gap-1.5 py-0.5 px-1 rounded-sm transition-all duration-300 ${
                      index === currentPhase 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground/40'
                    }`}
                  >
                    <span className="text-[8px] w-3">{phase.icon}</span>
                    <span className={`text-[8px] font-mono tracking-wide ${
                      index === currentPhase ? 'font-semibold' : ''
                    }`}>
                      {phase.name}
                    </span>
                    {index === currentPhase && (
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-primary ml-auto"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Route & Data */}
            <div className="space-y-2">
              {/* Route */}
              <div>
                <span className="text-[7px] uppercase tracking-wider text-muted-foreground">ROUTE</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="text-center">
                    <span className="text-[9px] font-mono font-bold text-foreground block">MHG</span>
                    <span className="text-[6px] text-muted-foreground">Mannheim</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary via-accent to-primary relative">
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"
                      style={{ left: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-mono font-bold text-accent block">STR</span>
                    <span className="text-[6px] text-muted-foreground">Stuttgart</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent via-primary to-accent" />
                  <div className="text-center">
                    <span className="text-[9px] font-mono font-bold text-foreground block">AGB</span>
                    <span className="text-[6px] text-muted-foreground">Augsburg</span>
                  </div>
                </div>
              </div>

              {/* ETA & Fuel */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[7px] uppercase tracking-wider text-muted-foreground">ETA</span>
                  <span className="text-[11px] font-mono text-accent font-bold block">{eta}</span>
                </div>
                <div>
                  <span className="text-[7px] uppercase tracking-wider text-muted-foreground">FUEL</span>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1.5 bg-muted rounded-sm overflow-hidden">
                      <motion.div 
                        className={`h-full transition-colors ${fuel < 30 ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${fuel}%` }}
                      />
                    </div>
                    <span className={`text-[8px] font-mono ${fuel < 30 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {fuel}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
            <div className="flex gap-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="w-1.5 h-1.5 rounded-full bg-muted" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted" />
            </div>
            <span className="text-[7px] text-muted-foreground font-mono">EFB v2.1</span>
          </div>
        </div>
        
        {/* Home button */}
        <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#333]" />
      </div>
    </motion.div>
  );
};

export default ElectronicFlightBag;

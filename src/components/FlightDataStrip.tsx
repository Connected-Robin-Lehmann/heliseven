import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const FlightDataStrip = () => {
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState('');
  const [eta, setEta] = useState('00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const remaining = Math.round((1 - v) * 8);
      const mins = Math.floor(remaining);
      const secs = Math.round((remaining - mins) * 60);
      setEta(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
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
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-6 px-6 py-3 glass-panel rounded-sm pointer-events-none"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      {/* Flight Number */}
      <div className="flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-wider text-muted-foreground">FLT</span>
        <span className="text-sm font-mono text-primary font-bold">HS-001</span>
      </div>

      <div className="w-px h-8 bg-border" />

      {/* Route: Mannheim → Stuttgart → Augsburg */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase tracking-wider text-muted-foreground">FROM</span>
          <span className="text-xs font-mono text-foreground font-bold">MHG</span>
          <span className="text-[7px] text-muted-foreground">Mannheim</span>
        </div>
        <motion.div 
          className="w-12 h-px bg-gradient-to-r from-primary via-accent to-primary relative"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.3, duration: 0.5 }}
        >
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"
            style={{ left: useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']) }}
          />
        </motion.div>
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase tracking-wider text-accent">VIA</span>
          <span className="text-xs font-mono text-accent font-bold">STR</span>
          <span className="text-[7px] text-muted-foreground">Stuttgart</span>
        </div>
        <motion.div 
          className="w-12 h-px bg-gradient-to-r from-accent via-primary to-accent relative"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full"
            style={{ left: useTransform(scrollYProgress, [0.5, 1], ['0%', '100%']) }}
          />
        </motion.div>
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase tracking-wider text-muted-foreground">TO</span>
          <span className="text-xs font-mono text-foreground font-bold">AGB</span>
          <span className="text-[7px] text-muted-foreground">Augsburg</span>
        </div>
      </div>

      <div className="w-px h-8 bg-border" />

      {/* Time */}
      <div className="flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-wider text-muted-foreground">UTC</span>
        <span className="text-sm font-mono text-foreground">{time}</span>
      </div>

      <div className="w-px h-8 bg-border" />

      {/* ETA */}
      <div className="flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-wider text-muted-foreground">ETA</span>
        <span className="text-sm font-mono text-accent">{eta}</span>
      </div>

      <div className="w-px h-8 bg-border" />

      {/* Fuel */}
      <div className="flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-wider text-muted-foreground">FUEL</span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-2 bg-muted rounded-sm overflow-hidden">
            <motion.div 
              className={`h-full transition-colors ${fuel < 30 ? 'bg-destructive' : 'bg-primary'}`}
              style={{ width: `${fuel}%` }}
            />
          </div>
          <span className={`text-[10px] font-mono ${fuel < 30 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {fuel}%
          </span>
        </div>
      </div>

      {/* Status Lights */}
      <div className="flex gap-1 ml-2">
        <motion.div 
          className="w-2 h-2 rounded-full bg-green-500"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="w-2 h-2 rounded-full bg-muted" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>
    </motion.div>
  );
};

export default FlightDataStrip;

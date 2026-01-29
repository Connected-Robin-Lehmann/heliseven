import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Plane, Battery, Wifi, Signal } from 'lucide-react';

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
      const remaining = Math.round((1 - v) * 8);
      const mins = Math.floor(remaining);
      const secs = Math.round((remaining - mins) * 60);
      setEta(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      
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
      className="fixed bottom-6 left-6 z-50 hidden md:block pointer-events-none"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {/* iPad Pro Frame - Space Gray */}
      <div 
        className="relative rounded-[20px] p-[8px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset]"
        style={{
          background: 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        }}
      >
        {/* Outer bezel highlight */}
        <div className="absolute inset-0 rounded-[20px] border border-[#404040] pointer-events-none" />
        
        {/* Camera */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border-2 border-[#333] shadow-inner" />
        </div>
        
        {/* Screen bezel */}
        <div className="rounded-[14px] overflow-hidden border border-[#000]">
          {/* iOS Status Bar */}
          <div className="bg-[#1c1c1e] px-4 py-1.5 flex items-center justify-between">
            <span className="text-[10px] text-white/90 font-medium">{time}</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3 text-white/90" />
              <Wifi className="w-3 h-3 text-white/90" />
              <div className="flex items-center gap-0.5">
                <Battery className="w-4 h-3 text-white/90" />
                <span className="text-[9px] text-white/70">87%</span>
              </div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="bg-[#000000] p-4 w-[340px]">
            {/* App Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Plane className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">HeliSeven EFB</span>
                  <span className="text-[10px] text-white/50">Flight HS-001</span>
                </div>
              </div>
              <div className="px-2 py-1 rounded-md bg-green-500/20 border border-green-500/30">
                <span className="text-[9px] text-green-400 font-medium">ACTIVE</span>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-5 gap-4">
              {/* Left: Flight Phases */}
              <div className="col-span-2 bg-[#1c1c1e] rounded-xl p-3">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Flight Phase</span>
                <div className="mt-2 space-y-1">
                  {phases.map((phase, index) => (
                    <motion.div 
                      key={phase.name}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded-lg transition-all duration-300 ${
                        index === currentPhase 
                          ? 'bg-primary/20' 
                          : ''
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] transition-colors duration-300 ${
                        index === currentPhase 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-[#2c2c2e] text-white/30'
                      }`}>
                        {phase.icon}
                      </div>
                      <span className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${
                        index === currentPhase ? 'text-white' : 'text-white/30'
                      }`}>
                        {phase.name}
                      </span>
                      {index === currentPhase && (
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary ml-auto"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Route & Data */}
              <div className="col-span-3 space-y-3">
                {/* Route Card */}
                <div className="bg-[#1c1c1e] rounded-xl p-3">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Route</span>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-center">
                      <span className="text-sm font-bold text-white block">MHG</span>
                      <span className="text-[8px] text-white/40">Mannheim</span>
                    </div>
                    <div className="flex-1 mx-2 relative">
                      <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
                      <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        style={{ left: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                      />
                      {/* Waypoint markers */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-accent block">STR</span>
                      <span className="text-[8px] text-white/40">Stuttgart</span>
                    </div>
                    <div className="flex-1 mx-2 relative">
                      <div className="h-[2px] bg-gradient-to-r from-accent via-primary to-primary rounded-full" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-white block">AGB</span>
                      <span className="text-[8px] text-white/40">Augsburg</span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#1c1c1e] rounded-xl p-3">
                    <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">ETA</span>
                    <span className="text-lg font-bold text-accent block mt-1">{eta}</span>
                  </div>
                  <div className="bg-[#1c1c1e] rounded-xl p-3">
                    <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Fuel</span>
                    <div className="mt-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold ${fuel < 30 ? 'text-destructive' : 'text-white'}`}>
                          {fuel}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#2c2c2e] rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full transition-colors ${fuel < 30 ? 'bg-destructive' : 'bg-primary'}`}
                          style={{ width: `${fuel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center mt-2 mb-1">
          <div className="w-24 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </motion.div>
  );
};

export default ElectronicFlightBag;

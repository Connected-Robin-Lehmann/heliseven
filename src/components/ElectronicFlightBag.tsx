import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Plane, ChevronUp, ChevronDown } from 'lucide-react';

const ElectronicFlightBag = () => {
  const { scrollYProgress } = useScroll();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const phases = [
    { name: 'TAKE-OFF', icon: '▲', range: [0, 0.12] },
    { name: 'CLIMB', icon: '↗', range: [0.12, 0.3] },
    { name: 'CRUISE', icon: '→', range: [0.3, 0.5] },
    { name: 'APPROACH', icon: '↘', range: [0.5, 0.7] },
    { name: 'LANDING', icon: '▼', range: [0.7, 0.85] },
  ];

  const MAX_ALT = 12500;

  // Transform scroll to flight data
  const altitudeValue = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 0.85], [0, 12500, 12500, 4000, 0]);
  const altitudePercent = useTransform(altitudeValue, [0, MAX_ALT], [0, 100]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const phaseIndex = phases.findIndex(p => v >= p.range[0] && v < p.range[1]);
      setCurrentPhase(phaseIndex === -1 ? phases.length - 1 : phaseIndex);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const unsubAlt = altitudeValue.on('change', v => setAltitude(Math.round(v)));
    return () => unsubAlt();
  }, [altitudeValue]);

  const [altPct, setAltPct] = useState(0);
  useEffect(() => {
    const unsub = altitudePercent.on('change', v => setAltPct(v));
    return () => unsub();
  }, [altitudePercent]);

  return (
    <motion.div 
      className="fixed bottom-6 left-6 z-50 hidden md:block"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {/* Toggle Button */}
      <div className="absolute -top-3 left-1/2 z-10" style={{ transform: 'translateX(-50%)' }}>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full bg-[#2d2d2d] border border-[#404040] flex items-center justify-center shadow-lg hover:bg-[#3d3d3d] transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-white/80" />
        ) : (
          <ChevronUp className="w-4 h-4 text-white/80" />
        )}
        </motion.button>
      </div>

      {/* iPad Pro Frame */}
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div 
            key="expanded"
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
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
              {/* App Content */}
              <div className="bg-[#000000] p-2.5 w-[225px]">
                {/* App Header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                  <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                    <Plane className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-white block leading-tight">HeliSeven EFB</span>
                    <span className="text-[8px] text-white/50">Flight HS-001</span>
                  </div>
                  <div className="ml-auto px-1.5 py-0.5 rounded bg-green-500/20 border border-green-500/30">
                    <span className="text-[8px] text-green-400 font-medium">ACTIVE</span>
                  </div>
                </div>

                {/* Main content: Phases + Altitude Slider side by side */}
                <div className="flex gap-2">
                  {/* Flight Phases */}
                  <div className="bg-[#1c1c1e] rounded-lg p-2 flex-1">
                    <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium">Phase</span>
                    <div className="mt-1 space-y-0.5">
                      {phases.map((phase, index) => (
                        <motion.div 
                          key={phase.name}
                          className={`flex items-center gap-1.5 py-0.5 px-1 rounded transition-all duration-300 ${
                            index === currentPhase ? 'bg-primary/20' : ''
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[7px] transition-colors duration-300 ${
                            index === currentPhase 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-[#2c2c2e] text-white/30'
                          }`}>
                            {phase.icon}
                          </div>
                          <span className={`text-[8px] font-medium tracking-wide transition-colors duration-300 ${
                            index === currentPhase ? 'text-white' : 'text-white/30'
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
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Vertical Altitude Slider */}
                  <div className="bg-[#1c1c1e] rounded-lg p-2 flex flex-col items-center w-14">
                    <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium mb-1">ALT</span>
                    
                    {/* Altitude scale marks + slider */}
                    <div className="relative flex-1 w-full flex flex-col items-center" style={{ minHeight: '120px' }}>
                      {/* Scale marks */}
                      <div className="absolute inset-y-0 left-1 flex flex-col justify-between py-1">
                        {[12500, 10000, 7500, 5000, 2500, 0].map((mark) => (
                          <span key={mark} className="text-[6px] text-white/20 font-mono leading-none">
                            {mark > 0 ? `${(mark / 1000).toFixed(1)}k` : '0'}
                          </span>
                        ))}
                      </div>

                      {/* Track */}
                      <div className="absolute right-2 inset-y-0 w-[6px] bg-[#2c2c2e] rounded-full my-1 overflow-hidden">
                        {/* Filled portion from bottom */}
                        <motion.div 
                          className="absolute bottom-0 left-0 w-full rounded-full"
                          style={{
                            height: `${altPct}%`,
                            background: `linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.4))`,
                            boxShadow: `0 0 8px hsl(var(--primary) / 0.5)`,
                          }}
                        />
                      </div>

                      {/* Thumb indicator */}
                      <motion.div 
                        className="absolute right-0 w-5 h-3 flex items-center justify-center"
                        style={{ 
                          bottom: `${altPct}%`,
                          transform: 'translateY(50%)',
                        }}
                      >
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow-[0_0_6px_hsl(var(--primary))]" />
                      </motion.div>
                    </div>

                    {/* Current value */}
                    <div className="mt-1.5 text-center">
                      <span className="text-[10px] font-bold text-primary font-mono">{altitude.toLocaleString()}</span>
                      <span className="text-[6px] text-white/40 block">FT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="flex justify-center mt-2 mb-1">
              <div className="w-16 h-1 rounded-full bg-white/20" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="rounded-[16px] p-3 shadow-[0_15px_30px_-8px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] cursor-pointer"
            style={{
              background: 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)',
            }}
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
                <Plane className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-white block">HeliSeven EFB</span>
                <span className="text-[8px] text-white/50">{phases[currentPhase]?.name || 'STANDBY'}</span>
              </div>
              <div className="ml-2 text-right">
                <span className="text-sm font-bold text-primary block">{altitude.toLocaleString()} FT</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ElectronicFlightBag;

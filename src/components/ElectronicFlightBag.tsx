import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Plane, Battery, Wifi, Signal, ChevronUp, ChevronDown } from 'lucide-react';

const ElectronicFlightBag = () => {
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState('');
  const [eta, setEta] = useState('00:00');
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

  const altitudeValue = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 0.85], [0, 12500, 12500, 4000, 0]);

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
      const clamped = Math.min(v, 0.85);
      const remaining = Math.round((0.85 - clamped) / 0.85 * 8);
      const mins = Math.floor(remaining);
      const secs = Math.round((remaining - mins) * 60);
      setEta(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      
      const phaseIndex = phases.findIndex(p => v >= p.range[0] && v < p.range[1]);
      setCurrentPhase(phaseIndex === -1 ? phases.length - 1 : phaseIndex);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const unsubAlt = altitudeValue.on('change', v => setAltitude(Math.round(v)));
    return () => unsubAlt();
  }, [altitudeValue]);

  return (
    <>
      {/* Mobile Bar - shown on small screens (<768px) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div
          className="w-full px-3 py-2 flex items-center justify-between border-t border-[#404040]"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
              <Plane className="w-3 h-3 text-primary" />
            </div>
            <div className="flex items-center gap-1.5">
              {phases.map((phase, index) => (
                <div
                  key={phase.name}
                  className={`w-5 h-5 rounded flex items-center justify-center text-[8px] transition-colors duration-300 ${
                    index === currentPhase
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-[#2c2c2e] text-white/20'
                  }`}
                >
                  {phase.icon}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-sm font-bold text-primary tabular-nums">{altitude.toLocaleString()} <span className="text-[8px] text-white/40">FT</span></span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wide">{phases[currentPhase]?.name || 'STANDBY'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar - shown on medium screens (768px-1279px) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 hidden md:flex xl:hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div
          className="w-full px-4 py-2.5 flex items-center justify-between gap-4 border-t border-[#404040]"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
          }}
        >
          {/* Left: Logo + Phase */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center">
              <Plane className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-white block leading-tight">HeliSeven EFB</span>
              <span className="text-[8px] text-white/50">Flight HS-001</span>
            </div>
          </div>

          {/* Center: Phase indicators */}
          <div className="flex items-center gap-1">
            {phases.map((phase, index) => (
              <div
                key={phase.name}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-all duration-300 ${
                  index === currentPhase ? 'bg-primary/20' : ''
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center text-[8px] transition-colors duration-300 ${
                  index === currentPhase
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-[#2c2c2e] text-white/30'
                }`}>
                  {phase.icon}
                </div>
                <span className={`text-[8px] font-medium tracking-wide transition-colors duration-300 hidden lg:inline ${
                  index === currentPhase ? 'text-white' : 'text-white/30'
                }`}>
                  {phase.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right: ALT + ETA */}
          <div className="flex items-center gap-4">
            <div className="text-right w-[90px]">
              <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium block">ALT</span>
              <span className="text-sm font-bold text-primary tabular-nums">{altitude.toLocaleString()} <span className="text-[8px] text-white/40">FT</span></span>
            </div>
            <div className="text-right w-[50px]">
              <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium block">ETA</span>
              <span className="text-sm font-bold text-accent tabular-nums">{eta}</span>
            </div>
            <div className="px-1.5 py-0.5 rounded bg-green-500/20 border border-green-500/30">
              <span className="text-[8px] text-green-400 font-medium">ACTIVE</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* iPad Widget - shown on xl screens (1280px+) */}
      <motion.div 
        className="fixed bottom-6 left-6 z-50 hidden xl:block"
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
              <div className="absolute inset-0 rounded-[20px] border border-[#404040] pointer-events-none" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border-2 border-[#333] shadow-inner" />
              </div>
              
              <div className="rounded-[14px] overflow-hidden border border-[#000]">
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
                
                <div className="bg-[#000000] p-2.5 w-[225px]">
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

                  <div className="bg-[#1c1c1e] rounded-lg p-2 mb-2">
                    <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium">Phase</span>
                    <div className="mt-1.5 space-y-1">
                      {phases.map((phase, index) => (
                        <motion.div 
                          key={phase.name}
                          className={`flex items-center gap-2 py-1 px-1.5 rounded transition-all duration-300 ${
                            index === currentPhase ? 'bg-primary/20' : ''
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center text-[9px] transition-colors duration-300 ${
                            index === currentPhase 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-[#2c2c2e] text-white/30'
                          }`}>
                            {phase.icon}
                          </div>
                          <span className={`text-[9px] font-medium tracking-wide transition-colors duration-300 ${
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

                  <div className="space-y-1.5">
                    <div className="bg-[#1c1c1e] rounded-lg p-2">
                      <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium">Altitude</span>
                      <div className="flex items-baseline gap-0.5 mt-0.5">
                        <span className="text-lg font-bold text-primary">{altitude.toLocaleString()}</span>
                        <span className="text-[8px] text-white/40">FT</span>
                      </div>
                    </div>
                    <div className="bg-[#1c1c1e] rounded-lg p-2">
                      <span className="text-[8px] uppercase tracking-wider text-white/40 font-medium">ETA</span>
                      <span className="text-lg font-bold text-accent block mt-0.5">{eta}</span>
                    </div>
                  </div>
                </div>
              </div>
              
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
    </>
  );
};

export default ElectronicFlightBag;

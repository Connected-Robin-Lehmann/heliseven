import { motion, useScroll, useTransform } from 'framer-motion';

const ArtificialHorizon = () => {
  const { scrollYProgress } = useScroll();
  
  // Pitch changes based on scroll sections
  const pitch = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.6, 0.8, 1], 
    [15, 25, 0, 0, -15, -25]
  );
  
  // Roll for dynamic feel
  const roll = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -5, 5, -3, 0]
  );

  return (
    <motion.div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block pointer-events-none"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <div className="w-24 h-24 relative">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        
        {/* Inner horizon display */}
        <div className="absolute inset-2 rounded-full overflow-hidden border border-border/50">
          <motion.div 
            className="w-full h-full relative"
            style={{ rotate: roll }}
          >
            {/* Sky */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-accent/30 to-accent/10"
              style={{ y: pitch }}
            />
            
            {/* Ground */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-aviation-dark/80 to-aviation-dark/40 translate-y-1/2"
              style={{ y: pitch }}
            />
            
            {/* Horizon line */}
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-primary top-1/2 -translate-y-1/2"
              style={{ y: pitch }}
            />
            
            {/* Pitch ladder */}
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ y: pitch }}
            >
              <div className="w-8 h-px bg-foreground/30" />
              <div className="w-6 h-px bg-foreground/20" />
              <div className="w-10 h-0.5 bg-primary" />
              <div className="w-6 h-px bg-foreground/20" />
              <div className="w-8 h-px bg-foreground/30" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Fixed aircraft symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-3 h-0.5 bg-primary absolute -left-4 top-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 rounded-full border-2 border-primary" />
            <div className="w-3 h-0.5 bg-primary absolute -right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Bank angle indicators */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
          {[-60, -45, -30, -15, 0, 15, 30, 45, 60].map((angle) => (
            <line
              key={angle}
              x1="48"
              y1="4"
              x2="48"
              y2={Math.abs(angle) === 0 ? "10" : Math.abs(angle) % 30 === 0 ? "9" : "7"}
              stroke={angle === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              strokeWidth={angle === 0 ? "2" : "1"}
              transform={`rotate(${angle} 48 48)`}
            />
          ))}
        </svg>
        
        {/* Labels */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center">
          <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-mono">
            ATT
          </span>
        </div>
      </div>

      {/* Vertical Speed Indicator */}
      <div className="mt-8 w-24">
        <VerticalSpeedIndicator />
      </div>
    </motion.div>
  );
};

const VerticalSpeedIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  const vsi = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.6, 0.8, 1],
    [1500, 800, 0, 0, -800, -500]
  );

  return (
    <motion.div 
      className="relative h-32"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.7, duration: 0.6 }}
    >
      {/* VSI Scale */}
      <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between items-end pr-1">
        <span className="text-[7px] text-muted-foreground font-mono">+2</span>
        <span className="text-[7px] text-muted-foreground font-mono">+1</span>
        <span className="text-[7px] text-primary font-mono">0</span>
        <span className="text-[7px] text-muted-foreground font-mono">-1</span>
        <span className="text-[7px] text-muted-foreground font-mono">-2</span>
      </div>
      
      {/* VSI Bar */}
      <div className="absolute left-8 top-0 bottom-0 w-8 bg-muted/50 rounded-sm overflow-hidden">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-primary" />
        <motion.div 
          className="absolute left-0 right-0 bg-primary/50"
          style={{
            height: useTransform(vsi, [-2000, 0, 2000], ['50%', '0%', '50%']),
            top: useTransform(vsi, (v) => v >= 0 ? 'auto' : '50%'),
            bottom: useTransform(vsi, (v) => v >= 0 ? '50%' : 'auto'),
          }}
        />
      </div>
      
      {/* Label */}
      <div className="absolute left-8 -bottom-5 w-8 text-center">
        <span className="text-[7px] uppercase tracking-wider text-muted-foreground font-mono">
          V/S
        </span>
      </div>
    </motion.div>
  );
};

export default ArtificialHorizon;

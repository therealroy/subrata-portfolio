import React from 'react';

interface CrosshairGridProps {
  className?: string;
}

export const CrosshairGrid: React.FC<CrosshairGridProps> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* Top Left */}
      <div className="absolute top-4 left-4 flex items-center gap-1 font-mono text-[10px] text-white/30 tracking-widest uppercase">
        <span className="text-brand-orange">+</span> 23°31'N / 87°18'E
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[10px] text-white/30 tracking-widest uppercase">
        SYS.NET // PROD <span className="text-brand-orange">+</span>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1 font-mono text-[10px] text-white/30 tracking-widest uppercase">
        <span className="text-brand-orange">+</span> ARCH.REV: 2026.04
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1 font-mono text-[10px] text-white/30 tracking-widest uppercase">
        PORTFOLIO.V3 <span className="text-brand-orange">+</span>
      </div>

      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 text-white/20 text-xs font-mono">+</div>
      <div className="absolute top-2 right-2 text-white/20 text-xs font-mono">+</div>
      <div className="absolute bottom-2 left-2 text-white/20 text-xs font-mono">+</div>
      <div className="absolute bottom-2 right-2 text-white/20 text-xs font-mono">+</div>
    </div>
  );
};


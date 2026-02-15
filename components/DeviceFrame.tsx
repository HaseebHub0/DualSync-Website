
import React from 'react';
import { DeviceType } from '../types';

interface DeviceFrameProps {
  src?: string;
  type?: DeviceType;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ src, type = 'laptop', alt, className = "", children }) => {
  const content = children || (src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : null);

  if (type === 'mobile') {
    return (
      <div className={`relative mx-auto w-full aspect-[9/19] transition-transform duration-500 ${className}`}>
        {/* Phone Body - Ultra Modern 'Pro' Frame */}
        <div className="relative h-full w-full bg-[#050505] rounded-[2.5rem] md:rounded-[2.75rem] border-[4px] md:border-[6px] border-[#1a1a1a] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Dynamic Island - Sleek Mini */}
          <div className="absolute top-2.5 md:top-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-black rounded-full z-[60] flex items-center justify-end px-2">
             <div className="size-0.5 md:size-1 rounded-full bg-[#1a1a1a]"></div>
          </div>
          
          {/* Subtle Side Button Accents */}
          <div className="absolute -left-[3px] top-20 w-[2px] h-8 bg-[#2a2a2a] rounded-l z-10"></div>
          <div className="absolute -right-[3px] top-28 w-[2px] h-12 bg-[#2a2a2a] rounded-r z-10"></div>

          {/* Screen Content */}
          <div className="w-full h-full relative overflow-hidden bg-black">
            {content}
            {/* Soft Screen Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none z-20"></div>
            {/* Modern Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-14 md:w-20 h-0.5 bg-white/10 rounded-full z-[60]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto w-full max-w-[800px] transition-transform duration-500 ${className}`}>
      {/* Laptop Screen Part */}
      <div className="relative bg-[#1a1a1a] rounded-t-2xl border-t border-x border-white/10 p-[4px] md:p-[6px] shadow-2xl">
        {/* Top Bezel / Camera */}
        <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-1 md:h-1 bg-black rounded-full z-20"></div>
        
        <div className="aspect-[16/10] bg-[#050505] rounded-lg overflow-hidden relative border border-white/5">
          {content}
          {/* Screen Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20"></div>
        </div>
      </div>
      
      {/* Laptop Base Part */}
      <div className="relative h-2.5 md:h-3 w-[106%] -left-[3%] bg-[#222] rounded-b-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-t border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 md:w-20 h-1 bg-black/40 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default DeviceFrame;

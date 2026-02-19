import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const wordPairs = [
  { first: 'Business', second: 'ERP' },
  { first: 'Chaos', second: 'AI Agents' },
  { first: 'Vision', second: 'Reality' },
  { first: 'Complexity', second: 'Systems' },
  { first: 'Logic', second: 'Software' }
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Animation Phases: 'chaos' -> 'syncing' -> 'active'
  const [phase, setPhase] = useState<'chaos' | 'syncing' | 'active'>('chaos');
  const [salesCount, setSalesCount] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [stressLevel, setStressLevel] = useState(100);

  // Generate random "messy" document positions for the 'Stress' phase
  const messyDocs = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    rotate: Math.random() * 360 - 180,
    scale: 0.5 + Math.random() * 0.5,
    depth: Math.random() * 200 - 100,
    type: ['priority_high', 'error', 'description', 'warning', 'question_mark'][i % 5]
  })), []);

  useEffect(() => {
    // Word cycler
    const wordInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % wordPairs.length);
        setIsVisible(true);
      }, 500);
    }, 4500);

    // Sequence loop: Stress (Chaos) -> Transformation -> Relief (Active)
    const runSequence = () => {
      setPhase('chaos');
      setStressLevel(100);
      setSalesCount(0);

      // Phase 1: Messy state lasts for 4 seconds
      setTimeout(() => {
        setPhase('syncing');
        // Reduce stress level during sync
        const stressTimer = setInterval(() => {
          setStressLevel(prev => Math.max(0, prev - 2));
        }, 30);
        setTimeout(() => clearInterval(stressTimer), 1500);
      }, 4000);

      // Phase 2: Transformation to Active (Relief)
      setTimeout(() => {
        setPhase('active');
        // Sales growth animation
        let count = 0;
        const target = 42890;
        const duration = 3000;
        const startTime = Date.now();

        const countTimer = setInterval(() => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 4);
          setSalesCount(Math.floor(easedProgress * target));
          if (progress === 1) clearInterval(countTimer);
        }, 16);

        // Move cursor in active phase
        setTimeout(() => setCursorPos({ x: 75, y: 25 }), 500);
        setTimeout(() => setCursorPos({ x: 30, y: 60 }), 1500);
      }, 5500);

      // Repeat after 15 seconds
      setTimeout(runSequence, 16000);
    };

    runSequence();
    return () => clearInterval(wordInterval);
  }, []);

  const currentPair = wordPairs[index];

  return (
    <div className="flex-grow flex flex-col justify-center pt-32 md:pt-44 pb-12 px-4 sm:px-8 relative overflow-hidden min-h-screen bg-background-dark transition-colors duration-1000">

      {/* Enhanced Ambient Background Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,224,123,0.15),transparent_60%)]"></div>

        {/* Drifting Blobs */}
        <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full transition-all duration-1000 ${phase === 'chaos' ? 'opacity-20 scale-75' : 'opacity-100 animate-drift'}`}></div>
        <div className={`absolute top-1/2 -right-1/4 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full transition-all duration-1000 delay-300 ${phase === 'chaos' ? 'opacity-0' : 'opacity-80'}`}></div>

        {/* Bottom Fade-out to Section Below */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center relative z-10">

        {/* Headline Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8 mb-16 md:mb-24"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-700 ${phase === 'chaos' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-primary/10 border-primary/20 text-primary'}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${phase === 'chaos' ? 'bg-red-500' : 'bg-primary'}`}></span>
            <span>{phase === 'chaos' ? 'System Overload' : 'Harmonized Infrastructure'}</span>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Sync Your{' '}
            <span className="relative inline-block px-1 md:px-2">
              <span className={`absolute inset-0 bg-primary -skew-x-6 rounded-md transition-all duration-700 ease-out origin-center ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}></span>
              <span className={`relative z-10 text-background-dark transition-all duration-700 inline-block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                {currentPair.first}
              </span>
            </span>
            <br />
            <span className="text-white/90">With</span>{' '}
            <span className="relative inline-block px-1 md:px-2">
              <span className={`absolute inset-0 bg-white -skew-x-3 rounded-md transition-all duration-700 ease-out origin-center ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}></span>
              <span className={`relative z-10 text-background-dark transition-all duration-700 inline-block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {currentPair.second}
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-base md:text-xl text-white/70 max-w-2xl leading-relaxed px-4"
          >
            {phase === 'chaos'
              ? 'Drowning in messy data and chaotic workflows? Feel the weight of inefficiency and stress-induced friction.'
              : 'Empowering modern businesses with custom ERP software, autonomous AI agents, and high-performance digital infrastructure.'}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact" className="group relative px-8 py-3 bg-primary text-background-dark font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2">
              <span>Start Project</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a href="#work" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-md">
              <span>View Work</span>
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Visual Scene */}
        <div className="w-full max-w-5xl h-[400px] md:h-[600px] relative preserve-3d perspective-[2000px] flex justify-center items-center">

          {/* Chaos Phase: Messy, Jittery Documents */}
          <div className={`absolute inset-0 z-30 pointer-events-none transition-all duration-1000 ${phase === 'chaos' ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
            {messyDocs.map((doc) => (
              <div
                key={doc.id}
                className="absolute flex items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 text-white/20 shadow-2xl backdrop-blur-sm"
                style={{
                  left: `${doc.initialX}%`,
                  top: `${doc.initialY}%`,
                  transform: `rotate(${doc.rotate}deg) scale(${doc.scale}) translateZ(${doc.depth}px)`,
                  animation: phase === 'chaos' ? `float ${3 + Math.random() * 2}s ease-in-out infinite` : 'none'
                }}
              >
                <span className={`material-symbols-outlined ${doc.type === 'priority_high' || doc.type === 'error' ? 'text-red-500/50' : ''}`}>
                  {doc.type}
                </span>
              </div>
            ))}
          </div>

          {/* Device Frames Container */}
          <div className={`relative transition-all duration-1000 ease-out preserve-3d flex items-center justify-center ${phase === 'chaos' ? 'rotate-X-20 blur-md opacity-20' : 'rotate-X-10 opacity-100 blur-0'}`}
            style={{ transform: phase === 'chaos' ? 'rotateX(30deg) rotateY(-20deg) scale(0.8)' : 'rotateX(10deg) rotateY(-5deg) scale(1)' }}>

            {/* Real Cursor Animation (Desktop) */}
            <div
              className="absolute z-[100] pointer-events-none transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) hidden md:block"
              style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-2xl">
                <path d="M5.66208 2.36901L19.5391 16.2461C20.1249 16.8319 19.8324 17.832 19.0061 18.006L12.396 19.4005C12.1152 19.4598 11.8386 19.3807 11.6215 19.1636L2.8364 10.3785C2.61933 10.1614 2.54024 9.88478 2.59948 9.60399L3.99395 2.99394C4.16796 2.16762 5.16801 1.87513 5.7538 2.46092Z" fill="white" stroke="black" strokeWidth="1.5" />
              </svg>
            </div>

            {/* MOBILE: Refined Smaller 3D Phone Frame */}
            <div className="md:hidden w-[220px] h-[460px] bg-[#0c140e] border-[6px] border-[#1a251e] rounded-[2.5rem] relative shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transform-gpu">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a251e] rounded-b-xl z-50"></div>

              {/* Syncing Scan Bar */}
              <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-500 ${phase === 'syncing' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_#38e07b] animate-[scan_2s_linear_infinite]"></div>
                <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]"></div>
              </div>

              <div className="p-5 flex flex-col h-full mt-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-[8px] font-bold text-white/30 tracking-widest uppercase">Relief Mode</div>
                  <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                  <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Active Revenue</div>
                  <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
                    {phase === 'active' ? `$${salesCount.toLocaleString()}` : '$--'}
                  </div>
                </div>

                <div className="flex-grow flex flex-col gap-4">
                  <div className="h-32 glass-panel rounded-xl border-white/10 relative overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d={phase === 'active' ? "M0,90 Q20,60 40,75 T70,30 T100,10 L100,100 L0,100 Z" : "M0,100 L100,100"}
                        fill="url(#gradMob)"
                        className="transition-all duration-[2000ms]"
                      />
                      <defs>
                        <linearGradient id="gradMob" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#38e07b" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#38e07b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="space-y-2">
                    {[
                      { l: 'Stress Level', v: `${stressLevel}%`, c: stressLevel > 50 ? 'text-red-400' : 'text-primary' },
                      { l: 'Structure', v: 'Optimal', c: 'text-white' },
                      { l: 'Mental Focus', v: 'High', c: 'text-white' }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[8px] font-bold uppercase text-white/20 tracking-widest">{s.l}</span>
                        <span className={`text-[10px] font-bold ${s.c}`}>{phase === 'active' ? s.v : '--'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto h-10 w-full bg-primary text-background-dark text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center">
                  Secure Environment
                </div>
              </div>
            </div>

            {/* DESKTOP: Professional Structured Dashboard */}
            <div className="hidden md:flex w-[850px] h-[480px] bg-[#0c120e]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex-col preserve-3d">
              {/* Syncing Scan Bar */}
              <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-500 ${phase === 'syncing' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_20px_#38e07b] animate-[scan_2s_linear_infinite]"></div>
                <div className="absolute inset-0 bg-primary/5 backdrop-blur-[4px]"></div>
              </div>

              {/* Header */}
              <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-white/10"></div>
                  <div className="size-3 rounded-full bg-white/10"></div>
                  <div className="size-3 rounded-full bg-white/10"></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase border transition-all duration-700 ${phase === 'active' ? 'bg-primary/20 border-primary/20 text-primary' : 'bg-white/5 border-white/10 text-white/30'}`}>
                    {phase === 'active' ? 'Sync: Complete' : 'Sync: Pending'}
                  </div>
                  <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                    <span className="material-symbols-outlined text-xl">account_circle</span>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Layout */}
              <div className="flex-grow grid grid-cols-12 gap-8 p-8 overflow-hidden">
                <div className="col-span-3 border-r border-white/5 pr-8 space-y-6">
                  <div className="text-[10px] font-black uppercase text-white/20 tracking-widest">Business Structure</div>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-10 w-full rounded-xl transition-all duration-700 ${phase === 'active' ? 'bg-white/5 translate-x-0' : 'bg-transparent -translate-x-12 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="h-full flex items-center px-4 gap-4">
                        <div className="size-1.5 rounded-full bg-primary/40"></div>
                        <div className="h-1.5 w-20 bg-white/5 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-span-9 flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { l: 'Growth Metrics', v: `+${(salesCount / 1000).toFixed(1)}k`, c: 'text-primary' },
                      { l: 'Efficiency', v: '98.4%', c: 'text-white' },
                      { l: 'Operational Stress', v: `${stressLevel}%`, c: stressLevel > 50 ? 'text-red-400' : 'text-primary' }
                    ].map((s, i) => (
                      <div key={i} className={`glass-panel p-6 rounded-3xl border-white/10 transition-all duration-1000 ${phase === 'active' ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                        <div className="text-[9px] font-bold uppercase text-white/30 tracking-[0.2em] mb-2">{s.l}</div>
                        <div className={`text-2xl font-black tabular-nums ${s.c}`}>{phase === 'active' ? s.v : '--'}</div>
                      </div>
                    ))}
                  </div>

                  <div className={`flex-grow glass-panel rounded-[2.5rem] border-white/10 p-8 relative overflow-hidden transition-all duration-1000 ${phase === 'active' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,224,123,0.05),transparent_50%)]"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-sm font-bold text-white">Live Scaling Matrix</div>
                        <div className="px-3 py-1 bg-primary/10 rounded-full text-primary text-[10px] font-bold animate-pulse">Synchronized</div>
                      </div>
                      <div className="flex-grow relative">
                        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path
                            d={phase === 'active' ? "M0,95 C15,90 30,40 50,55 T80,15 T100,5 L100,100 L0,100 Z" : "M0,100 L100,100"}
                            fill="url(#gradDash)"
                            className="transition-all duration-[2500ms]"
                          />
                          <path
                            d={phase === 'active' ? "M0,95 C15,90 30,40 50,55 T80,15 T100,5" : "M0,100 L100,100"}
                            fill="none" stroke="#38e07b" strokeWidth="1.5"
                            className="transition-all duration-[3000ms]"
                          />
                          <defs>
                            <linearGradient id="gradDash" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#38e07b" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#38e07b" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Depth and Perspective Overlays */}
            <div className={`absolute -inset-10 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10 transition-opacity duration-1500 ${phase === 'active' ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/5 via-transparent to-primary/5 pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .preserve-3d { transform-style: preserve-3d; }
          .rotate-X-20 { transform: rotateX(20deg) rotateY(-10deg); }
          .rotate-X-10 { transform: rotateX(10deg) rotateY(-5deg); }
          
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}} />

      </div>
    </div>
  );
};

export default Hero;
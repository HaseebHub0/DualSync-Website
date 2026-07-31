
import React, { useState, useEffect } from 'react';

interface PaFoodMockupProps {
  viewType: 'laptop' | 'mobile';
}

const PaFoodMockup: React.FC<PaFoodMockupProps> = ({ viewType }) => {
  const [phase, setPhase] = useState<'dashboard' | 'routes' | 'inventory' | 'management'>('dashboard');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const sequence = () => {
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
        setPhase('dashboard');
      }, 1500);

      setTimeout(() => {
        setSyncing(true);
        setTimeout(() => {
          setSyncing(false);
          setPhase('routes');
        }, 1500);
      }, 10000);

      setTimeout(() => {
        setSyncing(true);
        setTimeout(() => {
          setSyncing(false);
          setPhase('inventory');
        }, 1500);
      }, 20000);

      setTimeout(() => {
        setSyncing(true);
        setTimeout(() => {
          setSyncing(false);
          setPhase('management');
        }, 1500);
      }, 30000);

      setTimeout(sequence, 40000);
    };
    sequence();
  }, []);

  const brandRed = "#7f1d1d"; // Deep PaFood Red
  const brandGreen = "#38e07b"; // Sync Green

  if (viewType === 'mobile') {
    return (
      <div className="pafood-mockup w-full h-full bg-[#0a0a0a] relative overflow-hidden font-sans text-white select-none flex flex-col">
        {/* Mobile Header - Compact */}
        <div className="pt-7 pb-2 px-2 flex justify-between items-center bg-[#7f1d1d] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-1 overflow-hidden">
            <div className="size-4 rounded bg-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[8px]">person</span>
            </div>
            <div className="truncate">
              <div className="text-[5px] text-white/50 uppercase font-black leading-none">Booker</div>
              <div className="text-[7px] font-bold truncate">Ali Raza</div>
            </div>
          </div>
          <div className={`size-4 rounded-full flex items-center justify-center border border-white/10 ${syncing ? 'animate-spin' : ''}`}>
            <span className="material-symbols-outlined text-[8px]">sync</span>
          </div>
        </div>

        {/* Mobile Body */}
        <div className="flex-grow p-2 relative overflow-hidden flex flex-col gap-2">
          {/* Syncing Overlay */}
          <div className={`absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${syncing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col items-center gap-1">
              <div className="size-5 border-2 border-[#38e07b]/20 border-t-[#38e07b] rounded-full animate-spin"></div>
              <span className="text-[5px] font-black text-[#38e07b] uppercase tracking-widest">Syncing Data</span>
            </div>
          </div>

          {/* DASHBOARD / STATS */}
          <div className={`transition-all duration-700 flex flex-col gap-1.5 ${phase === 'dashboard' ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="text-[5px] text-white/30 uppercase font-black mb-0.5">Target Today</div>
              <div className="text-[10px] font-black text-[#38e07b]">Rs. 24,500 / 40k</div>
              <div className="w-full h-0.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-[#38e07b]" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 bg-white/5 rounded border border-white/5">
                <div className="text-[4px] text-white/30 uppercase font-bold">Orders</div>
                <div className="text-[8px] font-black">18</div>
              </div>
              <div className="p-1.5 bg-white/5 rounded border border-white/5">
                <div className="text-[4px] text-white/30 uppercase font-bold">Route</div>
                <div className="text-[8px] font-black">Route-A</div>
              </div>
            </div>
          </div>

          {/* ROUTES (MAP) */}
          <div className={`flex-grow relative transition-all duration-700 ${phase === 'routes' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 absolute pointer-events-none'}`}>
            <div className="w-full h-full bg-white/5 border border-white/10 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[length:10px_10px]"></div>
              <svg className="absolute inset-0 w-full h-full">
                <path d="M 10,80 L 30,60 L 60,70 L 80,40" fill="none" stroke="#38e07b" strokeWidth="1" strokeDasharray="100" strokeDashoffset={phase === 'routes' ? 0 : 100} className="transition-all duration-[3000ms]" />
              </svg>
              <div className="absolute top-1 left-1 px-1 py-0.5 bg-[#7f1d1d] rounded text-[4px] font-black uppercase tracking-tighter">Live Track</div>
              <div className="absolute bottom-1 left-1 right-1 p-1 bg-black/60 rounded border border-white/10">
                <div className="text-[4px] text-white/40 uppercase">Distance</div>
                <div className="text-[6px] font-bold">6.2 km / 10 km</div>
              </div>
            </div>
          </div>

          {/* INVENTORY */}
          <div className={`transition-all duration-700 flex flex-col gap-1 ${phase === 'inventory' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
            <div className="text-[6px] font-black text-white/20 uppercase mb-1">Stock in Vehicle</div>
            {['Glorynuts 50g', 'PaFood Mix', 'Peanuts 100g'].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-1.5 bg-white/[0.03] rounded border border-white/5">
                <span className="text-[7px] font-bold">{item}</span>
                <span className="text-[7px] text-[#38e07b] font-black">{120 - (i * 30)} pcs</span>
              </div>
            ))}
          </div>

          {/* MANAGEMENT (TARGETS) */}
          <div className={`transition-all duration-700 flex flex-col gap-1 ${phase === 'management' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 absolute pointer-events-none'}`}>
            <div className="text-[6px] font-black text-white/20 uppercase mb-1">Region Assignments</div>
            {['Zone-A (Active)', 'Zone-B (Pending)', 'Zone-C (Done)'].map((zone, i) => (
              <div key={i} className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] rounded">
                <div className={`size-1 rounded-full ${i === 0 ? 'bg-[#38e07b] animate-pulse' : i === 2 ? 'bg-blue-400' : 'bg-white/10'}`}></div>
                <span className="text-[7px] font-bold text-white/60">{zone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="h-8 border-t border-white/5 flex items-center justify-around bg-black/80 shrink-0">
          {['home', 'map', 'inventory_2', 'person'].map((icon, idx) => (
            <span key={idx} className={`material-symbols-outlined text-[10px] ${idx === (phase === 'dashboard' ? 0 : phase === 'routes' ? 1 : phase === 'inventory' ? 2 : 3) ? 'text-[#38e07b]' : 'text-white/20'}`}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // LAPTOP VIEW (ADMIN/KPO)
  return (
    <div className="pafood-mockup w-full h-full bg-[#050505] relative overflow-hidden font-sans text-white select-none flex">
      {/* Sidebar - Pro Layout */}
      <div className="w-10 md:w-16 border-r border-white/5 flex flex-col items-center py-4 gap-4 bg-[#0a0a0a]">
        <div className="size-6 md:size-10 bg-[#7f1d1d] rounded-lg flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(127,29,29,0.5)]">
          <div className="size-3 md:size-5 border-2 border-white/30 rounded-sm"></div>
        </div>
        <div className="flex flex-col gap-2 w-full px-1 md:px-2">
          {['dashboard', 'map', 'inventory_2', 'account_tree', 'groups', 'settings'].map((icon, i) => (
            <div key={i} className={`h-8 w-full rounded flex items-center justify-center transition-all ${(i === 0 && phase === 'dashboard') ||
                (i === 1 && phase === 'routes') ||
                (i === 2 && phase === 'inventory') ||
                (i === 3 && phase === 'management')
                ? 'bg-[#7f1d1d] text-white shadow-lg' : 'text-white/10 hover:bg-white/5 hover:text-white/40'}`}>
              <span className="material-symbols-outlined text-xs md:text-sm">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-grow flex flex-col">
        {/* Top Header */}
        <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/50">
          <div className="flex items-center gap-3">
            <span className="text-[6px] md:text-[8px] font-black uppercase text-white/20 tracking-widest">PaFood ERP</span>
            <span className="text-[6px] md:text-[8px] font-black uppercase text-[#38e07b] tracking-widest">/ {phase}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-1.5 bg-[#38e07b] rounded-full animate-pulse"></div>
              <span className="text-[6px] md:text-[8px] font-bold text-[#38e07b] uppercase">KPO Online</span>
            </div>
            <div className="h-6 w-px bg-white/5"></div>
            <div className="size-6 bg-white/5 rounded-full border border-white/10"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-4 md:p-6 relative overflow-hidden">
          {/* Dashboard Phase */}
          <div className={`absolute inset-4 md:inset-6 transition-all duration-1000 ${phase === 'dashboard' ? 'opacity-100' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { l: 'Total Revenue', v: 'Rs. 2.45M', c: 'text-[#38e07b]' },
                { l: 'Active Routes', v: '14 Regions', c: 'text-white' },
                { l: 'KPO Load', v: 'Optimal', c: 'text-blue-400' }
              ].map((s, i) => (
                <div key={i} className="p-3 md:p-4 bg-white/[0.03] border border-white/5 rounded-xl">
                  <div className="text-[6px] md:text-[7px] text-white/30 uppercase font-black mb-1">{s.l}</div>
                  <div className={`text-xs md:text-base font-black ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 h-[180px] md:h-[240px]">
              <div className="glass-panel p-4 rounded-2xl border-white/5 flex flex-col">
                <div className="text-[6px] font-black uppercase text-white/20 mb-4">Branch Analytics</div>
                <div className="flex-grow flex flex-col justify-around">
                  {['Lahore', 'Karachi', 'Faisalabad'].map((b, i) => (
                    <div key={b}>
                      <div className="flex justify-between text-[7px] font-bold mb-1">
                        <span>{b} Central</span>
                        <span className="text-[#38e07b]">{92 - i * 10}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7f1d1d]" style={{ width: `${92 - i * 10}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-4 rounded-2xl border-white/5 flex flex-col items-center justify-center">
                <div className="size-16 md:size-24 rounded-full border-[8px] border-[#7f1d1d]/20 border-t-[#38e07b] animate-spin-slow"></div>
                <div className="mt-4 text-[7px] font-black uppercase text-white/40 tracking-[0.2em]">Syncing Logistics</div>
              </div>
            </div>
          </div>

          {/* Routes Phase (Map History) */}
          <div className={`absolute inset-4 md:inset-6 transition-all duration-1000 ${phase === 'routes' ? 'opacity-100' : 'opacity-0 pointer-events-none scale-95'}`}>
            <div className="w-full h-full glass-panel rounded-3xl border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#0a0a0a]">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,transparent_19px,white_20px),linear-gradient(white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              </div>
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 100,200 L 250,150 L 400,220 L 550,120 L 700,180"
                  fill="none"
                  stroke="#38e07b"
                  strokeWidth="3"
                  strokeDasharray="1000"
                  strokeDashoffset={phase === 'routes' ? 0 : 1000}
                  className="transition-all duration-[8000ms] ease-in-out"
                />
                <circle cx="100" cy="200" r="4" fill="#38e07b" />
                <circle cx="700" cy="180" r="4" fill="#38e07b" className="animate-ping" />
              </svg>
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                  <div className="text-[6px] text-white/30 font-black uppercase">Tracking Booker</div>
                  <div className="text-[10px] font-black">Haseeb (Route-12)</div>
                  <div className="text-[7px] text-[#38e07b] font-bold mt-1 italic">Status: Delivering at Al-Noor Mart</div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Phase */}
          <div className={`absolute inset-4 md:inset-6 transition-all duration-1000 ${phase === 'inventory' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="grid grid-cols-4 gap-4 h-[240px] md:h-[320px] mb-4">
              {[45, 80, 60, 95].map((h, i) => (
                <div key={i} className="h-full glass-panel rounded-2xl border-white/5 flex flex-col p-4">
                  <div className="text-[7px] font-black uppercase text-white/30 mb-2">SKU Group {i + 1}</div>
                  <div className="flex-grow flex items-end">
                    <div className="w-full bg-[#7f1d1d]/40 border-t border-[#7f1d1d] rounded-t-lg transition-all duration-[2000ms]" style={{ height: phase === 'inventory' ? `${h}%` : '0%' }}></div>
                  </div>
                  <div className="text-[10px] font-black mt-2">{h}% Stock</div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#7f1d1d]/10 border border-[#7f1d1d]/20 rounded-xl flex items-center justify-between">
              <span className="text-[8px] font-black uppercase text-[#38e07b]">Stock Level Warning: Glorynuts 100g reaching threshold in Branch Karachi.</span>
              <button className="px-4 py-1.5 bg-[#7f1d1d] text-white text-[8px] font-black rounded-full shadow-lg">REPLENISH</button>
            </div>
          </div>

          {/* Management Phase */}
          <div className={`absolute inset-4 md:inset-6 transition-all duration-1000 ${phase === 'management' ? 'opacity-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Booker Target Assignment</h3>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[8px] font-bold">Region: Lahore South</div>
                  <div className="px-3 py-1 bg-[#38e07b]/10 text-[#38e07b] rounded-full border border-[#38e07b]/20 text-[8px] font-black">4 Active Staff</div>
                </div>
              </div>
              <div className="space-y-2 flex-grow">
                {[
                  { n: 'Raza Booker', t: 'Rs. 500k', p: '82%', r: 'Zone 4' },
                  { n: 'Umer Salesman', t: 'Rs. 800k', p: '45%', r: 'Zone 2' },
                  { n: 'Ali KPO', t: '120 Orders', p: '99%', r: 'HQ' }
                ].map((staff, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40">S{i + 1}</div>
                      <div>
                        <div className="text-[10px] font-black">{staff.n}</div>
                        <div className="text-[7px] text-white/30 uppercase font-bold">{staff.r}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-black text-[#38e07b]">{staff.p}</div>
                      <div className="text-[6px] text-white/40 uppercase font-black">{staff.t} Target</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaFoodMockup;

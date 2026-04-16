
import React, { useState, useEffect } from 'react';

const FinanceProMockup: React.FC = () => {
  const [phase, setPhase] = useState<'overview' | 'projects' | 'ledger' | 'summary'>('overview');

  useEffect(() => {
    const sequence = () => {
      setPhase('overview');
      setTimeout(() => setPhase('projects'), 3000);
      setTimeout(() => setPhase('ledger'), 6000);
      setTimeout(() => setPhase('summary'), 9000);
      setTimeout(sequence, 12000);
    };
    sequence();
  }, []);

  const transactions = [
    { label: 'UI Design', amount: '+$1,200', type: 'income', date: 'Today' },
    { label: 'SaaS Sub', amount: '-$49', type: 'expense', date: 'Yesterday' },
    { label: 'Pak Asian', amount: '+$3,500', type: 'income', date: '2 days' },
  ];

  return (
    <div className="w-full h-full bg-[#0a0f0d] relative overflow-hidden font-sans text-white select-none flex flex-col">
      {/* App Header - Reduced Padding */}
      <div className="pt-8 pb-3 px-4 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div>
          <div className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Dashboard</div>
          <div className="text-xs font-black">Haseeb Dev</div>
        </div>
        <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
          <span className="material-symbols-outlined text-primary text-[12px]">notifications</span>
        </div>
      </div>

      <div className="flex-grow p-3 relative overflow-hidden">
        {/* PHASE 1: OVERVIEW */}
        <div className={`absolute inset-3 transition-all duration-700 ${phase === 'overview' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="glass-panel p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border-primary/20 mb-3">
            <div className="text-[8px] text-primary font-black uppercase tracking-widest mb-0.5">Balance</div>
            <div className="text-xl font-black tracking-tighter mb-3">$12,480.00</div>
            <div className="flex gap-2">
              <div className="flex-grow p-1.5 bg-white/5 rounded-lg border border-white/5 text-center">
                <div className="text-[7px] text-white/30 uppercase font-bold">Income</div>
                <div className="text-[9px] font-black text-primary">+$4.2k</div>
              </div>
              <div className="flex-grow p-1.5 bg-white/5 rounded-lg border border-white/5 text-center">
                <div className="text-[7px] text-white/30 uppercase font-bold">Expense</div>
                <div className="text-[9px] font-black text-red-400">-$1.1k</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[8px] font-bold text-white/40 uppercase">Shortcuts</div>
            <div className="grid grid-cols-2 gap-2">
              {['Client', 'Invoice'].map(act => (
                <div key={act} className="p-2 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-sm">add_circle</span>
                  <span className="text-[8px] font-bold">New {act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHASE 2: PROJECTS */}
        <div className={`absolute inset-3 transition-all duration-700 ${phase === 'projects' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-black">Clients</h3>
            <span className="text-[8px] font-bold text-primary uppercase">All</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Pak Asian', budget: '$4.5k', status: 'Active' },
              { name: 'TechNova', budget: '$2.2k', status: 'Done' },
              { name: 'EduTrack', budget: '$8.0k', status: 'Wait' },
            ].map((client, i) => (
              <div key={i} className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="size-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[10px] text-white/50">business</span>
                  </div>
                  <div className="truncate">
                    <div className="text-[9px] font-black truncate">{client.name}</div>
                    <div className="text-[7px] text-white/40">{client.budget}</div>
                  </div>
                </div>
                <div className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${client.status === 'Done' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/40'}`}>
                  {client.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHASE 3: LEDGER */}
        <div className={`absolute inset-3 transition-all duration-700 ${phase === 'ledger' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <h3 className="text-xs font-black mb-3">Recent Items</h3>
          <div className="space-y-1.5">
            {transactions.map((tx, i) => (
              <div key={i} className="p-2 rounded-xl bg-white/[0.02] flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-400'}`}>
                    <span className="material-symbols-outlined text-[10px]">{tx.type === 'income' ? 'arrow_downward' : 'arrow_upward'}</span>
                  </div>
                  <div className="truncate">
                    <div className="text-[9px] font-bold truncate">{tx.label}</div>
                    <div className="text-[7px] text-white/40">{tx.date}</div>
                  </div>
                </div>
                <div className={`text-[9px] font-black shrink-0 ${tx.type === 'income' ? 'text-primary' : 'text-red-400'}`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHASE 4: SUMMARY */}
        <div className={`absolute inset-3 transition-all duration-700 ${phase === 'summary' ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="text-center mb-4 pt-2">
            <div className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1">Growth</div>
            <div className="text-xl font-black text-primary">+84%</div>
          </div>
          <div className="h-28 flex items-end justify-between gap-1 px-1">
            {[30, 60, 45, 90, 75, 100].map((h, i) => (
              <div key={i} className="flex-grow relative group">
                <div
                  className="w-full bg-primary/20 rounded-t-md transition-all duration-1000 border-x border-t border-primary/20"
                  style={{ height: phase === 'summary' ? `${h}%` : '0%' }}
                ></div>
                <div className="text-[6px] text-white/20 text-center mt-1 font-bold">M{i + 1}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-2.5 glass-panel rounded-xl text-center">
            <p className="text-[8px] text-white/60 leading-tight">Your revenue stream is optimizing. Expansion is recommended.</p>
          </div>
        </div>
      </div>

      {/* Bottom Nav - Scaled Down */}
      <div className="h-12 border-t border-white/5 flex items-center justify-around px-4 bg-black/40">
        {[
          { i: 'home', a: phase === 'overview' },
          { i: 'folder', a: phase === 'projects' },
          { i: 'receipt_long', a: phase === 'ledger' },
          { i: 'bar_chart', a: phase === 'summary' }
        ].map((btn, idx) => (
          <span key={idx} className={`material-symbols-outlined text-base transition-colors ${btn.a ? 'text-primary' : 'text-white/20'}`}>
            {btn.i}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FinanceProMockup;

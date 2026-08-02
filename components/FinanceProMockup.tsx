import React from 'react';

/**
 * Finance Pro — mobile ledger UI shown inside the phone DeviceFrame
 * (aspect 9/19). Rebuilt as a calm, dense product surface: one hero number,
 * a live balance curve, and a real transaction ledger.
 *
 * The previous version cycled through four "phases" on a timer, which meant
 * the screenshot a visitor saw depended on when they happened to look. It is
 * now a single considered state — the shot you would put in a case study.
 *
 * Deliberately stays dark in both site themes: it is a dark product UI being
 * photographed inside a device, the way Linear and Stripe present their apps.
 */

const txns = [
  { label: 'Pak Asian Foods', meta: 'Invoice #2214 · Today', amount: '+₨ 340,000', up: true },
  { label: 'AWS — eu-west-1', meta: 'Infrastructure · Yesterday', amount: '−₨ 18,400', up: false },
  { label: 'TechNova Ltd', meta: 'Retainer · 2 days', amount: '+₨ 120,000', up: true },
  { label: 'Figma — Organisation', meta: 'Software · 4 days', amount: '−₨ 9,200', up: false },
];

const FinanceProMockup: React.FC = () => (
  <div className="finance-mockup w-full h-full bg-[#080d0a] text-white flex flex-col overflow-hidden select-none">
    {/* Status bar */}
    <div className="flex items-center justify-between px-5 pt-3.5 pb-1 text-[7px] font-semibold text-white/50 tabular-nums">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="material-symbols-outlined text-[8px]">signal_cellular_alt</span>
        <span className="material-symbols-outlined text-[8px]">wifi</span>
        <span className="material-symbols-outlined text-[8px]">battery_full</span>
      </div>
    </div>

    {/* Header */}
    <div className="px-5 pt-3 flex items-start justify-between">
      <div>
        <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Net position
        </div>
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-[10px] font-semibold text-white/40">₨</span>
          <span className="text-[26px] leading-none font-black tracking-tighter tabular-nums">
            1,284,900
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#38e07b]/15 text-[#38e07b] text-[7px] font-bold rounded-sm">
            <span className="material-symbols-outlined text-[8px]">trending_up</span>
            18.4%
          </span>
          <span className="text-[7px] text-white/30">vs last quarter</span>
        </div>
      </div>
      <div className="size-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[8px] font-bold text-white/70">
        MH
      </div>
    </div>

    {/* Balance curve */}
    <div className="px-5 mt-4">
      <div className="relative h-[74px] rounded-lg bg-white/[0.03] border border-white/[0.07] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 74" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fpFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38e07b" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#38e07b" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[18, 37, 56].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          <path
            d="M0,62 C22,58 30,44 48,46 C66,48 74,30 94,32 C114,34 122,20 142,17 C162,14 176,9 200,6 L200,74 L0,74 Z"
            fill="url(#fpFill)"
          />
          <path
            d="M0,62 C22,58 30,44 48,46 C66,48 74,30 94,32 C114,34 122,20 142,17 C162,14 176,9 200,6"
            fill="none"
            stroke="#38e07b"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute right-[7px] top-[4px] size-1.5 rounded-full bg-[#38e07b] shadow-[0_0_8px_#38e07b] animate-pulse" />
        <div className="absolute left-3 bottom-2 flex gap-3 text-[6px] font-semibold uppercase tracking-[0.14em] text-white/25">
          <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
        </div>
      </div>
    </div>

    {/* Split stats */}
    <div className="px-5 mt-3 grid grid-cols-2 gap-2">
      <div className="rounded-lg bg-white/[0.03] border border-white/[0.07] p-2.5">
        <div className="text-[6px] font-semibold uppercase tracking-[0.16em] text-white/30 mb-1">
          Receivable
        </div>
        <div className="text-[13px] font-black tabular-nums tracking-tight">₨ 462k</div>
        <div className="mt-1.5 h-0.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full w-[72%] bg-[#38e07b] rounded-full" />
        </div>
      </div>
      <div className="rounded-lg bg-white/[0.03] border border-white/[0.07] p-2.5">
        <div className="text-[6px] font-semibold uppercase tracking-[0.16em] text-white/30 mb-1">
          Burn / mo
        </div>
        <div className="text-[13px] font-black tabular-nums tracking-tight">₨ 88k</div>
        <div className="mt-1.5 h-0.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full w-[34%] bg-white/40 rounded-full" />
        </div>
      </div>
    </div>

    {/* Ledger */}
    <div className="px-5 mt-4 flex-grow min-h-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Activity
        </span>
        <span className="text-[7px] font-semibold text-[#38e07b]">See all</span>
      </div>
      <div className="flex flex-col">
        {txns.map((t) => (
          <div key={t.label} className="flex items-center gap-2.5 py-[7px] border-b border-white/[0.05]">
            <div
              className={`size-5 rounded-md flex items-center justify-center shrink-0 ${
                t.up ? 'bg-[#38e07b]/12 text-[#38e07b]' : 'bg-white/[0.06] text-white/45'
              }`}
            >
              <span className="material-symbols-outlined text-[9px]">
                {t.up ? 'arrow_downward' : 'arrow_upward'}
              </span>
            </div>
            <div className="min-w-0 flex-grow">
              <div className="text-[8px] font-bold leading-tight truncate">{t.label}</div>
              <div className="text-[6px] text-white/30 truncate mt-0.5">{t.meta}</div>
            </div>
            <div
              className={`text-[8px] font-bold tabular-nums shrink-0 ${
                t.up ? 'text-[#38e07b]' : 'text-white/55'
              }`}
            >
              {t.amount}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Tab bar */}
    <div className="mt-auto px-5 pb-5 pt-2.5 flex items-center justify-between border-t border-white/[0.06]">
      {(
        [
          ['dashboard', true],
          ['receipt_long', false],
          ['group', false],
          ['insights', false],
        ] as [string, boolean][]
      ).map(([icon, active]) => (
        <span
          key={icon}
          className={`material-symbols-outlined text-[13px] ${active ? 'text-[#38e07b]' : 'text-white/25'}`}
        >
          {icon}
        </span>
      ))}
      <span className="size-6 rounded-full bg-[#38e07b] text-[#08120c] flex items-center justify-center">
        <span className="material-symbols-outlined text-[13px]">add</span>
      </span>
    </div>
  </div>
);

export default FinanceProMockup;

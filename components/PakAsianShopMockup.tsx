import React from 'react';

/**
 * PakAsianShop — storefront UI shown inside the laptop DeviceFrame
 * (aspect 16/10). Rebuilt as an editorial product page: a real browser
 * chrome, a full-bleed hero, and a product rail underneath.
 *
 * Like the other mockups this used to auto-cycle through browse → cart →
 * ordered → delivered on a timer, so what a visitor saw was luck of the
 * draw. It is now one deliberate frame.
 */

const products = [
  { name: 'Coated Peanuts', variant: 'Classic Salt', price: '₨ 480', tone: 'from-[#c2410c] to-[#7c2d12]' },
  { name: 'Coated Peanuts', variant: 'Chilli Lime', price: '₨ 520', tone: 'from-[#b91c1c] to-[#7f1d1d]' },
  { name: 'Roasted Cashews', variant: 'Himalayan Salt', price: '₨ 1,240', tone: 'from-[#a16207] to-[#713f12]' },
  { name: 'Trail Mix', variant: 'Berry & Nut', price: '₨ 890', tone: 'from-[#4d7c0f] to-[#365314]' },
];

const PakAsianShopMockup: React.FC = () => (
  <div className="pakasian-mockup w-full h-full bg-[#0a0f0c] text-white flex flex-col overflow-hidden select-none">
    {/* Browser chrome */}
    <div className="flex items-center gap-2.5 px-3 py-2 bg-black/50 border-b border-white/[0.07] shrink-0">
      <div className="flex gap-1.5">
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
      </div>
      <div className="flex-grow flex items-center gap-1.5 h-4 px-2 rounded bg-white/[0.05] border border-white/[0.06]">
        <span className="material-symbols-outlined text-[7px] text-[#38e07b]">lock</span>
        <span className="text-[6px] text-white/45 tracking-wide">pakasianshop.com/glorynuts</span>
      </div>
    </div>

    {/* Site nav */}
    <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06] shrink-0">
      <span className="text-[9px] font-black tracking-tight">
        PAK<span className="text-[#38e07b]">ASIAN</span>
      </span>
      <div className="flex items-center gap-4">
        {['Shop', 'Story', 'Stockists', 'Contact'].map((l, i) => (
          <span key={l} className={`text-[6.5px] font-semibold ${i === 0 ? 'text-white' : 'text-white/40'}`}>
            {l}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[9px] text-white/40">search</span>
        <span className="relative">
          <span className="material-symbols-outlined text-[9px] text-white/70">shopping_bag</span>
          <span className="absolute -top-1 -right-1.5 size-2.5 rounded-full bg-[#38e07b] text-[#08120c] text-[5px] font-black flex items-center justify-center">
            2
          </span>
        </span>
      </div>
    </div>

    {/* Hero */}
    <div className="relative flex-grow min-h-0 grid grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-4 relative z-10">
        <span className="inline-flex w-fit items-center gap-1 px-1.5 py-0.5 bg-[#38e07b]/12 border border-[#38e07b]/25 text-[#38e07b] text-[5.5px] font-bold uppercase tracking-[0.16em] mb-2.5">
          New season
        </span>
        <h1 className="text-[26px] leading-[0.92] font-black tracking-tighter">
          Glorynuts
          <span className="block text-[#38e07b]">Coated Peanuts</span>
        </h1>
        <p className="text-[6.5px] leading-relaxed text-white/45 max-w-[150px] mt-2.5">
          Slow-roasted, hand-coated in a recipe we have not changed since 1998.
          Crunch that survives the drive home.
        </p>

        <div className="flex items-baseline gap-2 mt-3.5">
          <span className="text-[15px] font-black tracking-tight tabular-nums">₨ 480</span>
          <span className="text-[7px] text-white/25 line-through tabular-nums">₨ 600</span>
          <span className="text-[5.5px] font-bold text-[#38e07b]">−20%</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="h-6 px-3 bg-[#38e07b] text-[#08120c] text-[6px] font-black uppercase tracking-[0.14em] flex items-center">
            Add to bag
          </span>
          <span className="h-6 px-3 border border-white/15 text-[6px] font-bold uppercase tracking-[0.14em] flex items-center text-white/70">
            Subscribe
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3 text-[5.5px] text-white/35">
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[7px] text-[#38e07b]">local_shipping</span>
            Free over ₨ 2,000
          </span>
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[7px] text-[#38e07b]">verified</span>
            HACCP certified
          </span>
        </div>
      </div>

      {/* Product visual */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#c2410c] via-[#9a3412] to-[#431407]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.22),transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Stylised pack */}
          <div className="relative w-[52%] aspect-[3/4] rounded-md bg-gradient-to-b from-[#7f1d1d] to-[#450a0a] border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center gap-1 rotate-[-6deg]">
            <span className="text-[7px] font-black tracking-tight text-white/90">GLORY</span>
            <span className="text-[11px] font-black tracking-tighter text-[#fbbf24] leading-none">NUTS</span>
            <span className="text-[4.5px] font-bold uppercase tracking-[0.2em] text-white/50 mt-0.5">
              Coated Peanuts
            </span>
            <span className="mt-1.5 px-1.5 py-0.5 bg-black/30 text-[4.5px] font-bold text-white/70">
              200 g
            </span>
          </div>
        </div>
        <span className="absolute top-3 right-3 flex items-center gap-1 px-1.5 py-0.5 bg-black/45 backdrop-blur-sm text-[5px] font-bold text-white/80">
          <span className="size-1 rounded-full bg-[#38e07b] animate-pulse" />
          142 sold today
        </span>
      </div>
    </div>

    {/* Product rail */}
    <div className="shrink-0 border-t border-white/[0.06] px-5 py-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[5.5px] font-bold uppercase tracking-[0.18em] text-white/30">
          Pairs well with
        </span>
        <span className="text-[5.5px] font-bold text-[#38e07b]">View all 24</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {products.map((p) => (
          <div key={p.variant} className="flex items-center gap-1.5">
            <div className={`size-6 rounded bg-gradient-to-br ${p.tone} border border-white/10 shrink-0`} />
            <div className="min-w-0">
              <div className="text-[5.5px] font-bold truncate leading-tight">{p.variant}</div>
              <div className="text-[5.5px] text-white/40 tabular-nums mt-0.5">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PakAsianShopMockup;

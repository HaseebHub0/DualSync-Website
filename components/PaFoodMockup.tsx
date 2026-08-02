import React from 'react';

interface PaFoodMockupProps {
  viewType: 'laptop' | 'mobile';
}

/**
 * PaFood — the ERP + field-sales ecosystem. Two surfaces of one system:
 * the admin console on desktop, the salesman's route app on mobile.
 *
 * Rebuilt as dense, credible enterprise UI. Both views are single
 * considered states rather than the old timer-driven phase cycle, so what a
 * visitor sees is deterministic instead of luck of the draw.
 */

const routeStops = [
  { name: 'Gulberg Cash & Carry', qty: '48 cartons', status: 'done' },
  { name: 'Model Town Mart', qty: '22 cartons', status: 'done' },
  { name: 'DHA Phase 5 Depot', qty: '64 cartons', status: 'active' },
  { name: 'Johar Town Retail', qty: '30 cartons', status: 'queued' },
  { name: 'Cantt Wholesale', qty: '18 cartons', status: 'queued' },
];

const orders = [
  { id: 'PAF-9241', client: 'Gulberg Cash & Carry', value: '₨ 486,000', state: 'Verified', tone: 'ok' },
  { id: 'PAF-9240', client: 'Model Town Mart', value: '₨ 212,400', state: 'Verified', tone: 'ok' },
  { id: 'PAF-9239', client: 'DHA Phase 5 Depot', value: '₨ 640,900', state: 'In review', tone: 'warn' },
  { id: 'PAF-9238', client: 'Johar Town Retail', value: '₨ 298,100', state: 'Verified', tone: 'ok' },
  { id: 'PAF-9237', client: 'Cantt Wholesale', value: '₨ 174,600', state: 'Dispatched', tone: 'ok' },
];

const PaFoodMockup: React.FC<PaFoodMockupProps> = ({ viewType }) => {
  /* ── Mobile: field salesman route app ───────────────────────────────── */
  if (viewType === 'mobile') {
    return (
      <div className="pafood-mockup w-full h-full bg-[#080d0a] text-white flex flex-col overflow-hidden select-none">
        <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[6px] font-semibold text-white/50 tabular-nums">
          <span>9:41</span>
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[7px]">wifi</span>
            <span className="material-symbols-outlined text-[7px]">battery_full</span>
          </div>
        </div>

        <div className="px-4 pt-2 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[5.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Route 07 · Lahore South
              </div>
              <div className="text-[13px] font-black tracking-tight mt-1">Today&rsquo;s run</div>
            </div>
            <span className="flex items-center gap-1 px-1.5 py-0.5 bg-[#38e07b]/12 text-[#38e07b] text-[5px] font-bold">
              <span className="size-1 rounded-full bg-[#38e07b] animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="flex gap-2 mt-2.5">
            {(
              [
                ['Target', '₨ 1.8M'],
                ['Booked', '₨ 1.2M'],
                ['Stops', '3 / 5'],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="flex-1 rounded bg-white/[0.04] border border-white/[0.06] px-1.5 py-1">
                <div className="text-[4.5px] font-semibold uppercase tracking-[0.14em] text-white/30">{k}</div>
                <div className="text-[8px] font-black tabular-nums mt-0.5">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 h-0.5 w-full bg-white/[0.07] rounded-full overflow-hidden">
            <div className="h-full w-[66%] bg-[#38e07b] rounded-full" />
          </div>
        </div>

        {/* Map strip */}
        <div className="relative h-[64px] shrink-0 bg-[#0b1410] border-b border-white/[0.06] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:14px_14px]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 64" preserveAspectRatio="none">
            <path
              d="M12,52 C48,48 62,20 96,26 C130,32 150,14 190,10"
              fill="none"
              stroke="#38e07b"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
          </svg>
          <span className="absolute left-[5%] bottom-[16%] size-1.5 rounded-full bg-white/50" />
          <span className="absolute left-[47%] top-[38%] size-2 rounded-full bg-[#38e07b] shadow-[0_0_8px_#38e07b] animate-pulse" />
          <span className="absolute right-[4%] top-[12%] size-1.5 rounded-full bg-white/30" />
          <span className="absolute bottom-1.5 left-2 text-[4.5px] font-bold uppercase tracking-[0.16em] text-white/40">
            ETA 14 min · 4.2 km
          </span>
        </div>

        <div className="flex-grow min-h-0 px-4 pt-2.5">
          <div className="text-[5.5px] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1.5">
            Stops
          </div>
          <div className="flex flex-col">
            {routeStops.map((s) => (
              <div key={s.name} className="flex items-center gap-2 py-[6px] border-b border-white/[0.05]">
                <span
                  className={`size-3.5 rounded-full shrink-0 flex items-center justify-center border ${
                    s.status === 'done'
                      ? 'bg-[#38e07b]/15 border-[#38e07b]/40 text-[#38e07b]'
                      : s.status === 'active'
                      ? 'bg-[#38e07b] border-[#38e07b] text-[#08120c]'
                      : 'bg-white/[0.04] border-white/10 text-white/25'
                  }`}
                >
                  <span className="material-symbols-outlined text-[6px]">
                    {s.status === 'done' ? 'check' : s.status === 'active' ? 'navigation' : 'schedule'}
                  </span>
                </span>
                <div className="min-w-0 flex-grow">
                  <div className="text-[7px] font-bold truncate leading-tight">{s.name}</div>
                  <div className="text-[5px] text-white/30 mt-0.5">{s.qty}</div>
                </div>
                {s.status === 'active' && (
                  <span className="text-[5px] font-bold text-[#38e07b] shrink-0">NOW</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto px-4 pb-4 pt-2">
          <div className="h-7 w-full bg-[#38e07b] text-[#08120c] text-[6px] font-black uppercase tracking-[0.16em] flex items-center justify-center">
            Book order · DHA Phase 5
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop: admin console ─────────────────────────────────────────── */
  return (
    <div className="pafood-mockup w-full h-full bg-[#080d0a] text-white flex overflow-hidden select-none">
      {/* Sidebar */}
      <aside className="w-[19%] shrink-0 border-r border-white/[0.06] flex flex-col py-3">
        <div className="px-3 flex items-center gap-1.5 mb-4">
          <span className="size-3.5 bg-[#38e07b] flex items-center justify-center text-[#08120c] text-[6px] font-black">
            P
          </span>
          <span className="text-[8px] font-black tracking-tight">PaFood</span>
          <span className="text-[5px] text-white/25 ml-auto">ERP</span>
        </div>

        {(
          [
            ['space_dashboard', 'Overview', true],
            ['receipt_long', 'Orders', false],
            ['inventory_2', 'Inventory', false],
            ['local_shipping', 'Routes', false],
            ['groups', 'Field team', false],
            ['insights', 'Reports', false],
            ['settings', 'Settings', false],
          ] as [string, string, boolean][]
        ).map(([icon, label, active]) => (
          <div
            key={label}
            className={`flex items-center gap-1.5 px-3 py-[5px] border-l-2 ${
              active ? 'bg-[#38e07b]/10 border-[#38e07b] text-white' : 'text-white/35 border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[8px]">{icon}</span>
            <span className="text-[6px] font-semibold">{label}</span>
          </div>
        ))}

        <div className="mt-auto px-3">
          <div className="rounded bg-white/[0.04] border border-white/[0.06] p-1.5">
            <div className="flex items-center gap-1">
              <span className="size-1 rounded-full bg-[#38e07b] animate-pulse" />
              <span className="text-[4.5px] font-bold uppercase tracking-[0.14em] text-white/45">
                Sync healthy
              </span>
            </div>
            <div className="text-[4.5px] text-white/25 mt-1">Last: 12s ago</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-grow min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] shrink-0">
          <div>
            <div className="text-[9px] font-black tracking-tight">Operations overview</div>
            <div className="text-[5px] text-white/30 mt-0.5">Tuesday, 14 October · Lahore HQ</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 px-2 border border-white/12 text-[5px] font-bold uppercase tracking-[0.14em] text-white/50 flex items-center">
              Export
            </span>
            <span className="h-4 px-2 bg-[#38e07b] text-[#08120c] text-[5px] font-black uppercase tracking-[0.14em] flex items-center">
              New order
            </span>
            <span className="size-4 rounded-full bg-white/[0.07] border border-white/10 text-[5px] font-bold flex items-center justify-center text-white/70">
              AA
            </span>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2.5 shrink-0">
          {(
            [
              ['Revenue today', '₨ 1.81M', '+12.4%', true],
              ['Orders', '148', '+8', true],
              ['Fill rate', '96.2%', '+1.1%', true],
              ['Stockouts', '3', '−2', false],
            ] as [string, string, string, boolean][]
          ).map(([k, v, delta, up]) => (
            <div key={k} className="rounded bg-white/[0.03] border border-white/[0.06] px-2 py-1.5">
              <div className="text-[4.5px] font-semibold uppercase tracking-[0.16em] text-white/30">{k}</div>
              <div className="text-[12px] font-black tabular-nums tracking-tight mt-0.5">{v}</div>
              <div className={`text-[4.5px] font-bold mt-0.5 ${up ? 'text-[#38e07b]' : 'text-white/40'}`}>
                {delta} vs yesterday
              </div>
            </div>
          ))}
        </div>

        {/* Chart + inventory */}
        <div className="grid grid-cols-[1.65fr_1fr] gap-2 px-4 shrink-0">
          <div className="rounded bg-white/[0.03] border border-white/[0.06] p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[5px] font-bold uppercase tracking-[0.16em] text-white/35">
                Dispatch volume · 14 days
              </span>
              <span className="text-[4.5px] text-[#38e07b] font-bold">+18.4%</span>
            </div>
            <div className="relative h-[52px]">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 52" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pfFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38e07b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#38e07b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[13, 26, 39].map((y) => (
                  <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}
                <path
                  d="M0,44 L16,40 L32,42 L48,33 L64,36 L80,26 L96,29 L112,20 L128,23 L144,14 L160,17 L176,9 L200,6 L200,52 L0,52 Z"
                  fill="url(#pfFill)"
                />
                <path
                  d="M0,44 L16,40 L32,42 L48,33 L64,36 L80,26 L96,29 L112,20 L128,23 L144,14 L160,17 L176,9 L200,6"
                  fill="none"
                  stroke="#38e07b"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="rounded bg-white/[0.03] border border-white/[0.06] p-2">
            <div className="text-[5px] font-bold uppercase tracking-[0.16em] text-white/35 mb-1.5">
              Low stock
            </div>
            {(
              [
                ['Coated Peanuts 200g', 18, 'crit'],
                ['Roasted Cashews 150g', 42, 'warn'],
                ['Trail Mix 250g', 76, 'ok'],
              ] as [string, number, string][]
            ).map(([name, pct, tone]) => (
              <div key={name} className="mb-1.5">
                <div className="flex justify-between text-[4.5px] mb-0.5">
                  <span className="text-white/55 truncate">{name}</span>
                  <span className="tabular-nums text-white/35">{pct}%</span>
                </div>
                <div className="h-0.5 w-full bg-white/[0.07] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tone === 'crit' ? 'bg-red-400' : tone === 'warn' ? 'bg-amber-400' : 'bg-[#38e07b]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order table */}
        <div className="flex-grow min-h-0 px-4 pt-2.5 pb-3">
          <div className="rounded bg-white/[0.03] border border-white/[0.06] h-full flex flex-col overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr_1.2fr_1fr] gap-2 px-2.5 py-1.5 border-b border-white/[0.06] text-[4.5px] font-bold uppercase tracking-[0.16em] text-white/30 shrink-0">
              <span>Order</span>
              <span>Client</span>
              <span className="text-right">Value</span>
              <span className="text-right">Status</span>
            </div>
            {orders.map((o) => (
              <div
                key={o.id}
                className="grid grid-cols-[1fr_2fr_1.2fr_1fr] gap-2 px-2.5 py-[5px] border-b border-white/[0.04] items-center"
              >
                <span className="text-[5px] font-mono text-white/45">{o.id}</span>
                <span className="text-[5.5px] font-semibold truncate">{o.client}</span>
                <span className="text-[5.5px] font-bold tabular-nums text-right">{o.value}</span>
                <span className="text-right">
                  <span
                    className={`inline-block px-1 py-[1px] text-[4.5px] font-bold ${
                      o.tone === 'ok' ? 'bg-[#38e07b]/12 text-[#38e07b]' : 'bg-amber-400/12 text-amber-300'
                    }`}
                  >
                    {o.state}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaFoodMockup;

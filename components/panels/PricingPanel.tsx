"use client";

import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const SERVICES = [
  { id: "scan-small", name: "Develop + Scan", price: "€13.00", accent: "border-gold text-gold" },
  { id: "develop-only", name: "Develop Only", price: "€5.00", accent: "border-moss text-moss" },
  { id: "scan-only", name: "Scan Only", price: "€7.50", accent: "border-red text-red" },
  { id: "prints", name: "Prints", price: "€0.35", accent: "border-clay text-clay" },
];

const ROWS = [
  {
    id: "develop-only",
    name: "Develop Only",
    note: "only negatives · no scans",
    format: "all formats",
    c41: 5,
    bw: 8,
  },
  {
    id: "scan-small",
    name: "Develop + Scan Small",
    note: "3000×2000 · jpg or tiff",
    format: "35mm",
    c41: 13,
    bw: 16,
  },
  {
    id: "scan-medium",
    name: "Develop + Scan Medium",
    note: "4500×3000 · jpg or tiff",
    format: "35mm",
    c41: 16,
    bw: 19,
  },
  {
    id: "scan-large",
    name: "Develop + Scan Large",
    note: "5400×3600 · jpg or tiff",
    format: "35mm",
    c41: 19,
    bw: 22,
  },
  {
    id: "scan-120",
    name: "Develop + Scan",
    note: "up to 5300×3500 · jpg or tiff",
    format: "120",
    c41: 16,
    bw: 19,
  },
];

const EXTRAS = [{ name: "Borders scans", price: "Free" }];

export function PricingPanel() {
  const { go, setPreselect } = useTab();

  return (
    <CosmicShell light>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-8">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
          What we develop
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setPreselect(s.id);
                go("order");
              }}
              className={`group flex flex-col items-center gap-2 rounded-lg border border-ink/15 bg-ink/[0.02] px-4 py-6 text-center transition hover:border-current hover:bg-ink/[0.05] ${s.accent}`}
            >
              <span className="font-display text-sm tracking-wide text-ink">{s.name}</span>
              <span className="font-mono text-xs opacity-80">from {s.price}</span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">
          Mix and match — one box, any combination.
        </p>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
          Prices in euros, per roll
        </p>

        <div className="mx-auto mt-6 w-full max-w-3xl overflow-x-auto">
          <div className="min-w-[460px]">
            <div className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr] gap-3 border-b border-ink/15 pb-2 font-mono text-[10px] uppercase tracking-wider text-ink/40">
              <span>Option</span>
              <span>Format</span>
              <span className="text-right">C41</span>
              <span className="text-right">BW</span>
            </div>

            {ROWS.map((row) => (
              <button
                key={row.id}
                onClick={() => {
                  setPreselect(row.id);
                  go("order");
                }}
                className="grid w-full grid-cols-[2fr_1fr_0.8fr_0.8fr] items-center gap-3 border-b border-ink/10 py-4 text-left transition hover:bg-ink/[0.03]"
              >
                <span>
                  <span className="block font-display text-base leading-tight text-ink">{row.name}</span>
                  <span className="font-sans text-[11px] italic text-ink/45">{row.note}</span>
                </span>
                <span className="font-mono text-[12px] text-ink/60">{row.format}</span>
                <span className="text-right font-display text-lg text-red">€{row.c41}</span>
                <span className="text-right font-display text-lg text-ink/80">€{row.bw}</span>
              </button>
            ))}

            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-4 font-mono text-[11px] text-ink/55">
              <span>
                <b className="text-ink">Sleeve:</b> +€0.50/roll
              </span>
              <span>
                <b className="text-ink">Shipping:</b> flat €8.50
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-ink/10 pt-4 font-mono text-[11px] text-ink/55">
              {EXTRAS.map((e) => (
                <span key={e.name}>
                  {e.name} <b className="text-gold">{e.price}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CosmicShell>
  );
}

"use client";

import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const SERVICES = [
  { id: "scan-small", name: "Develop + Scan", price: "€13.00", accent: "border-gold" },
  { id: "develop-only", name: "Develop Only", price: "€5.00", accent: "border-ink/20" },
  { id: "scan-only", name: "Scan Only", price: "€7.50", accent: "border-ink/20" },
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
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-4">
        <p className="text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
          What we develop
        </p>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setPreselect(s.id);
                go("order");
              }}
              className={`group flex flex-col items-center gap-1.5 rounded-lg border border-ink/15 bg-ink/[0.02] px-4 py-3.5 text-center transition hover:border-current hover:bg-ink/[0.05] ${s.accent}`}
            >
              <span className="font-display text-base tracking-wide text-ink">{s.name}</span>
              <span className="font-mono text-sm font-bold text-ink">from {s.price}</span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-center font-mono text-sm font-bold uppercase tracking-wider text-ink">
          Mix and match — one box, any combination.
        </p>

        <p className="mt-4 text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
          Prices in euros, per roll
        </p>

        <div className="mx-auto mt-3 w-full max-w-3xl overflow-x-auto">
          <div className="min-w-[460px]">
            <div className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr] gap-3 border-b border-ink/15 pb-2 font-mono text-sm font-bold uppercase tracking-wider text-ink">
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
                className="grid w-full grid-cols-[2fr_1fr_0.8fr_0.8fr] items-center gap-3 border-b border-ink/10 py-2 text-left transition hover:bg-ink/[0.03]"
              >
                <span>
                  <span className="block font-display text-base leading-tight text-ink">{row.name}</span>
                  <span className="font-sans text-sm font-medium text-ink">{row.note}</span>
                </span>
                <span className="font-mono text-sm font-semibold text-ink">{row.format}</span>
                <span className="text-right font-display text-lg text-ink">€{row.c41}</span>
                <span className="text-right font-display text-lg text-ink">€{row.bw}</span>
              </button>
            ))}

            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3 font-mono text-sm font-semibold text-ink">
              <span>
                <b>Sleeve:</b> +€0.50/roll
              </span>
              <span>
                <b>Shipping:</b> flat €8.50
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 border-t border-ink/10 pt-2 font-mono text-sm font-semibold text-ink">
              {EXTRAS.map((e) => (
                <span key={e.name}>
                  {e.name} <b>{e.price}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CosmicShell>
  );
}

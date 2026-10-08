"use client";

import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const ROWS = [
  {
    id: "develop-only",
    name: "Develop Only",
    note: "only negatives · no scans",
    format: "all formats",
    c41: 5,
    bw: 8,
    e6: 10,
  },
  {
    id: "scan-lite",
    name: "Develop + Scan Lite",
    note: "3000×2000 · jpg or tiff",
    format: "35mm",
    c41: 10,
    bw: 13,
    e6: 15,
  },
  {
    id: "scan-medium",
    name: "Develop + Scan Medium",
    note: "4500×3000 · jpg or tiff",
    format: "35mm/120",
    c41: 13,
    bw: 16,
    e6: 18,
  },
  {
    id: "scan-xl",
    name: "Develop + Scan XL",
    note: "5300×3600 · jpg or tiff",
    format: "35mm",
    c41: 17,
    bw: 20,
    e6: 22,
  },
];

const EXTRAS = [
  { name: "Half-frame scans", price: "€3" },
  { name: "Panorama scans", price: "€3" },
  { name: "Borders scans", price: "Free" },
];

export function PricingPanel() {
  const { go, setPreselect } = useTab();

  return (
    <CosmicShell light>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-8">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
          Prices in euros, per roll
        </p>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[2fr_1fr_0.7fr_0.9fr_0.7fr] gap-3 border-b border-ink/15 pb-2 font-mono text-[10px] uppercase tracking-wider text-ink/40">
              <span>Option</span>
              <span>Format</span>
              <span className="text-right">C41</span>
              <span className="text-right">BW</span>
              <span className="text-right">E6</span>
            </div>

            {ROWS.map((row) => (
              <button
                key={row.id}
                onClick={() => {
                  setPreselect(row.id);
                  go("order");
                }}
                className="grid w-full grid-cols-[2fr_1fr_0.7fr_0.9fr_0.7fr] items-center gap-3 border-b border-ink/10 py-4 text-left transition hover:bg-ink/[0.03]"
              >
                <span>
                  <span className="block font-display text-base leading-tight text-ink">{row.name}</span>
                  <span className="font-sans text-[11px] italic text-ink/45">{row.note}</span>
                </span>
                <span className="font-mono text-[12px] text-ink/60">{row.format}</span>
                <span className="text-right font-display text-lg text-red">€{row.c41}</span>
                <span className="text-right font-display text-lg text-ink/80">€{row.bw}</span>
                <span className="text-right font-display text-lg text-ink/80">€{row.e6}</span>
              </button>
            ))}

            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-4 font-mono text-[11px] text-ink/55">
              <span>
                <b className="text-ink">Push:</b> +€2/stop
              </span>
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

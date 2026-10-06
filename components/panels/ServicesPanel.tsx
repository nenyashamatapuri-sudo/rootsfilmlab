"use client";

import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const SERVICES = [
  { id: "develop-scan", name: "Develop + Scan", price: "€9.50", accent: "border-gold text-gold" },
  { id: "develop-only", name: "Develop Only", price: "€6.00", accent: "border-cyan text-cyan" },
  { id: "scan-only", name: "Scan Only", price: "€7.50", accent: "border-red text-red" },
  { id: "prints", name: "Prints", price: "€0.35", accent: "border-blue text-blue" },
  { id: "film-post", name: "Film, by Post", price: "€8.00", accent: "border-pink text-pink" },
];

export function ServicesPanel() {
  const { go, setPreselect } = useTab();

  return (
    <CosmicShell>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          What we develop
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setPreselect(s.id);
                go("order");
              }}
              className={`group flex flex-col items-center gap-2 rounded-lg border border-paper/15 bg-paper/[0.03] px-4 py-6 text-center backdrop-blur-sm transition hover:border-current hover:bg-paper/[0.06] ${s.accent}`}
            >
              <span className="font-display text-sm tracking-wide text-paper">{s.name}</span>
              <span className="font-mono text-xs opacity-80">from {s.price}</span>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-wider text-paper/35">
          Mix and match — one box, any combination.
        </p>
      </div>
    </CosmicShell>
  );
}

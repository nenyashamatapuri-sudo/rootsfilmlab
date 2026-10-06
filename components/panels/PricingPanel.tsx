"use client";

import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const TIERS = [
  {
    id: "develop-only",
    name: "Develop Only",
    price: "€6.00",
    features: ["C-41, B&W or E-6", "Returned by post"],
  },
  {
    id: "develop-scan",
    name: "Develop + Scan",
    price: "€9.50",
    features: ["2000dpi scans", "Online library"],
    featured: true,
  },
  {
    id: "scan-only",
    name: "Scan Only",
    price: "€7.50",
    features: ["Your negatives", "High-res files"],
  },
];

export function PricingPanel() {
  const { go, setPreselect } = useTab();

  return (
    <CosmicShell>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          Simple, per roll
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={
                "flex flex-col items-center gap-3 rounded-lg border px-6 py-8 text-center backdrop-blur-sm " +
                (tier.featured
                  ? "border-gold bg-gold/10"
                  : "border-paper/15 bg-paper/[0.03]")
              }
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-paper/55">{tier.name}</p>
              <p className="font-display text-3xl text-paper">{tier.price}</p>
              <ul className="font-mono text-[11px] text-paper/60">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setPreselect(tier.id);
                  go("order");
                }}
                className={
                  "mt-2 w-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition " +
                  (tier.featured
                    ? "border-gold text-gold hover:bg-gold hover:text-ink"
                    : "border-paper/30 text-paper/80 hover:border-paper hover:text-paper")
                }
              >
                Order
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-paper/35">
          No subscriptions. EU shipping added at checkout.
        </p>
      </div>
    </CosmicShell>
  );
}

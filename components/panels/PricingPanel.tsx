"use client";

import { useTab } from "../TabContext";
import { Squiggle } from "../Squiggle";

const TIERS = [
  {
    name: "Develop Only",
    price: "€6.00",
    unit: "per roll",
    features: ["C-41, B&W or E-6", "Cut & sleeved negatives", "Returned by post"],
  },
  {
    name: "Develop + Scan",
    price: "€9.50",
    unit: "per roll",
    features: [
      "Everything in Develop Only",
      "2000dpi scans, dust & scratch pass",
      "Delivered to your online library",
    ],
    featured: true,
  },
  {
    name: "Scan Only",
    price: "€7.50",
    unit: "per roll",
    features: ["Send your own negatives", "High-res TIFF or JPEG", "Same library, same account"],
  },
];

export function PricingPanel() {
  const { go } = useTab();

  return (
    <div className="relative flex h-full min-h-full flex-col justify-center overflow-y-auto bg-paper p-5 sm:p-10">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">Pricing</p>
        <h2 className="stamp-shadow mt-2 font-display text-4xl leading-none sm:text-6xl">
          SIMPLE, PER ROLL.
        </h2>
        <Squiggle className="mt-2 h-3 w-32 text-gold" />
        <p className="mt-3 max-w-xl font-sans text-[14px] leading-relaxed text-ink/70">
          No subscriptions, no minimum order. EU shipping costs are added at
          checkout.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -1 : 1.2}deg)` }}
              className={
                "flex flex-col gap-4 border-[3px] p-6 transition hover:rotate-0 " +
                (tier.featured
                  ? "border-ink bg-blue text-paper shadow-[8px_8px_0_var(--color-ink)]"
                  : "border-ink bg-paper text-ink hover:shadow-[7px_7px_0_var(--color-ink)]")
              }
            >
              <h3 className="font-mono text-[11px] uppercase tracking-wider opacity-70">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl leading-none">{tier.price}</span>
                <span className="font-mono text-[11px] uppercase tracking-wide opacity-60">
                  {tier.unit}
                </span>
              </div>
              <ul className="flex flex-1 flex-col gap-1.5 font-sans text-[13px] leading-relaxed opacity-85">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-red">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => go("contact")}
                className={
                  "mt-1 border-2 px-5 py-2.5 text-center font-mono text-[12px] uppercase tracking-wider transition " +
                  (tier.featured
                    ? "border-paper hover:bg-paper hover:text-ink"
                    : "border-ink hover:bg-ink hover:text-paper")
                }
              >
                Start an order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

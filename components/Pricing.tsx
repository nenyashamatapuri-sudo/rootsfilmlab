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

export function Pricing() {
  return (
    <section id="pricing" className="bg-paper py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">Pricing</p>
        <h2 className="stamp-shadow mt-2 font-display text-5xl leading-none sm:text-6xl">
          SIMPLE, PER ROLL.
        </h2>
        <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-ink/70">
          No subscriptions, no minimum order. Prices include standard shipping within
          the Netherlands — EU shipping costs are added at checkout.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                "flex flex-col gap-6 border p-8 " +
                (tier.featured
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink")
              }
            >
              <h3 className="font-mono text-[12px] uppercase tracking-wider opacity-70">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl leading-none">{tier.price}</span>
                <span className="font-mono text-[12px] uppercase tracking-wide opacity-60">
                  {tier.unit}
                </span>
              </div>
              <ul className="flex flex-1 flex-col gap-2 font-sans text-[14px] leading-relaxed opacity-85">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-red">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className={
                  "mt-2 border px-5 py-3 text-center font-mono text-[12px] uppercase tracking-wider transition " +
                  (tier.featured
                    ? "border-paper hover:bg-paper hover:text-ink"
                    : "border-ink hover:bg-ink hover:text-paper")
                }
              >
                Start an order
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

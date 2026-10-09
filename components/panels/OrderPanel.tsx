"use client";

import { useState } from "react";
import RootsVisionLazy from "../three/RootsVisionLazy";
import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

type RollType = "c41" | "bw" | "scan-only";
type Format = "35mm" | "120";
type ScanTier = "develop-only" | "small" | "medium" | "large";
type Delivery = "dropoff" | "post";
type Counts = Record<RollType, Record<Format, number>>;
type StepId = "rolls" | "scanTier" | "addons" | "delivery" | "summary";
type LineItem = { label: string; price: number };

const ZERO_COUNTS: Counts = {
  c41: { "35mm": 0, "120": 0 },
  bw: { "35mm": 0, "120": 0 },
  "scan-only": { "35mm": 0, "120": 0 },
};

const ROLL_TYPES: { id: RollType; name: string; hint: string }[] = [
  { id: "c41", name: "Colour · C41", hint: "standard colour negative film" },
  { id: "bw", name: "Black & White", hint: "black & white negative film" },
  { id: "scan-only", name: "Already developed", hint: "just scan the negatives" },
];

const SCAN_TIER_CHOICES: { id: ScanTier; name: string; hint: string }[] = [
  { id: "develop-only", name: "Develop Only", hint: "negatives, no scans" },
  { id: "small", name: "Scan Small", hint: "3000×2000" },
  { id: "medium", name: "Scan Medium", hint: "4500×3000" },
  { id: "large", name: "Scan Large", hint: "5400×3600" },
];

const DELIVERY_CHOICES: { id: Delivery; name: string; hint: string }[] = [
  { id: "dropoff", name: "Drop it off", hint: "Amsterdam address, free" },
  { id: "post", name: "Send it by post", hint: "+€8.50 return shipping" },
];

const PRICE_TABLE: Record<string, Record<"c41" | "bw", number>> = {
  "develop-only": { c41: 5, bw: 8 },
  "develop-scan:35mm:small": { c41: 13, bw: 16 },
  "develop-scan:35mm:medium": { c41: 16, bw: 19 },
  "develop-scan:35mm:large": { c41: 19, bw: 22 },
  "develop-scan:120": { c41: 16, bw: 19 },
};

function priceFor(rollType: RollType, format: Format, scanTier: ScanTier | null) {
  if (rollType === "scan-only") return 7.5;
  if (!scanTier || scanTier === "develop-only") return PRICE_TABLE["develop-only"][rollType];
  if (format === "120") return PRICE_TABLE["develop-scan:120"][rollType];
  return PRICE_TABLE[`develop-scan:35mm:${scanTier}`][rollType];
}

function baseHint(type: RollType) {
  if (type === "scan-only") return "€7.50 / roll";
  return `from €${PRICE_TABLE["develop-only"][type].toFixed(2)} / roll`;
}

function fromPreselect(id: string | null): { scanTier: ScanTier | null; openScanOnly: boolean } {
  switch (id) {
    case "develop-only":
      return { scanTier: "develop-only", openScanOnly: false };
    case "scan-small":
      return { scanTier: "small", openScanOnly: false };
    case "scan-medium":
      return { scanTier: "medium", openScanOnly: false };
    case "scan-large":
      return { scanTier: "large", openScanOnly: false };
    case "scan-only":
      return { scanTier: null, openScanOnly: true };
    default:
      return { scanTier: null, openScanOnly: false };
  }
}

// ---- Shopify checkout prep -------------------------------------------------
// Fill these in once the real store exists and this goes live:
//  - SHOPIFY_STORE_DOMAIN: the store's myshopify.com domain.
//  - SHOPIFY_VARIANTS: one Shopify product-variant ID per priced line below,
//    keyed the same way PRICE_TABLE is (plus "scan-only" and the add-ons).
// With both filled in, buildShopifyCheckoutUrl() returns a real cart
// permalink (https://shopify.dev/docs/api/ajax/reference/cart#cart-permalink)
// that adds every line item and sends the customer straight into Shopify's
// own checkout — no backend or API key needed for this redirect flow. Until
// then the order button below falls back to emailing us the same breakdown.
const SHOPIFY_STORE_DOMAIN = ""; // e.g. "roots-film-lab.myshopify.com"
const SHOPIFY_VARIANTS: Partial<Record<string, string>> = {
  "develop-only:c41": "",
  "develop-only:bw": "",
  "develop-scan:35mm:small:c41": "",
  "develop-scan:35mm:small:bw": "",
  "develop-scan:35mm:medium:c41": "",
  "develop-scan:35mm:medium:bw": "",
  "develop-scan:35mm:large:c41": "",
  "develop-scan:35mm:large:bw": "",
  "develop-scan:120:c41": "",
  "develop-scan:120:bw": "",
  "scan-only": "",
  "addon:sleeve": "",
  "addon:prints": "",
  "addon:post": "",
};

function shopifyLineKey(type: RollType, format: Format, scanTier: ScanTier | null) {
  if (type === "scan-only") return "scan-only";
  if (!scanTier || scanTier === "develop-only") return `develop-only:${type}`;
  if (format === "120") return `develop-scan:120:${type}`;
  return `develop-scan:35mm:${scanTier}:${type}`;
}

function buildShopifyCheckoutUrl(lines: { variantKey: string; qty: number }[]) {
  if (!SHOPIFY_STORE_DOMAIN) return null;
  const parts = lines
    .map(({ variantKey, qty }) => {
      const variantId = SHOPIFY_VARIANTS[variantKey];
      return variantId ? `${variantId}:${qty}` : null;
    })
    .filter((p): p is string => Boolean(p));
  if (parts.length === 0) return null;
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${parts.join(",")}`;
}

export function OrderPanel() {
  const { preselect } = useTab();
  const initial = fromPreselect(preselect);

  const [open, setOpen] = useState<Record<RollType, boolean>>({
    c41: false,
    bw: false,
    "scan-only": initial.openScanOnly,
  });
  const [counts, setCounts] = useState<Counts>(ZERO_COUNTS);
  const [scanTier, setScanTier] = useState<ScanTier | null>(initial.scanTier);
  const [sleeve, setSleeve] = useState(false);
  const [printsOn, setPrintsOn] = useState(preselect === "prints");
  const [printsQty, setPrintsQty] = useState(24);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [stepId, setStepId] = useState<StepId>("rolls");

  const setCount = (type: RollType, format: Format, value: number) =>
    setCounts((c) => ({ ...c, [type]: { ...c[type], [format]: Math.max(0, value) } }));

  const toggle = (type: RollType) =>
    setOpen((o) => {
      const next = !o[type];
      if (!next) setCounts((c) => ({ ...c, [type]: { "35mm": 0, "120": 0 } }));
      return { ...o, [type]: next };
    });

  const developRolls = counts.c41["35mm"] + counts.c41["120"] + counts.bw["35mm"] + counts.bw["120"];
  const scanOnlyRolls = counts["scan-only"]["35mm"] + counts["scan-only"]["120"];
  const totalRolls = developRolls + scanOnlyRolls;

  const needsScanTier = developRolls > 0;

  const steps: StepId[] = ["rolls", ...(needsScanTier ? (["scanTier"] as StepId[]) : []), "addons", "delivery", "summary"];
  const goNext = () => {
    const i = steps.indexOf(stepId);
    setStepId(steps[Math.min(i + 1, steps.length - 1)]);
  };
  const back = () => {
    const i = steps.indexOf(stepId);
    if (i > 0) setStepId(steps[i - 1]);
  };

  const rollLines: LineItem[] = (["c41", "bw", "scan-only"] as RollType[]).flatMap((type) =>
    (["35mm", "120"] as Format[])
      .filter((format) => counts[type][format] > 0)
      .map((format) => {
        const n = counts[type][format];
        const typeName = ROLL_TYPES.find((r) => r.id === type)!.name;
        const scanTierLabel = SCAN_TIER_CHOICES.find((s) => s.id === scanTier)?.name;
        const tier = type !== "scan-only" && scanTierLabel ? ` · ${scanTierLabel}` : "";
        return {
          label: `${n} roll${n === 1 ? "" : "s"} · ${typeName} · ${format}${tier}`,
          price: priceFor(type, format, scanTier) * n,
        };
      })
  );

  const sleeveTotal = sleeve ? totalRolls * 0.5 : 0;
  const printsTotal = printsOn ? printsQty * 0.35 : 0;
  const deliveryTotal = delivery === "post" ? 8.5 : 0;
  const deliveryLabel = DELIVERY_CHOICES.find((d) => d.id === delivery)?.name;

  const addonLines: LineItem[] = [
    sleeve && { label: "Sleeve the negatives", price: sleeveTotal },
    printsOn && { label: `Prints × ${printsQty}`, price: printsTotal },
    deliveryLabel && { label: `Delivery: ${deliveryLabel}`, price: deliveryTotal },
  ].filter(Boolean) as LineItem[];

  const summaryItems = [...rollLines, ...addonLines];
  const total = summaryItems.reduce((sum, item) => sum + item.price, 0);

  const subject = encodeURIComponent("New Roots order");
  const body = encodeURIComponent(
    `I'd like to order:\n${summaryItems.map((i) => `— ${i.label} — €${i.price.toFixed(2)}`).join("\n")}\n\nEstimated total: €${total.toFixed(2)}\n\nNotes: `
  );
  const mailtoHref = `mailto:hello@rootsfilmlab.nl?subject=${subject}&body=${body}`;

  const shopifyLines = [
    ...(["c41", "bw", "scan-only"] as RollType[]).flatMap((type) =>
      (["35mm", "120"] as Format[])
        .filter((format) => counts[type][format] > 0)
        .map((format) => ({ variantKey: shopifyLineKey(type, format, scanTier), qty: counts[type][format] }))
    ),
    ...(sleeve ? [{ variantKey: "addon:sleeve", qty: totalRolls }] : []),
    ...(printsOn ? [{ variantKey: "addon:prints", qty: printsQty }] : []),
    ...(delivery === "post" ? [{ variantKey: "addon:post", qty: 1 }] : []),
  ];
  const shopifyUrl = buildShopifyCheckoutUrl(shopifyLines);

  return (
    <CosmicShell
      light
      below={
        <div className="mx-auto h-56 w-full max-w-sm shrink-0 sm:h-64">
          <RootsVisionLazy />
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-10">
        {stepId !== "rolls" && (
          <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
            <button onClick={back} className="underline-offset-2 hover:text-ink hover:underline">
              ← Back
            </button>
          </div>
        )}

        {stepId === "rolls" && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
              What&apos;s on your rolls?
            </p>
            <div className="w-full max-w-md space-y-2.5">
              {ROLL_TYPES.map((rt) => (
                <div key={rt.id} className="overflow-hidden rounded-2xl border border-ink/15">
                  <button
                    onClick={() => toggle(rt.id)}
                    className={
                      "flex w-full items-center justify-between px-5 py-3.5 text-left font-mono text-[12px] uppercase tracking-wide transition " +
                      (open[rt.id] ? "bg-gold text-ink" : "text-ink/70 hover:bg-ink/[0.03] hover:text-ink")
                    }
                  >
                    <span>
                      {open[rt.id] ? "✓ " : ""}
                      {rt.name}
                      <span className="block font-sans text-[11px] italic normal-case opacity-60">{rt.hint}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] normal-case tracking-normal opacity-70">
                        {baseHint(rt.id)}
                      </span>
                      <span className="font-display text-lg">{open[rt.id] ? "–" : "+"}</span>
                    </span>
                  </button>

                  {open[rt.id] && (
                    <div className="flex flex-col gap-3 border-t border-ink/10 bg-ink/[0.02] px-5 py-4 sm:flex-row sm:justify-around">
                      {(["35mm", "120"] as Format[]).map((format) => (
                        <div key={format} className="flex items-center justify-between gap-3 sm:flex-col sm:gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                            {format}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setCount(rt.id, format, counts[rt.id][format] - 1)}
                              className="h-8 w-8 rounded-full border border-ink/25 font-display text-base text-ink transition hover:border-ink"
                            >
                              –
                            </button>
                            <span className="w-6 text-center font-display text-lg text-ink">
                              {counts[rt.id][format]}
                            </span>
                            <button
                              onClick={() => setCount(rt.id, format, counts[rt.id][format] + 1)}
                              className="h-8 w-8 rounded-full border border-ink/25 font-display text-base text-ink transition hover:border-ink"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {needsScanTier && (
              <p className="max-w-sm text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">
                Exact price for Colour/B&amp;W rolls depends on the scan option, chosen next.
              </p>
            )}

            <button
              onClick={goNext}
              disabled={totalRolls === 0}
              className="bg-gold px-8 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continue →
            </button>
          </div>
        )}

        {stepId === "scanTier" && (
          <Question title="How do you want it scanned?">
            <PillRow>
              {SCAN_TIER_CHOICES.map((s) => {
                const caption = (["c41", "bw"] as const)
                  .filter((t) => counts[t]["35mm"] + counts[t]["120"] > 0)
                  .map((t) => {
                    const fmt: Format = counts[t]["35mm"] > 0 ? "35mm" : "120";
                    return `${t === "c41" ? "C41" : "B&W"} €${priceFor(t, fmt, s.id).toFixed(2)}`;
                  })
                  .join(" · ");
                return (
                  <Pill
                    key={s.id}
                    active={scanTier === s.id}
                    onClick={() => {
                      setScanTier(s.id);
                      goNext();
                    }}
                  >
                    {s.name}
                    <span className="block font-sans text-[11px] italic normal-case opacity-60">
                      {s.hint} · {caption}
                    </span>
                  </Pill>
                );
              })}
            </PillRow>
          </Question>
        )}

        {stepId === "addons" && (
          <Question title="Add anything else?">
            <div className="flex flex-wrap justify-center gap-2.5">
              <Pill active={sleeve} onClick={() => setSleeve((v) => !v)}>
                Sleeve the negatives
                <span className="block font-sans text-[11px] italic normal-case opacity-60">+€0.50/roll</span>
              </Pill>
              <Pill active={printsOn} onClick={() => setPrintsOn((v) => !v)}>
                Prints
                <span className="block font-sans text-[11px] italic normal-case opacity-60">€0.35 each</span>
              </Pill>
            </div>
            {printsOn && (
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">How many?</span>
                <button
                  onClick={() => setPrintsQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-full border border-ink/25 font-display text-lg text-ink transition hover:border-ink"
                >
                  –
                </button>
                <span className="w-10 text-center font-display text-xl text-ink">{printsQty}</span>
                <button
                  onClick={() => setPrintsQty((q) => q + 1)}
                  className="h-9 w-9 rounded-full border border-ink/25 font-display text-lg text-ink transition hover:border-ink"
                >
                  +
                </button>
              </div>
            )}
            <NextButton onClick={goNext} />
          </Question>
        )}

        {stepId === "delivery" && (
          <Question title="How will we get it?">
            <PillRow>
              {DELIVERY_CHOICES.map((d) => (
                <Pill
                  key={d.id}
                  active={delivery === d.id}
                  onClick={() => {
                    setDelivery(d.id);
                    goNext();
                  }}
                >
                  {d.name}
                  <span className="block font-sans text-[11px] italic normal-case opacity-60">{d.hint}</span>
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "summary" && (
          <div className="flex flex-col items-center">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">Your order</p>
            <div className="mt-5 w-full max-w-sm divide-y divide-ink/10 border-y border-ink/10">
              {summaryItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="font-sans text-sm text-ink/80">{item.label}</span>
                  <span className="shrink-0 font-mono text-sm text-ink">€{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 font-display text-4xl text-red">€{total.toFixed(2)}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/40">Estimated total</p>

            <div className="mt-7 flex w-full max-w-sm flex-col items-center gap-3">
              <a
                href={shopifyUrl ?? mailtoHref}
                target={shopifyUrl ? "_blank" : undefined}
                rel={shopifyUrl ? "noopener noreferrer" : undefined}
                className="w-full bg-gold px-7 py-3.5 text-center font-mono text-[13px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
              >
                Order &amp; Pay →
              </a>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={mailtoHref}
                  className="border border-ink/30 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/80 transition hover:border-ink hover:text-ink"
                >
                  Email this order
                </a>
                <a
                  href="#"
                  className="border border-ink/30 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/80 transition hover:border-ink hover:text-ink"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">
              {shopifyUrl
                ? "Order & Pay hands this straight to Shopify checkout."
                : "Shopify checkout isn't connected yet — Order & Pay emails us this exact breakdown for now."}
            </p>
          </div>
        )}
      </div>
    </CosmicShell>
  );
}

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">{title}</p>
      {children}
    </div>
  );
}

function PillRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap justify-center gap-2.5">{children}</div>;
}

function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-gold px-8 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
    >
      Continue →
    </button>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-2xl border px-5 py-2.5 text-center font-mono text-[12px] uppercase tracking-wide transition " +
        (active
          ? "border-gold bg-gold text-ink"
          : "border-ink/25 text-ink/70 hover:border-ink/60 hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

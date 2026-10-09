"use client";

import { useState } from "react";
import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

type Core = "develop-only" | "develop-scan" | "scan-only";
type Format = "35mm" | "120";
type ScanSize = "small" | "medium" | "large";
type Process = "c41" | "bw" | "e6";
type Delivery = "dropoff" | "post";
type StepId = "core" | "format" | "scanSize" | "process" | "rolls" | "addons" | "delivery" | "summary";

const CORE_CHOICES: { id: Core; name: string; hint: string }[] = [
  { id: "develop-only", name: "Develop Only", hint: "just the negatives, no scans" },
  { id: "develop-scan", name: "Develop + Scan", hint: "negatives and digital files" },
  { id: "scan-only", name: "Scan Only", hint: "film you've already had developed" },
];

const FORMAT_CHOICES: { id: Format; name: string }[] = [
  { id: "35mm", name: "35mm" },
  { id: "120", name: "120" },
];

const SCAN_SIZE_CHOICES: { id: ScanSize; name: string; hint: string }[] = [
  { id: "small", name: "Small", hint: "3000×2000" },
  { id: "medium", name: "Medium", hint: "4500×3000" },
  { id: "large", name: "Large", hint: "5400×3600" },
];

const PROCESS_CHOICES: { id: Process; name: string }[] = [
  { id: "c41", name: "Colour · C41" },
  { id: "bw", name: "Black & White" },
  { id: "e6", name: "Slide · E6" },
];

const DELIVERY_CHOICES: { id: Delivery; name: string; hint: string }[] = [
  { id: "dropoff", name: "Drop it off", hint: "Amsterdam address, free" },
  { id: "post", name: "Send it by post", hint: "+€8.50 return shipping" },
];

const PRICE_TABLE: Record<string, Record<Process, number>> = {
  "develop-only": { c41: 5, bw: 8, e6: 10 },
  "scan-only": { c41: 7.5, bw: 7.5, e6: 7.5 },
  "develop-scan:35mm:small": { c41: 13, bw: 16, e6: 18 },
  "develop-scan:35mm:medium": { c41: 16, bw: 19, e6: 21 },
  "develop-scan:35mm:large": { c41: 19, bw: 22, e6: 24 },
  "develop-scan:120": { c41: 16, bw: 19, e6: 21 },
};

function unitPrice(core: Core, format: Format | null, scanSize: ScanSize | null, process: Process | null) {
  if (!process) return null;
  if (core === "develop-only") return PRICE_TABLE["develop-only"][process];
  if (core === "scan-only") return PRICE_TABLE["scan-only"][process];
  if (format === "120") return PRICE_TABLE["develop-scan:120"][process];
  if (format === "35mm" && scanSize) return PRICE_TABLE[`develop-scan:35mm:${scanSize}`][process];
  return null;
}

// Each answer narrows what's asked next — picking "Develop Only" means the
// scan-size and process-for-scanning questions never show up, picking "120"
// skips scan size entirely since that format only has one scan tier.
function stepsFor(core: Core | null, format: Format | null): StepId[] {
  const steps: StepId[] = ["core"];
  if (!core) return steps;
  steps.push("format");
  if (!format) return steps;
  if (core === "develop-scan" && format === "35mm") steps.push("scanSize");
  if (core !== "scan-only") steps.push("process");
  steps.push("rolls", "addons", "delivery", "summary");
  return steps;
}

function fromPreselect(id: string | null) {
  switch (id) {
    case "develop-only":
      return { core: "develop-only" as Core, format: null, scanSize: null };
    case "scan-only":
      return { core: "scan-only" as Core, format: null, scanSize: null };
    case "scan-small":
      return { core: "develop-scan" as Core, format: "35mm" as Format, scanSize: "small" as ScanSize };
    case "scan-medium":
      return { core: "develop-scan" as Core, format: "35mm" as Format, scanSize: "medium" as ScanSize };
    case "scan-large":
      return { core: "develop-scan" as Core, format: "35mm" as Format, scanSize: "large" as ScanSize };
    case "scan-120":
      return { core: "develop-scan" as Core, format: "120" as Format, scanSize: null };
    default:
      return { core: null, format: null, scanSize: null };
  }
}

export function OrderPanel() {
  const { preselect } = useTab();
  const initial = fromPreselect(preselect);

  const [core, setCore] = useState<Core | null>(initial.core);
  const [format, setFormat] = useState<Format | null>(initial.format);
  const [scanSize, setScanSize] = useState<ScanSize | null>(initial.scanSize);
  const [process, setProcess] = useState<Process | null>(null);
  const [rolls, setRolls] = useState(1);
  const [sleeve, setSleeve] = useState(false);
  const [printsOn, setPrintsOn] = useState(preselect === "prints");
  const [printsQty, setPrintsQty] = useState(24);
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  const steps = stepsFor(core, format);
  const initialStepIndex = steps.findIndex((s) => {
    if (s === "core") return core === null;
    if (s === "format") return format === null;
    if (s === "scanSize") return scanSize === null;
    if (s === "process") return process === null;
    return s === "rolls"; // first thing left unanswered once the branching is settled
  });
  const [stepId, setStepId] = useState<StepId>(steps[initialStepIndex === -1 ? 0 : initialStepIndex]);

  const advance = (nextSteps: StepId[], from: StepId) => {
    const i = nextSteps.indexOf(from);
    setStepId(nextSteps[Math.min(i + 1, nextSteps.length - 1)]);
  };
  const back = () => {
    const i = steps.indexOf(stepId);
    if (i > 0) setStepId(steps[i - 1]);
  };

  const unit = core ? unitPrice(core, format, scanSize, process) : null;
  const sleeveTotal = sleeve ? rolls * 0.5 : 0;
  const printsTotal = printsOn ? printsQty * 0.35 : 0;
  const deliveryTotal = delivery === "post" ? 8.5 : 0;
  const rollsTotal = unit !== null ? unit * rolls : 0;
  const total = rollsTotal + sleeveTotal + printsTotal + deliveryTotal;

  const coreLabel = CORE_CHOICES.find((c) => c.id === core)?.name;
  const processLabel = PROCESS_CHOICES.find((p) => p.id === process)?.name;
  const deliveryLabel = DELIVERY_CHOICES.find((d) => d.id === delivery)?.name;

  const summaryLines = [
    coreLabel && `${coreLabel}${format ? ` · ${format}` : ""}${scanSize ? ` · ${scanSize}` : ""}`,
    processLabel && `Process: ${processLabel}`,
    `Rolls: ${rolls}`,
    sleeve && "Add sleeves (+€0.50/roll)",
    printsOn && `Prints × ${printsQty}`,
    deliveryLabel && `Delivery: ${deliveryLabel}`,
  ].filter(Boolean) as string[];

  const subject = encodeURIComponent("New Roots order");
  const body = encodeURIComponent(
    `I'd like to order:\n— ${summaryLines.join("\n— ")}\n\nEstimated total: €${total.toFixed(2)}\n\nNotes: `
  );

  const crumb = [coreLabel, format, scanSize, processLabel].filter(Boolean).join(" · ");

  return (
    <CosmicShell light>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-10">
        {stepId !== "core" && (
          <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
            <button onClick={back} className="underline-offset-2 hover:text-ink hover:underline">
              ← Back
            </button>
            {crumb && <span className="truncate text-ink/55">{crumb}</span>}
          </div>
        )}

        {stepId === "core" && (
          <Question title="What do you want developed?">
            <PillRow>
              {CORE_CHOICES.map((c) => (
                <Pill
                  key={c.id}
                  active={core === c.id}
                  onClick={() => {
                    setCore(c.id);
                    setFormat(null);
                    setScanSize(null);
                    setProcess(null);
                    advance(stepsFor(c.id, null), "core");
                  }}
                >
                  {c.name}
                  <span className="block font-sans text-[11px] italic normal-case opacity-60">{c.hint}</span>
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "format" && core && (
          <Question title="What format is it?">
            <PillRow>
              {FORMAT_CHOICES.map((f) => (
                <Pill
                  key={f.id}
                  active={format === f.id}
                  onClick={() => {
                    setFormat(f.id);
                    setScanSize(null);
                    advance(stepsFor(core, f.id), "format");
                  }}
                >
                  {f.name}
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "scanSize" && (
          <Question title="What scan size?">
            <PillRow>
              {SCAN_SIZE_CHOICES.map((s) => (
                <Pill
                  key={s.id}
                  active={scanSize === s.id}
                  onClick={() => {
                    setScanSize(s.id);
                    advance(steps, "scanSize");
                  }}
                >
                  {s.name}
                  <span className="block font-sans text-[11px] italic normal-case opacity-60">{s.hint}</span>
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "process" && (
          <Question title="What's on the roll?">
            <PillRow>
              {PROCESS_CHOICES.map((p) => (
                <Pill
                  key={p.id}
                  active={process === p.id}
                  onClick={() => {
                    setProcess(p.id);
                    advance(steps, "process");
                  }}
                >
                  {p.name}
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "rolls" && (
          <Question title="How many rolls?">
            <div className="flex items-center gap-5">
              <button
                onClick={() => setRolls((r) => Math.max(1, r - 1))}
                className="h-11 w-11 rounded-full border border-ink/25 font-display text-xl text-ink transition hover:border-ink"
              >
                –
              </button>
              <span className="w-12 text-center font-display text-3xl text-ink">{rolls}</span>
              <button
                onClick={() => setRolls((r) => r + 1)}
                className="h-11 w-11 rounded-full border border-ink/25 font-display text-xl text-ink transition hover:border-ink"
              >
                +
              </button>
            </div>
            <NextButton onClick={() => advance(steps, "rolls")} />
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
            <NextButton onClick={() => advance(steps, "addons")} />
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
                    advance(steps, "delivery");
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
              {summaryLines.map((line) => (
                <p key={line} className="py-2.5 text-center font-sans text-sm text-ink/80">
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-5 font-display text-4xl text-red">€{total.toFixed(2)}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/40">Estimated total</p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:hello@rootsfilmlab.nl?subject=${subject}&body=${body}`}
                className="bg-gold px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
              >
                Email this order
              </a>
              <a
                href="#"
                className="border border-ink/30 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink/80 transition hover:border-ink hover:text-ink"
              >
                WhatsApp us
              </a>
            </div>
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">
              Online checkout via Shopify is on its way — for now this sends us the details above directly.
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

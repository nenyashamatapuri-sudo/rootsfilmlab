"use client";

import { useState } from "react";
import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

type Core = "develop-only" | "develop-scan" | "scan-only";
type Format = "35mm" | "120";
type ScanSize = "small" | "medium" | "large";
type Process = "c41" | "bw";
type Delivery = "dropoff" | "post";

type Batch = {
  id: number;
  format: Format;
  scanSize: ScanSize | null;
  process: Process | null;
  rolls: number;
};

type StepId =
  | "core"
  | "batchFormat"
  | "batchScanSize"
  | "batchProcess"
  | "batchRolls"
  | "batchList"
  | "addons"
  | "delivery"
  | "summary";

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
];

const DELIVERY_CHOICES: { id: Delivery; name: string; hint: string }[] = [
  { id: "dropoff", name: "Drop it off", hint: "Amsterdam address, free" },
  { id: "post", name: "Send it by post", hint: "+€8.50 return shipping" },
];

const PRICE_TABLE: Record<string, Record<Process, number>> = {
  "develop-only": { c41: 5, bw: 8 },
  "scan-only": { c41: 7.5, bw: 7.5 },
  "develop-scan:35mm:small": { c41: 13, bw: 16 },
  "develop-scan:35mm:medium": { c41: 16, bw: 19 },
  "develop-scan:35mm:large": { c41: 19, bw: 22 },
  "develop-scan:120": { c41: 16, bw: 19 },
};

function unitPrice(core: Core, format: Format, scanSize: ScanSize | null, process: Process | null) {
  const p = process ?? "c41";
  if (core === "develop-only") return PRICE_TABLE["develop-only"][p];
  if (core === "scan-only") return PRICE_TABLE["scan-only"][p];
  if (format === "120") return PRICE_TABLE["develop-scan:120"][p];
  if (scanSize) return PRICE_TABLE[`develop-scan:35mm:${scanSize}`][p];
  return 0;
}

// What's left to ask before a batch (one roll-type entry) is complete — skips
// scan size for 120 (only one tier) and skips process for Scan Only (flat
// price either way), so a simple roll never has to answer questions that
// don't change anything about it.
function nextDraftStep(
  core: Core,
  format: Format | null,
  scanSize: ScanSize | null,
  process: Process | null
): StepId {
  if (!format) return "batchFormat";
  if (core === "develop-scan" && format === "35mm" && !scanSize) return "batchScanSize";
  if (core !== "scan-only" && !process) return "batchProcess";
  return "batchRolls";
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
      return { core: null as Core | null, format: null as Format | null, scanSize: null as ScanSize | null };
  }
}

function batchLabel(core: Core, b: Batch) {
  const bits: string[] = [b.format];
  if (b.scanSize) bits.push(b.scanSize);
  if (b.process) bits.push(b.process === "c41" ? "colour" : "black & white");
  return `${b.rolls} roll${b.rolls === 1 ? "" : "s"} · ${bits.join(" · ")}`;
}

let batchCounter = 0;

export function OrderPanel() {
  const { preselect } = useTab();
  const initial = fromPreselect(preselect);

  const [core, setCore] = useState<Core | null>(initial.core);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [format, setFormat] = useState<Format | null>(initial.format);
  const [scanSize, setScanSize] = useState<ScanSize | null>(initial.scanSize);
  const [process, setProcess] = useState<Process | null>(null);
  const [rolls, setRolls] = useState(1);
  const [sleeve, setSleeve] = useState(false);
  const [printsOn, setPrintsOn] = useState(preselect === "prints");
  const [printsQty, setPrintsQty] = useState(24);
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  const [history, setHistory] = useState<StepId[]>([]);
  const [stepId, setStepId] = useState<StepId>(() =>
    initial.core ? nextDraftStep(initial.core, initial.format, initial.scanSize, null) : "core"
  );

  const goto = (next: StepId) => {
    setHistory((h) => [...h, stepId]);
    setStepId(next);
  };
  const back = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      setStepId(h[h.length - 1]);
      return h.slice(0, -1);
    });
  };

  const resetDraft = () => {
    setFormat(null);
    setScanSize(null);
    setProcess(null);
    setRolls(1);
  };

  const addBatch = () => {
    if (!core || !format) return;
    batchCounter += 1;
    setBatches((b) => [...b, { id: batchCounter, format, scanSize, process, rolls }]);
    resetDraft();
    goto("batchList");
  };

  const totalRolls = batches.reduce((s, b) => s + b.rolls, 0);
  const batchesTotal = core ? batches.reduce((s, b) => s + unitPrice(core, b.format, b.scanSize, b.process) * b.rolls, 0) : 0;
  const sleeveTotal = sleeve ? totalRolls * 0.5 : 0;
  const printsTotal = printsOn ? printsQty * 0.35 : 0;
  const deliveryTotal = delivery === "post" ? 8.5 : 0;
  const total = batchesTotal + sleeveTotal + printsTotal + deliveryTotal;

  const coreLabel = CORE_CHOICES.find((c) => c.id === core)?.name;
  const deliveryLabel = DELIVERY_CHOICES.find((d) => d.id === delivery)?.name;

  const summaryLines = [
    ...batches.map((b) => (core ? batchLabel(core, b) : "")),
    sleeve && "Add sleeves (+€0.50/roll)",
    printsOn && `Prints × ${printsQty}`,
    deliveryLabel && `Delivery: ${deliveryLabel}`,
  ].filter(Boolean) as string[];

  const subject = encodeURIComponent("New Roots order");
  const body = encodeURIComponent(
    `I'd like to order (${coreLabel}):\n— ${summaryLines.join("\n— ")}\n\nEstimated total: €${total.toFixed(2)}\n\nNotes: `
  );

  const draftCrumb = [coreLabel, format, scanSize, process && (process === "c41" ? "colour" : "black & white")]
    .filter(Boolean)
    .join(" · ");

  return (
    <CosmicShell light>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-10">
        {history.length > 0 && (
          <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
            <button onClick={back} className="underline-offset-2 hover:text-ink hover:underline">
              ← Back
            </button>
            {stepId !== "batchList" && stepId !== "summary" && draftCrumb && (
              <span className="truncate text-ink/55">{draftCrumb}</span>
            )}
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
                    goto("batchFormat");
                  }}
                >
                  {c.name}
                  <span className="block font-sans text-[11px] italic normal-case opacity-60">{c.hint}</span>
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "batchFormat" && core && (
          <Question title={batches.length ? "Next roll — what format?" : "What format is it?"}>
            <PillRow>
              {FORMAT_CHOICES.map((f) => (
                <Pill
                  key={f.id}
                  active={format === f.id}
                  onClick={() => {
                    setFormat(f.id);
                    goto(nextDraftStep(core, f.id, null, process));
                  }}
                >
                  {f.name}
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "batchScanSize" && core && format && (
          <Question title="What scan size?">
            <PillRow>
              {SCAN_SIZE_CHOICES.map((s) => (
                <Pill
                  key={s.id}
                  active={scanSize === s.id}
                  onClick={() => {
                    setScanSize(s.id);
                    goto(nextDraftStep(core, format, s.id, process));
                  }}
                >
                  {s.name}
                  <span className="block font-sans text-[11px] italic normal-case opacity-60">{s.hint}</span>
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "batchProcess" && core && format && (
          <Question title="What's on the roll?">
            <PillRow>
              {PROCESS_CHOICES.map((p) => (
                <Pill
                  key={p.id}
                  active={process === p.id}
                  onClick={() => {
                    setProcess(p.id);
                    goto(nextDraftStep(core, format, scanSize, p.id));
                  }}
                >
                  {p.name}
                </Pill>
              ))}
            </PillRow>
          </Question>
        )}

        {stepId === "batchRolls" && (
          <Question title="How many rolls like this?">
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
            <NextButton onClick={addBatch}>Add to order →</NextButton>
          </Question>
        )}

        {stepId === "batchList" && core && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
              Your rolls so far
            </p>
            <div className="w-full max-w-sm divide-y divide-ink/10 border-y border-ink/10">
              {batches.map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="font-sans text-sm text-ink/80">{batchLabel(core, b)}</span>
                  <button
                    onClick={() => setBatches((bs) => bs.filter((x) => x.id !== b.id))}
                    aria-label="Remove"
                    className="font-mono text-xs text-ink/40 hover:text-red"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => goto("batchFormat")}
                className="rounded-2xl border border-ink/25 px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide text-ink/70 transition hover:border-ink/60 hover:text-ink"
              >
                + Add another roll type
              </button>
              <NextButton onClick={() => goto("addons")}>Continue →</NextButton>
            </div>
          </div>
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
            <NextButton onClick={() => goto("delivery")}>Continue →</NextButton>
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
                    goto("summary");
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
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
              {coreLabel} — your order
            </p>
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

function NextButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="bg-gold px-8 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
    >
      {children}
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

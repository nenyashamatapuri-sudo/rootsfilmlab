"use client";

import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const STEPS = [
  {
    n: "01",
    name: "Order & pay online",
    detail: "Start your order and pay on the website — we don't take payment in store.",
  },
  {
    n: "02",
    name: "Drop it off",
    detail: "Bring your rolls to Herengracht 258, or send them by post — Mon–Fri, 10am–6pm.",
  },
  {
    n: "03",
    name: "Develop",
    detail: "Every roll runs through our Noritsu V30 processor — C41 and black & white, the same chemistry, roll after roll.",
  },
  {
    n: "04",
    name: "Scan",
    detail: "We scan on a Fuji Frontier SP3000 and SP-500 — the machines pro labs trust for sharp, accurate scans.",
  },
  {
    n: "05",
    name: "Deliver",
    detail: "Scans land in your inbox within days. Negatives mailed back, or ready for pickup.",
  },
];

const GEAR = [
  { label: "Scanners", value: "Fuji Frontier SP3000 · Fuji Frontier SP-500" },
  { label: "Processor", value: "Noritsu V30" },
];

export function ProcessPanel() {
  const { go } = useTab();

  return (
    <CosmicShell light>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-6">
        <p className="text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
          How it works
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex gap-3 rounded-lg border border-ink/15 bg-ink/[0.02] px-4 py-3.5"
            >
              <span className="font-display text-2xl leading-none text-gold">{s.n}</span>
              <div>
                <p className="font-display text-base leading-tight text-ink">{s.name}</p>
                <p className="mt-1 font-sans text-sm text-ink">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 w-full max-w-lg rounded-lg border border-ink/15 px-5 py-4">
          <p className="text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
            The gear
          </p>
          <div className="mt-3 divide-y divide-ink/10">
            {GEAR.map((g) => (
              <div key={g.label} className="flex items-center justify-between gap-4 py-2">
                <span className="font-mono text-sm font-semibold uppercase tracking-wider text-ink">
                  {g.label}
                </span>
                <span className="text-right font-sans text-sm text-ink">{g.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => go("order")}
            className="bg-gold px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
          >
            Start an order
          </button>
        </div>
      </div>
    </CosmicShell>
  );
}

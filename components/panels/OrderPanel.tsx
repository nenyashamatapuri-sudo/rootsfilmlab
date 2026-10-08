"use client";

import { useState } from "react";
import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

const OPTIONS = [
  { id: "develop-only", name: "Develop Only" },
  { id: "scan-lite", name: "Scan Lite" },
  { id: "scan-medium", name: "Scan Medium" },
  { id: "scan-xl", name: "Scan XL" },
  { id: "scan-only", name: "Scan Only" },
  { id: "prints", name: "Prints" },
  { id: "film-post", name: "Film, by Post" },
];

export function OrderPanel() {
  const { preselect } = useTab();
  const [picked, setPicked] = useState<string[]>(() => (preselect ? [preselect] : []));

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const names = OPTIONS.filter((o) => picked.includes(o.id)).map((o) => o.name);
  const subject = encodeURIComponent("New Roots order");
  const body = encodeURIComponent(
    names.length ? `I'd like to order:\n— ${names.join("\n— ")}\n\nRolls: \nNotes: ` : "I'd like to order:\n\n"
  );

  return (
    <CosmicShell>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          What do you want developed?
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {OPTIONS.map((o) => {
            const isOn = picked.includes(o.id);
            return (
              <button
                key={o.id}
                onClick={() => toggle(o.id)}
                className={
                  "rounded-full border px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide transition " +
                  (isOn
                    ? "border-gold bg-gold text-paper"
                    : "border-paper/25 text-paper/70 hover:border-paper/60 hover:text-paper")
                }
              >
                {isOn ? "✓ " : ""}
                {o.name}
              </button>
            );
          })}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:hello@rootsfilmlab.nl?subject=${subject}&body=${body}`}
            className="bg-gold px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-paper transition hover:brightness-110"
          >
            Email your order
          </a>
          <a
            href="#"
            className="border border-paper/30 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-paper/80 transition hover:border-paper hover:text-paper"
          >
            WhatsApp us
          </a>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-wider text-paper/35">
          Mail to our Amsterdam address, or drop off — details on confirmation.
        </p>
      </div>
    </CosmicShell>
  );
}

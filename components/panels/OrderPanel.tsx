"use client";

import { useState } from "react";
import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

// A roll gets exactly one treatment — developing it, or developing-and-scanning
// at one tier, or scanning negatives that are already developed. Mixing those
// (e.g. "Develop Only" + "Scan Medium") isn't a real combination, so this group
// behaves like a radio: picking one clears any other core choice.
const CORE_OPTIONS = [
  { id: "develop-only", name: "Develop Only" },
  { id: "scan-small", name: "Scan Small · 35mm" },
  { id: "scan-medium", name: "Scan Medium · 35mm" },
  { id: "scan-large", name: "Scan Large · 35mm" },
  { id: "scan-120", name: "Scan · 120" },
  { id: "scan-only", name: "Scan Only · already developed" },
];

// Prints and postage stack on top of whatever core choice is made.
const ADDON_OPTIONS = [
  { id: "prints", name: "Prints" },
  { id: "film-post", name: "Film, by Post" },
];

export function OrderPanel() {
  const { preselect } = useTab();
  const [core, setCore] = useState<string | null>(() =>
    CORE_OPTIONS.some((o) => o.id === preselect) ? preselect! : null
  );
  const [addons, setAddons] = useState<string[]>(() =>
    ADDON_OPTIONS.some((o) => o.id === preselect) ? [preselect as string] : []
  );

  const toggleAddon = (id: string) =>
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const names = [
    ...CORE_OPTIONS.filter((o) => o.id === core).map((o) => o.name),
    ...ADDON_OPTIONS.filter((o) => addons.includes(o.id)).map((o) => o.name),
  ];
  const subject = encodeURIComponent("New Roots order");
  const body = encodeURIComponent(
    names.length ? `I'd like to order:\n— ${names.join("\n— ")}\n\nRolls: \nNotes: ` : "I'd like to order:\n\n"
  );

  return (
    <CosmicShell light>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
          What do you want developed?
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {CORE_OPTIONS.map((o) => {
            const isOn = core === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setCore(isOn ? null : o.id)}
                className={
                  "rounded-full border px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide transition " +
                  (isOn
                    ? "border-gold bg-gold text-ink"
                    : "border-ink/25 text-ink/70 hover:border-ink/60 hover:text-ink")
                }
              >
                {isOn ? "✓ " : ""}
                {o.name}
              </button>
            );
          })}
        </div>

        <p className="mt-7 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
          Add anything else?
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {ADDON_OPTIONS.map((o) => {
            const isOn = addons.includes(o.id);
            return (
              <button
                key={o.id}
                onClick={() => toggleAddon(o.id)}
                className={
                  "rounded-full border px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide transition " +
                  (isOn
                    ? "border-red bg-red text-paper"
                    : "border-ink/25 text-ink/70 hover:border-ink/60 hover:text-ink")
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
            className="bg-gold px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
          >
            Email your order
          </a>
          <a
            href="#"
            className="border border-ink/30 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink/80 transition hover:border-ink hover:text-ink"
          >
            WhatsApp us
          </a>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">
          Mail to our Amsterdam address, or drop off — details on confirmation.
        </p>
      </div>
    </CosmicShell>
  );
}

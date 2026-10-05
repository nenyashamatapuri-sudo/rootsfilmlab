"use client";

import FilmBoxLazy from "../three/FilmBoxLazy";
import { Confetti } from "../Confetti";
import { Squiggle } from "../Squiggle";
import { useTab } from "../TabContext";

export function HomePanel() {
  const { go } = useTab();

  return (
    <div className="grain relative flex h-full min-h-full flex-col overflow-hidden bg-ink p-5 text-paper sm:p-8 lg:flex-row lg:items-center lg:gap-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue opacity-90 sm:h-80 sm:w-80" />
      <Confetti className="opacity-80" />

      <div className="relative flex min-h-[280px] flex-1 items-center justify-center lg:h-full">
        <FilmBoxLazy />
        <div className="pop-in absolute -bottom-2 right-0 flex rotate-3 flex-col items-center gap-1 border-[3px] border-ink bg-gold px-4 py-3 text-center text-ink shadow-[6px_6px_0_var(--color-ink)] sm:right-4">
          <p className="font-display text-xl tracking-wide">GRIOT</p>
          <Squiggle className="h-2.5 w-16 text-ink" />
          <p className="font-serif-italic text-sm">every roll, a story.</p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col items-start lg:mt-0">
        <h1 className="misprint font-display text-[13vw] leading-[0.85] tracking-tight sm:text-6xl lg:text-7xl">
          ELKE ROL,
          <br />
          EEN VERHAAL.
        </h1>
        <p className="mt-4 max-w-md font-serif-italic text-xl text-paper/75 sm:text-2xl">
          every roll, a story — told, kept, passed down. A griot keeps your
          film&apos;s story safe.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => go("contact")}
            className="bg-paper px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-ink transition hover:brightness-95"
          >
            Start an order
          </button>
          <button
            onClick={() => go("pricing")}
            className="border-2 border-paper/70 px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider transition hover:bg-paper hover:text-ink"
          >
            See pricing
          </button>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-paper/45">
          ◆ click the box — it opens ◆ Amsterdam, est. 2026 ◆
        </p>
      </div>
    </div>
  );
}

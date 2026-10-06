"use client";

import FilmBoxLazy from "../three/FilmBoxLazy";
import { HoloRocks } from "../HoloRocks";
import { useTab } from "../TabContext";

export function HomePanel() {
  const { go } = useTab();

  const band = "DEVELOP · PRESERVE · ".repeat(6);

  return (
    <div className="cosmos relative flex h-full min-h-full flex-col overflow-hidden text-paper">
      <div className="starfield" />
      <HoloRocks />

      <p className="relative z-10 mx-auto mt-4 max-w-sm px-6 text-center font-sans text-[11px] italic leading-snug text-paper/55 sm:mt-6">
        <span className="font-semibold not-italic text-paper/80">Griot</span>{" "}
        <span className="not-italic text-paper/40">/ˈɡriːoʊ/</span> — a West African
        storyteller and oral tradition-bearer. We take the name at its word.
      </p>

      <div className="relative flex flex-1 items-center justify-center">
        <p
          className="misprint pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden whitespace-nowrap text-center font-display text-[11vw] uppercase leading-none tracking-wide text-paper/90 sm:text-6xl"
          aria-hidden
        >
          {band}
        </p>

        <div className="relative z-10 h-[46vh] min-h-[280px] w-full max-w-md">
          <FilmBoxLazy />
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-6 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => go("contact")}
          className="bg-gold px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
        >
          Start an order
        </button>
        <button
          onClick={() => go("pricing")}
          className="border border-paper/30 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-paper/80 transition hover:border-paper hover:text-paper"
        >
          See pricing
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden items-center justify-between px-6 pb-5 sm:flex">
        <span className="pointer-events-auto flex items-center gap-2 rounded-full border border-paper/15 bg-ink/50 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-paper/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Click the box
        </span>
        <span className="pointer-events-auto flex items-center gap-2 rounded-full border border-paper/15 bg-ink/50 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-paper/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          Need film developed: hello@griotfilm.nl
        </span>
      </div>
    </div>
  );
}

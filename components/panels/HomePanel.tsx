"use client";

import FilmBoxLazy from "../three/FilmBoxLazy";
import { CosmicShell } from "../CosmicShell";
import { useTab } from "../TabContext";

export function HomePanel() {
  const { go } = useTab();

  return (
    <CosmicShell rocks>
      <p className="mx-auto mt-4 max-w-xs px-6 text-center font-sans text-[11px] italic leading-snug text-paper/55 sm:mt-6">
        <span className="font-semibold not-italic text-paper/80">Roots</span>{" "}
        <span className="not-italic text-paper/40">/ruːts/</span> — the part of a story
        that stays, no matter how far it travels.
      </p>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <p
          className="misprint pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display uppercase leading-none tracking-tight text-paper/90"
          style={{ fontSize: "clamp(4.5rem, 25vw, 13rem)" }}
          aria-hidden
        >
          Roots
        </p>

        {/* the real box, photographed off our own 3D render — tucked into the frame's corners */}
        <img
          src="/images/crop-kodak.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-2 top-2 z-[5] w-[26%] max-w-[150px] -rotate-3 drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)] sm:left-4 sm:top-4 sm:w-[18%]"
        />
        <img
          src="/images/crop-chrome.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2 z-[5] w-[30%] max-w-[170px] rotate-2 drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)] sm:bottom-4 sm:right-4 sm:w-[20%]"
        />

        <div className="relative z-10 h-[64vh] w-[76%] min-h-[360px] max-w-xl">
          <FilmBoxLazy />
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-6 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => go("order")}
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
          <span className="h-1.5 w-1.5 rounded-full bg-moss" />
          hello@rootsfilmlab.nl
        </span>
      </div>
    </CosmicShell>
  );
}

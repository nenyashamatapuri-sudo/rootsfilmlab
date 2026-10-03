import { ApertureIris } from "./ApertureIris";

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink pt-28 pb-16 text-paper sm:pt-32">
      <div className="pointer-events-none absolute -right-24 top-10 opacity-[0.07] sm:-right-10">
        <ApertureIris size={560} tone="paper" value={0.6} />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-wider text-paper/60">
          <span>Film Lab — Amsterdam</span>
          <span>No. 001 — Est. 2026</span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="font-display text-[15vw] leading-[0.82] tracking-tight sm:text-[9vw] lg:text-[6.4vw]">
              DE KRACHT
              <br />
              VAN ZILVER.
            </h1>
            <p className="mt-3 font-serif-italic text-2xl text-paper/70 sm:text-3xl">
              the power of silver, developed properly.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 border-t border-line-on-dark pt-6 lg:items-end lg:border-t-0 lg:pt-0">
            <ApertureIris size={168} tone="paper" breathe className="shrink-0" />
            <p className="max-w-xs font-sans text-[15px] leading-relaxed text-paper/75 lg:text-right">
              Mail us your rolls, or drop them at our Amsterdam point. We develop, scan
              and archive — then hand it all back to you online.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#start"
            className="bg-red px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-paper transition hover:brightness-110"
          >
            Start an order
          </a>
          <a
            href="#pricing"
            className="border border-paper/70 px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider transition hover:bg-paper hover:text-ink"
          >
            See pricing
          </a>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line-on-dark pt-6 font-mono text-[12px] uppercase tracking-wider text-paper/55 sm:grid-cols-4">
          <li>◆ Colour &amp; black and white</li>
          <li>◆ Slide film / E-6</li>
          <li>◆ 35mm, 120 &amp; large format</li>
          <li>◆ Scans delivered in days, not weeks</li>
        </ul>
      </div>
    </section>
  );
}

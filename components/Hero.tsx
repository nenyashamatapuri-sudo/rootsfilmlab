import { ApertureIris } from "./ApertureIris";

export function Hero() {
  return (
    <section id="top" className="ad-glow grain relative overflow-hidden pt-16 pb-0 text-paper">
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h1 className="misprint font-display text-[14vw] leading-[0.85] tracking-tight sm:text-[7vw]">
          DE KRACHT
          <br />
          VAN ZILVER
        </h1>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 text-left font-sans text-[14px] leading-relaxed text-paper/80 sm:grid-cols-2 sm:gap-10">
          <p>
            Mail us your rolls, or drop them at our Amsterdam point. We develop,
            scan and archive every frame — then hand it all back to you online,
            properly labelled and properly cared for.
          </p>
          <p>
            Stuur je rolletjes op, of lever ze af op onze plek in Amsterdam. Wij
            ontwikkelen, scannen en archiveren alles — en zetten het daarna voor
            je online, roltje voor rolletje.
          </p>
        </div>

        <p className="mt-14 font-serif-italic text-[22vw] leading-none text-paper sm:text-[9rem]">
          2026
        </p>
      </div>

      <div className="relative mx-auto -mt-6 flex max-w-3xl justify-center px-5 sm:-mt-10">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-56 w-56 rounded-full bg-red opacity-40 blur-[70px] sm:h-72 sm:w-72" />
        </div>
        <ApertureIris size={300} tone="paper" breathe className="relative" />
      </div>

      <div className="relative z-10 mx-auto -mt-6 flex max-w-xs flex-col items-center bg-ink px-8 py-6 text-center sm:-mt-10 sm:max-w-sm">
        <p className="font-display text-4xl tracking-wide sm:text-5xl">ZILVER</p>
        <p className="mt-1 font-display text-2xl tracking-wide text-paper/90 sm:text-3xl">
          FILM LAB
        </p>
        <span className="ink-stamp mt-4 border-paper/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper/80">
          Amsterdam
        </span>
      </div>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4 pb-14">
        <a
          href="#start"
          className="bg-paper px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-ink transition hover:brightness-95"
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

      <ul className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-3 border-t border-line-on-dark px-5 py-6 font-mono text-[12px] uppercase tracking-wider text-paper/55 sm:grid-cols-4 sm:px-8">
        <li>◆ Colour &amp; black and white</li>
        <li>◆ Slide film / E-6</li>
        <li>◆ 35mm, 120 &amp; large format</li>
        <li>◆ Scans delivered in days, not weeks</li>
      </ul>
    </section>
  );
}

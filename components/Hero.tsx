import Link from "next/link";
import FilmBoxLazy from "./three/FilmBoxLazy";

export function Hero() {
  return (
    <section id="top" className="ad-glow grain relative overflow-hidden pt-16 pb-0 text-paper">
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h1 className="misprint font-display text-[13vw] leading-[0.85] tracking-tight sm:text-[6.4vw]">
          ELKE ROL,
          <br />
          EEN VERHAAL.
        </h1>
        <p className="mt-4 font-serif-italic text-2xl text-paper/70 sm:text-3xl">
          every roll, a story — told, kept, passed down.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 text-left font-sans text-[14px] leading-relaxed text-paper/80 sm:grid-cols-2 sm:gap-10">
          <p>
            In West African tradition, a griot carries a community&apos;s
            stories — spoken, remembered, passed on. We do the same for your
            film: developed, scanned, and kept safe, so nothing gets lost.
          </p>
          <p>
            Een griot draagt de verhalen van een gemeenschap — verteld,
            onthouden, doorgegeven. Wij doen hetzelfde met jouw film:
            ontwikkeld, gescand en bewaard, zodat niets verloren gaat.
          </p>
        </div>

        <p className="mt-14 font-serif-italic text-[20vw] leading-none text-paper sm:text-[8rem]">
          2026
        </p>
      </div>

      <div className="relative mx-auto -mt-6 flex max-w-3xl justify-center px-5 sm:-mt-10">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-56 w-56 rounded-full bg-red opacity-30 blur-[70px] sm:h-72 sm:w-72" />
        </div>
        <div className="relative h-[280px] w-full max-w-sm sm:h-[360px]">
          <FilmBoxLazy />
        </div>
      </div>
      <p className="relative mx-auto -mt-2 max-w-3xl px-5 text-center font-mono text-[11px] uppercase tracking-widest text-paper/45">
        click the box to open it
      </p>

      <div className="relative z-10 mx-auto mt-8 flex max-w-xs flex-col items-center bg-ink px-8 py-6 text-center sm:max-w-sm">
        <p className="font-display text-4xl tracking-wide sm:text-5xl">GRIOT</p>
        <p className="mt-1 font-display text-2xl tracking-wide text-paper/90 sm:text-3xl">
          FILM LAB
        </p>
        <span className="ink-stamp mt-4 border-paper/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper/80">
          Amsterdam
        </span>
      </div>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4 pb-14">
        <Link
          href="/contact"
          className="bg-paper px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-ink transition hover:brightness-95"
        >
          Start an order
        </Link>
        <Link
          href="/pricing"
          className="border border-paper/70 px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider transition hover:bg-paper hover:text-ink"
        >
          See pricing
        </Link>
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

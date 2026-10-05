import Link from "next/link";
import FilmBoxLazy from "./three/FilmBoxLazy";
import { Confetti } from "./Confetti";
import { Squiggle } from "./Squiggle";

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink pb-0 text-paper">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue opacity-90 sm:-left-16 sm:-top-32 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-0 w-0 border-b-[160px] border-l-[160px] border-b-gold border-l-transparent opacity-90 sm:border-b-[220px] sm:border-l-[220px]" />
      <Confetti className="opacity-80" />

      {/* The box — first thing on the page, already told to open itself */}
      <div className="relative h-[46vh] min-h-[320px] pt-6 sm:h-[56vh] sm:pt-10">
        <FilmBoxLazy />
      </div>

      <div className="relative mx-auto -mt-4 flex max-w-sm justify-center px-5 sm:-mt-8">
        <div className="pop-in flex -rotate-3 flex-col items-center gap-2 border-[3px] border-ink bg-gold px-8 py-6 text-center text-ink shadow-[8px_8px_0_var(--color-ink)]">
          <p className="font-display text-3xl tracking-wide sm:text-4xl">GRIOT</p>
          <Squiggle className="h-3 w-24 text-ink" />
          <p className="font-serif-italic text-lg sm:text-xl">every roll, a story.</p>
          <span className="ink-stamp mt-2 border-ink px-4 py-1 font-mono text-[10px] uppercase tracking-widest">
            Amsterdam
          </span>
        </div>
      </div>

      <p className="relative mx-auto mt-4 max-w-3xl px-5 text-center font-mono text-[11px] uppercase tracking-widest text-paper/55">
        ◆ click the box — it opens ◆
      </p>

      <div className="relative mx-auto mt-10 max-w-3xl px-5 text-center sm:px-8">
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
      </div>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4 pb-14">
        <Link
          href="#services"
          className="bg-paper px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-ink transition hover:brightness-95"
        >
          Start an order
        </Link>
        <Link
          href="#pricing"
          className="border-2 border-paper/70 px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider transition hover:bg-paper hover:text-ink"
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
